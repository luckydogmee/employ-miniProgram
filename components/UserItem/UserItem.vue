<template>
	<view class="user-item">
		<view class="user-avatar">
			<image src="../../static/img/avatar.png" mode=""></image>
		</view>
		<view class="user-info">
			<view class="user-info-name">
				<text>{{data.name}}</text>
				<text class="tag" v-if="type === 'customer'">金牌猎手</text>
			</view>
			<view class="user-info-balance">{{type === 'seller' ? '履约金余额' : '累计佣金收入' }}: <text class="balance">6000元</text></view>
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
		},
		props: {
			type: {
				type: String,
				default: 'seller'
			},
			data: {
				type: Object,
				default: ()=>({})
			}
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
			display: flex;
			align-items: center;
			text.tag{
				margin-left:20upx;
				color: #fff;
				font-size: 20upx;
				border-radius: 6upx;
				height: 30upx;
				line-height: 30upx;
				padding: 0 10upx;
				background: linear-gradient(#f9b28f, #fb8c69);
			}
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
