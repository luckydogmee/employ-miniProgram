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
					<button class="default-btn verify-code-btn" @click="getVerifyCode">{{verifyCodeText}}</button>
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
					<text>已有账号？点这里直接登录>></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				verifyCodeText: '发送验证码',
				verifyStatus:true,
				focusArray: ['name', 'age', 'phone', 'verify'],
				focusIndex: null,  //焦点位置
				agreement:false, // 是否同意
				name: '',
				age: '',
				phone: '',
				verifyCode: ''
			};
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
				if(!this.phone){
					uni.showToast({
						icon:'none',
						title:'请输入电话号码'
					})
					this.focusIndex = 2
					return
				}
				const phoneRule = "^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$"
				const correctPhone = this.phone.match(phoneRule)
				if(!correctPhone){
					uni.showToast({
						icon:'none',
						title:'手机号码错误，请确认'
					})
					this.focusIndex = 2
					return
				}
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
</style>
