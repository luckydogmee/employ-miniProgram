<template>
	<view class="flex-container">
		<view class="flex-item">
			<view class="flex-title">共发布岗位</view>
			<view class="flex-sub">11个</view>
		</view>
		<view class="flex-item">
			<view class="flex-title">已收到简历</view>
			<view class="flex-sub">24份</view>
		</view>
		<view class="flex-item">
			<view class="flex-title">累积花费<text class="flex-detail">详单</text></view>
			<view class="flex-sub">4500元</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: ()=>({})
			},
		},
	}
</script>

<style lang="scss">
	.flex-container{
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #fff;
		height: 88upx;
	}
	.flex-item{
		flex: 1;
		font-size: 24upx;
		line-height: 36upx;
		text-align: center;
		.flex-title{
			color: #010101;
		}
		.flex-sub{
			color: #ff9058
		}
		.flex-detail{
			text-decoration: underline;
			margin-left: 10upx;
		}
	}
</style>
