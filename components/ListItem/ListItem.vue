<template>
	<view class="list-item">
		<view class="image">
			<image src="../../static/img/avatar.png" mode=""></image>
		</view>
		<view class="info">
			<view class="info-title">销售经理</view>
			<view class="info-price">3000-6000元/月</view>
			<view class="info-location">
				<image src="../../static/icon/location.png"></image>
				<text>成华区钻石广场A座</text>
			</view>
		</view>
		<view class="operation">
			<view class="operation-describe">
				<view class="operation-image">
					<image src="../../static/icon/money.png" mode=""></image>
				</view>
				<view class="operation-pay">
					<view class="operation-pay-price">
						300元/天
					</view>
					<view class="operation-pay-time">
						30天返费
					</view>
				</view>				
			</view>
			<view class="operation-see">
				<button type="default" @click="showDetail">查看</button>
			</view>
			<view class="operation-date">
				5月22日发布
			</view>
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
			data: {
				type: Object,
				default: ()=>({})
			},
		},
		methods:{
			showDetail(){
				const id = this.data.id || 1
				this.$emit('showDetail',id)
			}
		}
	}
</script>

<style lang="scss">
	.list-item{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items:flex-start;
		width: 750upx;
		height: 230upx;
		background: #fff;
		padding: 30upx 0;
		box-sizing: border-box;
		margin-bottom: 16upx;
	}
	.image{
		image{
			height: 170upx;
			width: 174upx;
			border-radius: 50%;
		}
	}
	.info{
		.info-title{
			font-size: 32upx;
			color: #595959;
			margin-top: 10upx;
			margin-bottom: 20upx;
		}
		.info-price{
			font-size: 26upx;
			margin-bottom: 20upx;
			color: #595959;
		}
		.info-location{
			display: flex;
			flex-direction: row;
			align-items: center;
			image{
				height: 20upx;
				width: 16upx;
				margin-right: 6upx;
			}
			text{
				font-size: 20upx;
				color: #8e8c8c;
			}
		}	
	}
	.operation{
		.operation-describe{
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			margin-bottom: 20upx;
			.operation-image{
				width: 40upx;
				height: 52upx;
				margin-right: 30upx;
				image{
					width: 100%;
					height: 100%;
				}
			}	
		}
		.operation-pay{
			height: 52upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.operation-pay-price{
				color: #ff9058;
				font-size: 26upx;
				line-height: 26upx;
				margin-bottom: 6upx;
			}
			.operation-pay-time{
				color: #595959;
				font-size: 18upx;
				font-weight: 600;
			}	
		}
		.operation-see{
			width: 100%;
			text-align: center;
			margin-bottom: 20upx;
			button{
				height: 48upx;
				width: 160upx;
				// background: url(../static/icon/button-bg.png) no-repeat;
				// background-size: contain;
				background: #ff9058;
				font-size: 30upx;
				line-height: 48upx;
				color: #fff;
				&:after{
					border: none;
				}
			}
		}
		.operation-date{
			color: #595959;
			font-size: 20upx;
			width: 100%;
			text-align: center;
		}
	}
	
</style>
