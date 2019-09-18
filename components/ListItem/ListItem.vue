<template>
	<view class="list-item">
		<view class="image">
			<image src="../../static/img/company.png" mode=""></image>
		</view>
		<view class="info">
			<view class="info-title">{{postData.jobName}}</view>
			<view class="info-price">{{postData.avgSalary}}元/月</view>
			<view class="info-location">
				<image src="../../static/icon/location.png"></image>
				<text>{{postData.address}}</text>
			</view>
		</view>
		<view class="operation">
			<view class="operation-describe">
				<view class="operation-image">
					<image src="../../static/icon/money.png" mode=""></image>
				</view>
				<view class="operation-pay">
					<view class="operation-pay-price">
						{{postData.reward}}元/人
					</view>
					<view class="operation-pay-time">
						{{postData.overtime|filterOverTime}}返费
					</view>
				</view>				
			</view>
			<view class="operation-see">
				<button type="default" @click="showDetail">{{btnText}}</button>
			</view>
			<view class="operation-date">
				{{postData.createTime}}发布
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
			postData: {
				type: Object,
				default: ()=>({})
			},
			btnText: {
				type: String,
				default: '接单'
			}
		},
		filters:{
			filterOverTime(time){
				const overtime = time == 0 ? '7天' : time == 1 ? '15天' : '30天'
				return `${overtime}`
			}
		},
		methods:{
			showDetail(){
				const id = this.postData.id || 1
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
		width: 174upx;
		image{
			height: 170upx;
			width: 174upx;
			border-radius: 50%;
		}
	}
	.info{
		width: 230upx;
		.info-title{
			font-size: 32upx;
			color: #595959;
			margin-top: 10upx;
			margin-bottom: 20upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
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
		width: 238upx;
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
