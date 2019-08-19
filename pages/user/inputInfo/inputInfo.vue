<template>
	<view class="register-container">
		<view class="content">
			<view class="logo">
				请完善个人信息
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
				<view class="agreement">
					<checkbox-group @change="agreementChange">
						<label>
							<checkbox value="0" :checked="false" color="#feae86" />我已阅读并接受《用户协议》
						</label>
					</checkbox-group>
				</view>
				<view class="form-item">
					<button class="default-btn submit-btn" @click="submit" >同意并登录</button>
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
				focusArray: ['name', 'age'],
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
		mounted() {
			uni.showToast({
				icon: 'none',
				title: '请完善信息'
			})
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
				if(!this.agreement){
					uni.showToast({
						icon:'none',
						title:'必须同意用户协议'
					})
					return
				}
				userModel.register(this.name, this.age).then(res=>{
					// 注册成功
					const { code, message, data } = res.data
					if(code === '0'){
						uni.setStorageSync('isRegister', 0)
						this.$refs.registerSuccess.open()
						// uni.showToast({
						// 	title: '登录成功，即将跳转'
						// })
						setTimeout(()=>{
							uni.reLaunch({
								url: '../../customer/main/main'
							})
						},2000)	
					}else{
						uni.showToast({
							icon:'none',
							title: message
						})
					}
				}).catch(err=>{
					uni.showToast({
						icon:'none',
						title: '提交失败，请稍候重试'
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
		margin-top: 260upx;
		background: rgba(0,0,0,0);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.logo{
			width: 360upx;
			height: 98upx;
			font-size: 44upx;
			color: #f79966;
			font-weight: 600;
		}
		.form{
			// margin-top: 24upx;
			font-weight:600;
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
			position: relative;
			left: -16upx;
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
