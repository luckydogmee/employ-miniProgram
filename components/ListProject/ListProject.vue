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
			<view class="info-date">
				2019年5月22日发布
			</view>
		</view>
		<view class="operation">
			<view class="operation-all" v-if="type === 'all'">
				<view class="operation-describe" >
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
					<button class="default-btn" @click="show">查&nbsp;&nbsp;看</button>
				</view>
				<view class="operation-date">
					2019年5月22日接单
				</view>	
			</view>
			<view class="operation-single" v-if="type === 'started'">
				<button class="default-btn" @click="showDetail">岗位详情</button>
				<button class="default-btn" @click="showDeliveryDetail">交付详情</button>
				<view class="operation-date">
					2019年5月22日接单
				</view>	
			</view>
			<view class="operation-single" v-if="type === 'notStart'">
				<button class="default-btn" @click="showDetail">岗位详情</button>
				<button class="default-btn" @click="recommend">立即推荐</button>
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
			type: {
				type: String,
				default: ''
			}
		},
		methods:{
			show(){
				const { id=1, status } = this.data
				this.$emit('show',status,id)
			},
			showDetail(){
				const id = this.data.id || 1
				this.$emit('showDetail',id)
			},
			showDeliveryDetail(){
				const id = this.data.id || 1
				this.$emit('showDeliveryDetail',id)
			},
			recommend(){
				const id = this.data.id || 1
				this.$emit('recommend',id)
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
		padding: 16upx 0;
		box-sizing: border-box;
		margin-bottom: 16upx;
	}
	.image{
		image{
			height: 170upx;
			width: 174upx;
			border-radius: 50%;
			margin-top: 14upx;
		}
	}
	.info{
		.info-title{
			font-size: 32upx;
			color: #101010;
			margin-top: 6upx;
			margin-bottom: 16upx;
		}
		.info-price{
			font-size: 26upx;
			margin-bottom: 16upx;
			color: #595959;
		}
		.info-location{
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 16upx;
			image{
				height: 20upx;
				width: 16upx;
				margin-right: 6upx;
			}
			text{
				font-size: 20upx;
				color: #595959;
			}
		}
		.info-date{
			font-size: 18upx;
			color: #595959;
		}
	}
	.operation{
		width: 200upx;
		.operation-describe{
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			margin-top: 16upx;
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
				width: 200upx;
				height: 56upx;
				line-height: 56upx;
				border-radius: 20upx;
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
			color: #ff9058;
		}
	}
	.operation-single{
		height: 200upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		button{
			font-size: 20upx;
			width: 130upx;
			height: 38upx;
			line-height: 38upx;
		}
	}
</style>
