<template>
	<view class="list-item">
		<view class="image">
			<image :src="receviedInfo.avatar" mode=""></image>
		</view>
		<view class="info">
			<view class="info-top">
				<view class="info-top-item info-title">{{receviedInfo.jobName}}</view>
				<view class="info-top-item info-name">被推荐人姓名: {{receviedInfo.name}}</view>	
			</view>
			<view class="info-bottom">
				{{receviedInfo.latestFeedback}}
			</view>
		</view>
		<view class="operation">
			<button class="default-btn" @click="showDetail">查&nbsp;&nbsp;看</button>
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
			receviedInfo: {
				type: Object,
				default: ()=>({})
			},
			type: {
				type: String,
				default: ''
			}
		},
		methods:{
			showDetail(){
				//此处根据类别判断查看动作或者根本不做判断
				this.$emit('showDetail')
			},
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
		height: 190upx;
		background: #fff;
		padding: 10upx 0;
		box-sizing: border-box;
		margin-bottom: 16upx;
	}
	.image{
		width: 200upx;
		text-align: center;
		image{
			height: 170upx;
			width: 174upx;
			border-radius: 50%;
		}
	}
	.info{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 24upx;
		height: 100%;
		.info-top{
			color: #010101;
			.info-top-item{
				margin-bottom:10upx;
			}
		}
		.info-bottom{
			color: #ff9058;
		}
	}
	.operation{
		width: 200upx;
		height: 100%;
		display: flex;
		align-items: center;
		button{
			height: 54upx;
			line-height: 54upx;
			width: 170upx;
			border-radius: 16upx;
		}
	}
</style>
