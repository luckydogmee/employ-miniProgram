<template>
	<view class="chat-container">
		<view class="chat-fixed">
			<ListChoose btnText="查看简历" />
		</view>
		<view class="chat-scroll">
			<view class="message message-a">
				<view class="message-time">
					10月16日 14:32
				</view>
				<view class="message-container">
					<view class="message-avater">
						<image src="../../../static/img/avatar-man.png" mode=""></image>
					</view>
					<view class="arrow"></view>
					<view class="message-content">
						<view class="text">已知悉，谢谢！</view>
					</view>
				</view>
			</view>
			<view class="message message-a">
				<view class="message-time">
					10月16日 14:32
				</view>
				<view class="message-container">
					<view class="message-avater">
						<image src="../../../static/img/avatar-man.png" mode=""></image>
					</view>
					<view class="arrow"></view>
					<view class="message-content" v-if="!hasBtn">
						<view class="text">已知悉，谢谢！</view>
					</view>
					<view class="message-content message-content-withbtn" v-else>
						<view class="text">谢广坤已通过面试 <br/>待知悉事项：将于10月19日入职</view>
						<view class="btn-group">
							<view class="message-btn">
								已知悉
							</view>
							<view class="message-btn">
								申诉
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="message message-b">
				<view class="message-time">
					10月16日 14:32
				</view>
				<view class="message-container">
					<view class="message-avater">
						<image src="../../../static/img/avatar-man.png" mode=""></image>
					</view>
					<view class="arrow"></view>
					<view class="message-content">
						<view class="text">已知悉，谢谢！</view>
					</view>
				</view>
			</view>
			<view class="message message-b">
				<view class="message-time">
					10月16日 14:32
				</view>
				<view class="message-container">
					<view class="message-avater">
						<image src="../../../static/img/avatar-man.png" mode=""></image>
					</view>
					<view class="arrow"></view>
					<view class="message-content" v-if="!hasBtn">
						<view class="text">已知悉，谢谢！</view>
					</view>
					<view class="message-content message-content-withbtn" v-else>
						<view class="text">谢广坤已通过面试 <br/>待知悉事项：将于10月19日入职</view>
						<view class="btn-group">
							<view class="message-btn">
								已知悉
							</view>
							<view class="message-btn">
								申诉
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ListChoose from '@/components/ListChoose/ListChoose.vue'
	export default {
		data() {
			return {
				hasBtn: true
			};
		},
		components:{
			ListChoose
		}
	}
</script>

<style lang="scss">
	.chat-container{
		background:#f1f2f7;
	}
	.chat-fixed{
		position: fixed;
		top: 0;
		left: 0;
		width: 750upx;
		height: 156upx;
	}
	.chat-scroll{
		width: 750upx;
		padding: 156upx 28upx 30upx 28upx;
		box-sizing: border-box;
	}
	.message{
		padding-top: 30upx;
		padding-bottom: 25px;
	}
	.message-time{
		color: #595959;
		font-size: 16upx;
		margin-bottom: 18upx;
		text-align: center;
	}
	.message-container{
		display: flex;
		align-items: center;
	}
	.message-a{
		.message-container{
			flex-direction: row;
		}
		.message-content{
			background: #FFFFFF;
			color: #040404;
		}
		.arrow{
			margin-left: -20upx;
			border-color: transparent #FFFFFF transparent transparent;
		}
		.btn-group{
			border-top: 1upx solid #ecb599;
		}
		.message-btn{
			border-right: 1upx solid #e28f64;
		}
	}
	.message-b{
		.message-container{
			flex-direction: row-reverse;
		}
		.message-content{
			background: #e28f64;
			color: #FFFFFF;
		}
		.arrow{
			margin-right: -20upx;
			transform: rotate(180deg);
			border-color: transparent #e28f64 transparent transparent;
		}
		.message-btn{
			border-right: 1upx solid #e28f64;
		}
	}
	.message-avater{
		width: 70upx;
		height: 70upx;
		image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.message-content{
		border-radius: 16upx;
		max-width: 486upx;
		min-width: 330upx;
		.text{
			box-sizing: border-box;
			padding: 24upx 30upx;
			font-size: 20upx;	
		}
		
	}
	.message-content-withbtn{
		min-width: 480upx;
	}
	.arrow{
		width: 0; 
		height: 0;
		border-width: 16upx;
		border-left-width: 36upx;
		border-right-width: 36upx;
		border-style: solid;
		border-color: transparent #0099CC transparent transparent;
	}
	.btn-group{
		height: 56upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		.message-btn{
			flex: 1;
			height: 100%;
			line-height: 56upx;
			text-align: center;
			font-size: 24upx;
			color: #ff8352;
			font-weight: 550;
			background-color: #FFFFFF;
		}
		.message-btn:last-child{
			border-right: none;
		}
	}
	
</style>
