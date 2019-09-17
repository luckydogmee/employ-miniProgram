<template>
	<view class="register-container">
		<view class="content">
			<view class="logo">
				<image src="../../../static/img/logo.png" mode=""></image>
			</view>
			<view class="form">
				<view class="add-avatar">
					<view class="avatar old-avatar">
						<image :src="avatar" mode="" @click="chooseImage"></image>
					</view>
				</view>
				<view class="form-item form-input">
					<view class="sy-label">
						您的姓名
					</view>
					<input class="sy-input" :focus="focusArray[focusIndex] === 'name'" 
							v-model="name" maxlength="6"
							@blur="handleBlur(0)" />	
				</view>
				<view class="form-item form-input">
					<view class="sy-label">
						您的年龄
					</view>
					<input class="sy-input" :focus="focusArray[focusIndex]==='age'" 
							v-model="age" maxlength="3"
							@blur="handleBlur(1)" />
				</view>
				<view class="form-item form-input">
					<view class="sy-label">
						您的性别
					</view>
					<view class="gender">
						<radio-group @change="radioChange">
							<label class="radio"><radio value="0" checked="checked" color="#ff8352" style="transform:scale(0.7)" />男</label>
							<label class="radio"><radio value="1" color="#ff8352" style="transform:scale(0.7)" />女</label>
						</radio-group>	
					</view>
					<!-- <picker
						@change="genderChange"
						class="picker"
						:range="genderArray"
						:value="gender"
					>
						<view class="select">nan</view>
					</picker> -->
				</view>
				<view class="form-item form-input">
					<view class="sy-label">
						手机号
					</view>
					<input class="sy-input" :focus="focusArray[focusIndex] === 'phone'" 
							v-model="phone" maxlength="15"
							@blur="handleBlur(3)" />
				</view>
				<view class="form-item form-input verfiy-item">
					<input class="sy-input"  :focus="focusArray[focusIndex] === 'verify'" 
							v-model="verifyCode" maxlength="6" placeholder="短信验证码" placeholder-class="input-placeholder" 
							@blur="handleBlur(4)" />
					<button class="default-btn verify-code-btn" :class="{'disabled':!readySendCode} " 
						@click="sendVerifyCode">{{readySendCode ? '发送验证码' : surplusSecond + ' 秒' }}</button>
				</view>
				<view class="agreement">
					<checkbox-group @change="agreementChange">
						<label>
							<checkbox value="0" :checked="false" color="#feae86" />我已阅读并接受《用户协议》
						</label>
					</checkbox-group>
				</view>
				<view class="form-item">
					<button class="default-btn submit-btn" @click="submit" >注册</button>
				</view>
				<view class="form-item to-login">
					<text @click="toLogin">已有账号？点这里直接登录>></text>
				</view>
			</view>
		</view>
		<uniPopup ref="registerSuccess" custom="true">
			<view class="registerSuccess">
				<view class="text-box">
					<text>恭喜您注册成功</text>
					<text>即将跳转到首页</text>	
				</view>
			</view>
		</uniPopup>
	</view>
</template>

<script>
	import { verifyPhone } from '../../../utils/utils.js'
	import UserModel from '@/models/user.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	const userModel = new UserModel() 
	export default {
		data() {
			return {
				surplusSecond: 0, // 还剩多少秒可以重发
				readySendCode: true,  // 是否准备好发送验证码
				verifyCodeTimer: null, //定时器对象
				focusArray: ['name', 'age', 'gender', 'phone', 'verify'],
				focusIndex: null,  //焦点位置
				agreement:false, // 是否同意用户协议
				uploadedAvatar: '',
				avatarChanged: false,
				name: '',
				age: '',
				gender: 0,
				phone: '',
				verifyCode: '',
				genderArray:['男', '女'],
			};
		},
		beforeDestroy() {
			clearInterval(this.verifyCodeTimer)
			this.verifyCodeTimer = null
		},
		onLoad(option) {
			if(option.phone){
				this.phone = option.phone
			}
		},
		components:{
			uniPopup
		},
		computed:{
			genderText(){
				return this.genderArray[this.gender]
			},
			avatar(){
				if(this.avatarChanged){
					return this.uploadedAvatar
				}else{
					if(this.gender == 0){
						return '../../../static/img/avatar-man.png'
					}else{
						return '../../static/img/avatar-women.png'
					}
				}
			}
		},
		methods:{
			agreementChange(){
				this.agreement = !this.agreement
				
			},
			handleBlur(index){
				let focusArray = this.focusArray
				// if(index != focusArray.length - 1 ){
				// 	if(!this[focusArray[index + 1]]){
				// 		this.focusIndex = index + 1
				// 		return
				// 	}
				// 	this.focusIndex = null
				// 	return
				// }
				// this.focusIndex = null	
			},
			chooseImage(){
				const that = this
				uni.chooseImage({
					count:1,
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						that.avatar = res.tempFilePaths[0]
						that.getImageWebUrl(res.tempFilePaths[0])
					}
				})
			},
			getImageWebUrl(path){
				const that = this
				uni.showLoading({
					title: '上传中，请稍候...'
				})
				uni.uploadFile({
					// 这里修改上传地址
					url: config.base_url + '/store/getImageWebUrl',
					filePath: path,
					name: 'file',
					success(res){
						uni.hideLoading()
						let response = res.data
						if(typeof response === 'string'){
							response = JSON.parse(response)
						}
						const { code, message, data } = response
						if(code === '0'){
							uni.showToast({
								title: '上传成功'
							})
							that.avatarChanged = true
							that.uploadedAvatar = data.url
						}else{
							uni.showToast({
								icon:'none',
								title: message
							})
						}
					},
					fail: res=>{
						uni.showToast({
							icon:'none',
							title: '上传失败，请稍候再试'
						})
					}
				})
			},
			sendVerifyCode(){
				if(!this.readySendCode){
					return 
				}
				if(!this.phone){
					uni.showToast({
						icon:'none',
						title:'请输入电话号码'
					})
					// this.focusIndex = 3
					return
				}
				
				const correctPhone = verifyPhone(this.phone)
				if(!correctPhone){
					uni.showToast({
						icon:'none',
						title:'手机号码错误，请确认'
					})
					// this.focusIndex = 3
					return
				} 
				uni.showLoading({
					mask: true
				})
				userModel.getVerifyCode(this.phone, 'A').then(res=>{
					// 请求成功,并判断code是否正确
					uni.hideLoading()
					const { code, message, data } = res.data 
					if(code === '0'){
						uni.showToast({
							title: '已发送'
						})
						this.surplusSecond = 60
						// this.focusIndex = 4
						this.verifyCodeTimer = setInterval(()=>{
							if(this.surplusSecond > 0){
								this.surplusSecond -= 1
								this.readySendCode = false
							}else{
								this.surplusSecond = 0
								this.readySendCode = true
								clearInterval(this.verifyCodeTimer)
							}
						}, 1000)
						// this.focusIndex = 4	
					}else{
						uni.showToast({
							icon:'none',
							title: message
						})
					}
					
				}).catch(err=>{
					uni.showToast({
						icon:'none',
						title:'获取验证码失败'
					})
				})
			},
			submit(){
				if(!this.name){
					uni.showToast({
						icon:'none',
						title:'请输入姓名'
					})
					this.$nextTick(()=>{
						// this.focusIndex = 0
					})
					return
				}
				if(!this.age){
					uni.showToast({
						icon:'none',
						title:'请输入年龄'
					})
					this.$nextTick(()=>{
						// this.focusIndex = 1
					})
					return
				}
				if(!this.phone){
					uni.showToast({
						icon:'none',
						title:'请输入电话号码'
					})
					this.$nextTick(()=>{
						// this.focusIndex = 3
					})
					return
				}
				if(!this.verifyCode){
					uni.showToast({
						icon:'none',
						title:'请输入验证码'
					})
					this.$nextTick(()=>{
						// this.focusIndex = 4
					})
					return
				}
				if(!this.agreement){
					uni.showToast({
						icon:'none',
						title:'必须同意用户协议'
					})
					return
				}
				uni.showLoading({
					mask: true
				})
				// 再去验证验证码是否正确
				userModel.verifyCode(this.phone, this.verifyCode).then(res=>{
					// 执行真正的登录
					const avatar = this.avatarChanged ? this.avatar : ''
					return userModel.register(this.name, this.age, this.phone,this.gender, avatar)
					
				}).then(res=>{
					// 注册成功
					if(res.code === '0'){
						uni.hideLoading()
						this.$refs.registerSuccess.open()
						setTimeout(()=>{
							uni.reLaunch({
								url: '../../customer/main/main'
							})
						},2000)	
					}else{
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: '注册失败'
						})
					}
				}).catch(err=>{
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '注册失败'
					})
				})
			},
			toLogin(){
				uni.reLaunch({
					url: '../login/login'
				})
			},
			radioChange(e){
				this.gender = e.detail.value
			}
		}
	}
</script>

<style lang="scss" scoped >
	.register-container{
		height: 100vh;
		width: 750upx;
		background: url( ../../../static/img/register-bg.png ) no-repeat;
		background-size: 100% 100%;
	}
	.content{
		width: 500upx;
		margin: 0 auto;
		margin-top: 200upx;
		background: rgba(0,0,0,0);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.logo{
			width: 194upx;
			height: 98upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.form{
			margin-top: 64upx;
			width: 100%;
			.form-item{
				margin-top: 28upx;
				position: relative;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				.sy-label{
					font-size: 28upx;
					font-weight: 600;
					color: #989696;
					height: 60upx;
					line-height: 60upx;
					vertical-align: bottom;
				}
			}
			.to-login{
				color: #feae86;
				font-size: 24upx;
				margin-top: 18upx;
				text-align: center;
			}
			input{
				font-weight: 600;
				letter-spacing: 4upx;
			}
		}
		.verfiy-item {
			border-bottom: 1upx solid #ffd5a3;
			input{
				width: 320upx;
				border-bottom: none;	
			}
		}
		.verify-code-btn{
			width: 170upx;
			height: 46upx;
			line-height: 46upx;
			position: absolute;
			right: 0;
			font-size: 24upx;
			bottom: 10upx;
			background: #feae86; 
			&.disabled{
				background: #ddd;
			}
		}
		.submit-btn{
			height: 56upx;
			line-height: 56upx;
			width: 210upx;
			border-radius: 28upx;
			font-size: 30upx;
			letter-spacing: 4upx;
			font-weight: 600;
			background: linear-gradient(#fcb998, #fe9764);
		}
		.agreement{			
			margin-top: 24upx;
			font-size: 20upx;
			color: #989696;
			checkbox{
				transform: scale(0.5);
			}
		}
	}
	.registerSuccess{
		width: 460upx;
		height: 350upx;
		background: url(../../../static/img/register-dialog.png) no-repeat ;
		background-size: 100% 100%;
		overflow: hidden;
		.text-box{
			margin-top: 220upx;
			text-align: center;
		}
		text{
			font-size: 24upx;
			color: #333;
			margin-bottom: 24upx;
			width: 100%;
			display: block;
		}
	}
	.picker{
		width: 372upx;
		height: 60upx;
		
	}
	.radio{
		font-size: 28upx;
		color: #8F8F94;
		margin: 0 30upx;
	}
	.avatar{
		width: 164upx;
		text-align: center;
		margin: 0 auto;
		image{
			height: 84upx;
			width: 84upx;
			border-radius: 50%;
		}
		.text{
			font-size: 20upx;
		}
	}
</style>
