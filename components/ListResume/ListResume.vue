<template>
	<view class="list-item">
		<view class="image">
			<image src="../../static/img/avatar.png" mode=""></image>
		</view>
		<view class="info">
			<view class="up">
				<view class="describe">
					<view class="describe-item describe-name">王大拿</view>
					<view class="describe-item describe-record">
						<text>年龄: 27</text>
						<text>学历: 大专</text>
					</view>
					<view class="describe-item describe-expection">
						期望的工作: 市场专员、房地产市场专员、房地产市场专员、房地产
					</view>
				</view>	
				<view class="describe-call">
					<image src="../../static/icon/mobile.png" mode="" @click.stop="callClick"></image>
				</view>
			</view>
			<view class="operation">
				<button class="operation-item" @click.stop="detailClick">查看详情</button>
				<button class="operation-item" @click.stop="recordClick">推荐记录</button>
				<button class="operation-item" @click.stop="recommedClick">推荐Ta</button>
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
			},
			detailClick(){
				this.$emit('on-click-detail')
			},
			recordClick(){
				this.$emit('on-click-record')
			},
			recommedClick(){
				this.$emit('on-click-recommend')
			},
			callClick(){
				this.$emit('on-click-call')
			}
		}
	}
</script>

<style lang="scss">
	.list-item{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: flex-start;
		width: 750upx;
		height: 194upx;
		background: #fff;
		padding: 18upx 0;
		box-sizing: border-box;
		margin-bottom: 16upx;
	}
	.image{
		image{
			height: 136upx;
			width: 136upx;
			border-radius: 50%;
		}
	}
	.info{
		width: 520upx;
		.describe{
			font-size: 24upx;
			color: #010101;
			font-weight: 500;
		}
		.describe-item{
			height: 36upx;
			width: 378upx;
			overflow: hidden;    
			text-overflow: ellipsis;      //超出部分以省略号显示
			white-space: nowrap;
			text:first-child{
				margin-right: 16upx;
			}
		}
		.describe-call{
			width: 92upx;
			height: 92upx;
			margin-left: 60upx;
			image{
				height: 100%;
				width: 100%;
			}
		}
		.up{
			display: flex;
		}
	}
	.operation{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 10upx;
		position: relative;
		left: -24upx;
		.operation-item{
			text-align: center;
			width: 130upx;
			height: 40upx;
			line-height: 40upx;
			font-size: 24upx;
			padding: unset;
			color: #fff;
			background: #fe9560;
			&:after{
				border: none;
			}
		}
	}
	
</style>
