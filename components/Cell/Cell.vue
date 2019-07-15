<template>
	<view class="cell-container">
		<view class="cell-title">
			<view class="cell-main-wrapper">
				<text class="main">{{title}}</text>
			</view>
			<view class="cell-sub-wrapper">
				<text class="sub">{{subTitle}}</text>	
			</view>
		</view>
		<view class="cell-content" :class="subTitle !== '' ? 'nopadding':''">
			<slot>{{content}}</slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			subTitle: {
				type: String,
				default: ''
			},
			content:{
				type: String,
				default: ''
			}
		},
	}
</script>

<style lang="scss">
	.cell-container{
		background: #fff;
		padding: 0 34upx;
		margin-bottom: 8upx;
		.cell-title{
			font-size: 36upx;
			height: 70upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			.cell-main-wrapper{
				display: flex;
				align-items: center;	
				height: 36upx;
				color: #fb6d25;
				border-left:4upx solid #fb6d25;
				.main{
					font-size: 36upx;
					line-height: 36upx;
					text-indent: 20upx;
				}
			}
			.cell-sub-wrapper{
				margin-left: 84upx;
				font-size: 30upx;
				height: 36upx;
				color: #595959;
				display: flex;
				flex-direction: row;
				align-items: flex-end;
				.sub{
					line-height: 30upx;
					height: 30upx;
				}
			}
		}
		.cell-content{
			color: #595959;
			font-size: 30upx;
			padding-bottom: 20upx;
			&.nopadding{
				padding-bottom: unset;
			}
		}
	}
</style>
