<template>
	<view class="register-container">
		<view class="content">
			<view class="logo">
				<image src="../../../static/img/logo.png" mode=""></image>
			</view>
			<view class="form">
				<view class="form-item">
					<input class="sy-input" :focus="focusArray[focusIndex] === 'name'" 
							v-model="name" maxlength="6" placeholder="您的姓名" placeholder-class="input-placeholder"
							@blur="handleBlur(0)" />	
				</view>
				<view class="form-item">
					<input class="sy-input" :focus="focusArray[focusIndex]==='age'" 
							v-model="age" maxlength="3" placeholder="您的年龄" placeholder-class="input-placeholder" 
							@blur="handleBlur(1)" />
				</view>
				<view class="form-item">
					<input class="sy-input" :focus="focusArray[focusIndex] === 'phone'" 
							v-model="phone" maxlength="15" placeholder="您的电话号码" placeholder-class="input-placeholder" 
							@blur="handleBlur(2)" />
				</view>
				<view class="form-item verfiy-item">
					<input class="sy-input"  :focus="focusArray[focusIndex] === 'verify'" 
							v-model="verifyCode" maxlength="6" placeholder="短信验证码" placeholder-class="input-placeholder" 
							@blur="handleBlur(3)" />
					<button class="default-btn verify-code-btn" :class="{'disabled':!readySendCode} " 
						@click="getVerifyCode">{{readySendCode ? '发送验证码' : surplusSecond + ' 秒后重新发送' }}</button>
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
				focusArray: ['name', 'age', 'phone', 'verify'],
				focusIndex: null,  //焦点位置
				agreement:false, // 是否同意用户协议
				name: '',
				age: '',
				phone: '',
				verifyCode: '',
			};
		},
		beforeDestroy() {
			clearInterval(this.verifyCodeTimer)
			this.verifyCodeTimer = null
		},
		components:{
			uniPopup
		},
		methods:{
			agreementChange(){
				this.agreement = !this.agreement
				
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
					this.focusIndex = 2
					return
				}
				
				const correctPhone = verifyPhone(this.phone)
				if(!correctPhone){
					uni.showToast({
						icon:'none',
						title:'手机号码错误，请确认'
					})
					this.focusIndex = 2
					return
				} 
				userModel.getVerifyCode(this.phone).then(res=>{
					// 请求成功,并判断code是否正确
					uni.showToast({
						title: '验证码已发送，请注意查收'
					})
					this.verifyCodeStatus = 1
					this.surplusSecond = 120
					this.focusIndex = 3
					this.verifyCodeTimer = setInterval(()=>{
						if(this.surplusSecond > 0){
							this.surplusSecond -= 1
						}else{
							this.surplusSecond = 0
							this.verifyCodeStatus = 0
							clearInterval(this.verifyCodeTimer)
						}
					}, 1000)
					this.focusIndex = 3
				}).catch(err=>{
					console.log(err)
				})
			},
			submit(){
				if(!this.name){
					uni.showToast({
						icon:'none',
						title:'请输入姓名'
					})
					this.$nextTick(()=>{
						this.focusIndex = 0
					})
					return
				}
				if(!this.age){
					uni.showToast({
						icon:'none',
						title:'请输入年龄'
					})
					this.$nextTick(()=>{
						this.focusIndex = 1
					})
					return
				}
				if(!this.phone){
					uni.showToast({
						icon:'none',
						title:'请输入电话号码'
					})
					this.$nextTick(()=>{
						this.focusIndex = 2
					})
					return
				}
				if(!this.verifyCode){
					uni.showToast({
						icon:'none',
						title:'请输入验证码'
					})
					this.$nextTick(()=>{
						this.focusIndex = 3
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
				
				// 再去验证验证码是否正确
				userModel.verifyCode(this.phone, this.verifyCode).then(res=>{
					// 验证成功,打开提示弹窗并跳转到首页
					this.$refs.registerSuccess.open()
					setTimeout(()=>{
						uni.reLaunch({
							url: '../../customer/main/main'
						})
					},2000)
				})
				.catch(err=>{
					uni.showToast({
						icon: 'none',
						title: err.msg
					})
				})
			},
			toLogin(){
				uni.reLaunch({
					url: '../login/login'
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
			margin-top: 64upx;
			width: 100%;
			.form-item{
				margin-top: 38upx;
				position: relative;
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
</style>
