<template>
	<view class="register-container">
		<view class="content">
			<view class="logo">
				<image src="../../../static/img/logo.png" mode=""></image>
			</view>
			<view class="form">
				<view class="form-item">
					<input class="sy-input" maxlength="15" placeholder="手机号码" placeholder-class="input-placeholder"  />
				</view>
				<view class="form-item">
					<input class="sy-input" maxlength="6" placeholder="短信验证码" placeholder-class="input-placeholder"  />
					<button class="default-btn verify-code-btn">{{verifyCodeText}}</button>
				</view>
				<view class="special-item">
					<text class="savePhone">保存此号码供以后授权使用</text>
					<switch :checked="savePhone" @change="savePhoneChange" color="#feae86" style="transform:scale(0.5)" />
				</view>
				<view class="form-item">
					<button class="default-btn submit-btn" >登录</button>
				</view>
				<!-- <view class="form-item to-login">
					<text>已有账号？点这里直接登录>></text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				verifyCodeText: '发送验证码',
				savePhone: true
			};
		},
		methods:{
			savePhoneChange(){
				this.savePhone = ! this.savePhone
				console.log(this.savePhone)
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
	}
</style>
