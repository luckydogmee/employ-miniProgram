<template>
	<view class="register-container">
		<view class="content">
			<view class="logo">
				<image src="../../../static/img/logo.png" mode=""></image>
			</view>
			<view class="form">
				<view class="form-item form-input">
					<input class="sy-input" :focus="focusArray[focusIndex] === 'phone'" 
							v-model="phone" maxlength="15" placeholder="您的电话号码" placeholder-class="input-placeholder" 
							@blur="handleBlur(0)" />
				</view>
				<view class="form-item verfiy-item  form-input">
					<input class="sy-input"  :focus="focusArray[focusIndex] === 'verify'" 
							v-model="verifyCode" maxlength="6" placeholder="短信验证码" placeholder-class="input-placeholder" 
							@blur="handleBlur(1)" />
					<button class="default-btn verify-code-btn" :class="{'disabled':!readySendCode} " 
						@click.stop="getVerifyCode">{{readySendCode ? '发送验证码' : surplusSecond + ' 秒后重新发送' }}</button>
				</view>
				<!-- <view class="special-item">
					<text class="savePhone">保存此号码供以后授权使用</text>
					<switch :checked="savePhone" @change="savePhoneChange" color="#feae86" style="transform:scale(0.5)" />
				</view> -->
				<view class="form-item">
					<button class="default-btn submit-btn" @click="submit" >登录</button>
				</view>
				<!-- <view class="form-item to-login">
					<text>已有账号？点这里直接登录>></text>
				</view> -->
			</view>
		</view>
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
				savePhone: true,
				surplusSecond: 0, // 还剩多少秒可以重发
				readySendCode: true,  // 是否准备好发送验证码
				verifyCodeTimer: null, //定时器对象
				focusArray: ['phone', 'verify'],
				focusIndex: null,  //焦点位置
				phone: '',
				verifyCode: '',
			}
		},
		beforeDestroy() {
			clearInterval(this.verifyCodeTimer)
			this.verifyCodeTimer = null
		},
		methods:{
			savePhoneChange(){
				this.savePhone = ! this.savePhone
			},
			handleBlur(index){
				let focusArray = this.focusArray
				if(index != focusArray.length - 1 ){
					if(!this[focusArray[index + 1]]){
						this.focusIndex = index + 1
						return
					}
					this.focusIndex = null
					return
				}
				this.focusIndex = null	
			},
			getVerifyCode(){
				if(!this.readySendCode){
					return 
				}
				if(!this.phone){
					uni.showToast({
						icon:'none',
						title:'请输入电话号码'
					})
					this.focusIndex = 0
					return
				}
				
				const correctPhone = verifyPhone(this.phone)
				if(!correctPhone){
					uni.showToast({
						icon:'none',
						title:'手机号码错误，请确认'
					})
					this.focusIndex = 0
					return
				} 
				userModel.getVerifyCode(this.phone, 'A').then(res=>{
					// 请求成功,并判断code是否正确
					const {code, message, data} = res.data
					if(code === '0'){
						uni.showToast({
							title: '验证码已发送，请注意查收'
						})
						this.verifyCodeStatus = 1
						this.readySendCode = false
						this.surplusSecond = 60
						this.focusIndex = 1
						this.verifyCodeTimer = setInterval(()=>{
							if(this.surplusSecond > 0){
								this.surplusSecond -= 1
							}else{
								this.surplusSecond = 0
								this.verifyCodeStatus = 0
								this.readySendCode = true
								clearInterval(this.verifyCodeTimer)
							}
						}, 1000)
						this.focusIndex = 1	
					}else{
						uni.showToast({
							icon:'none',
							title:message
						})
					}
					
				}).catch(err=>{
					uni.showToast({
						icon:'none',
						title:'获取验证码失败，请稍后重试'
					})
				})
			},
			submit(){
				if(!this.phone){
					uni.showToast({
						icon:'none',
						title:'请输入电话号码'
					})
					this.$nextTick(()=>{
						this.focusIndex = 0
					})
					return
				}
				if(!this.verifyCode){
					uni.showToast({
						icon:'none',
						title:'请输入验证码'
					})
					this.$nextTick(()=>{
						this.focusIndex = 1
					})
					return
				}
				
				// 再去验证验证码是否正确,这步省略，直接登录
				// userModel.verifyCode(this.phone, this.verifyCode).then(res=>{
				// 	// 执行真正的登录
				// 	return userModel.login(this.phone, 'A')
				// })
				userModel.login(this.phone, this.verifyCode, 'A').then(res=>{
					const { code, data, message } = res.data
					if(code === '0'){
						// 登录成功
						uni.showToast({
							title: '登录成功，即将跳转到首页'
						})
						uni.setStorageSync('token', data.token)
						setTimeout(()=>{
							uni.reLaunch({
								url: '../../customer/main/main'
							})
						},2000)	
					}else{
						uni.showToast({
							icon: 'none',
							title: message
						})
					}
					
				})
				.catch(err=>{
					uni.showToast({
						icon: 'none',
						title: '登录失败，请稍候再试'
					})
				})
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
			margin-top: 84upx;
			width: 100%;
			.form-item{
				margin-top: 38upx;
				position: relative;
			}
			.special-item{
				margin-top: 38upx;
				border-bottom: 1upx solid #ffd5a3;
				display: flex;
				justify-content: space-between;
				align-items: center;
				text{
					font-size: 24upx;
					color: #989696;
					font-weight: 600;
				}
			}
			.to-register{
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
		}
		.submit-btn{
			height: 56upx;
			line-height: 56upx;
			width: 250upx;
			border-radius: 28upx;
			font-size: 30upx;
			letter-spacing: 4upx;
			font-weight: 600;
			background: linear-gradient(#fcb998, #fe9764);
		}
	}
</style>
