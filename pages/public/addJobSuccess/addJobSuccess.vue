<template>
	<view class="succes-container">
		<view class="success-title">
			提交成功！
		</view>
		<view class="success-tip">
			我们将在24小时内审核完毕，并电话通知您支付<text>{{amount}}</text>元履约保证金，在您支付
			保证金后系统功能将会自动开通，请您耐心等待。	
		</view>
		<view class="success-account">
			<view class="success-item">收款账户：成都微招网络科技有限公司</view>
			<view class="success-item">收款账号：22910801040016081</view>
			<view class="success-item">开户行：中国农业银行股份有限公司成都紫荆分行</view>	
		</view>
		<view class="success-button" @click="toHome">
			提交成功（返回）	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount: '- -'
			};
		},
		onLoad(option) {
			this.amount = option.amount
		},
		methods: {
			toHome(){
				uni.redirectTo({
					url: '../../seller/main/main'
				})
			}
		}
	}
</script>

<style lang="scss">
	.succes-container{
		height: 100%;
		width: 750upx;
		background: #FFFFFF;
		padding: 0 80upx;
		padding-top: 200upx;
		color: #ff9058;
		font-size: 26upx;
		line-height: 32upx;
	}
	.success-title{
		font-size: 34upx;
		text-align: center;
		margin-bottom: 50upx;
	}
	.success-tip{
		text{
			text-decoration: underline;
		}
	}
	.success-account{
		padding-left: 20upx;
		font-weight: 550;
		margin-top: 50upx;
		line-height: 40upx;
	}
	.success-button{
		margin: 50upx auto;
		background: #ff9058;
		width: 220upx;
		text-align: center;
		color: #fff;
		padding: 6upx 0;
	}
</style>
