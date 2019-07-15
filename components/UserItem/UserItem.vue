<template>
	<view class="user-item">
		<view class="user-avatar">
			<image src="../../static/img/avatar.png" mode=""></image>
		</view>
		<view class="user-info">
			<view class="user-info-name">成都微招网络科技有限公司</view>
			<view class="user-info-balance">履约金余额: <text class="balance">6000元</text></view>
		</view>
		<view class="user-setting">
			<image src="../../static/icon/setting.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.user-item{
		height: 208upx;
		width: 750upx;
		background: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12upx;
	}
	.user-avatar{
		width: 250upx;
		text-align: center;
		image{
			height: 176upx;
			width: 176upx;
			border-radius: 50%;	
		}
	}
	.user-info{
		width: 360upx;
		color: #010101;
		font-size: 30upx;
		line-height: 60upx;
		.user-info-name{
			font-size: 30upx;
		}
		.balance{
			color: #fe0f03;
			margin-left: 10upx;
		}
	}
	.user-setting{
		width: 140upx;
		text-align: center;
		image{
			width: 54upx;
			height: 54upx;
		}
	}
</style>
