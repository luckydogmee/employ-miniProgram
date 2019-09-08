<template>
	<view class="list-item">
		<view class="image">
			<image :src="resumeData.avatar" mode=""></image>
		</view>
		<view class="info">
			<view class="info-title">{{resumeData.jobName}}</view>
			<view class="info-name">
				<text>候选人姓名: {{resumeData.name}}</text>
			</view>
			<view class="info-event">
				{{resumeData.latestFeedback}}
			</view>
		</view>
		<view class="operation">
			<view class="operation-single">
				<button class="default-btn" @click="showDetail">{{btnText}}</button>
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
			resumeData: {
				type: Object,
				default: ()=>({})
			},
			btnText:{
				type: String,
				default: '查看'
			}
		},
		methods:{
			show(){
				const { id, collectionJobStatus } = this.projectData
				this.$emit('on-show',collectionJobStatus,id)
			},
			showDetail(){
				const id = this.projectData.id
				this.$emit('on-show',id)
			}
		}
	}
</script>
<style lang="scss">
	.list-item{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items:center;
		width: 750upx;
		height: 156upx;
		background: #fff;
		padding:0 20upx ;
		box-sizing: border-box;
		margin-bottom: 16upx;
	}
	.image{
		image{
			height: 136upx;
			width: 136upx;
			border-radius: 50%;
			margin-top: 10upx;
		}
	}
	.info{
		padding-left: 70upx;
		font-size: 24upx;
		width: 384upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		line-height: 36upx;
		.info-title{
			color: #101010;
		}
		.info-name{
			color: #101010;
		}
		.info-event{
			color: #ff9058;
		}
	}
	.operation-single{
		height: 200upx;
		width: 160upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		button{
			font-size: 28upx;
			width: 160upx;
			height: 50upx;
			line-height: 50upx;
			border-radius: 18upx;
		}
	}
</style>
