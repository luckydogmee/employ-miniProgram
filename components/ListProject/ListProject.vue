<template>
	<view class="list-item">
		<view class="image">
			<image src="../../static/img/avatar.png" mode=""></image>
		</view>
		<view class="info">
			<view class="info-title">{{projectData.jobName}}</view>
			<view class="info-price">{{projectData.avgSalary}}元/月</view>
			<view class="info-location">
				<image src="../../static/icon/location.png"></image>
				<text>{{projectData.address}}</text>
			</view>
			<view class="info-date">
				{{projectData.createTime}}
			</view>
		</view>
		<view class="operation">
			<!-- <view class="operation-single" v-if="data.type === 'started'"> -->
			<view class="operation-single" v-if="projectData.collectionJobStatus == 1">
				<button class="default-btn" @click="showDetail">岗位详情</button>
				<button class="default-btn" @click="showDeliveryDetail">交付详情</button>
				<button class="default-btn" @click="recommend">立即推荐</button>
				<view class="operation-date">
					{{projectData.recriptTime}}
				</view>	
			</view>
			<!-- <view class="operation-single" v-if="data.type === 'notStart'"> -->
			<view class="operation-single" v-if="projectData.collectionJobStatus == 0">
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
			projectData: {
				type: Object,
				default: ()=>({})
			},
		},
		methods:{
			show(){
				const { id, collectionJobStatus } = this.projectData
				this.$emit('on-show',collectionJobStatus,id)
			},
			showDetail(){
				const id = this.projectData.id
				this.$emit('on-showDetail',id)
			},
			showDeliveryDetail(){
				const id = this.projectData.id
				this.$emit('on-showDeliveryDetail',id)
			},
			recommend(){
				const id = this.projectData.id
				this.$emit('on-recommend',id)
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
