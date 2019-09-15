<template>
	<view class="user-container">
		<UserItem type="seller" :userData="userData" @on-click-setting="setUser" />
		<view class="flex-container">
			<view class="flex-item">
				<view class="flex-title">共发布岗位</view>
				<view class="flex-sub">{{user.jobNum}}</view>
			</view>
			<view class="flex-item">
				<view class="flex-title">已收到简历</view>
				<view class="flex-sub">{{user.resumeNum}}份</view>
			</view>
			<view class="flex-item">
				<view class="flex-title">累积花费<text class="flex-detail" @click="showDetail">详单</text></view>
				<view class="flex-sub">{{user.sumMoney}}元</view>
			</view>
		</view>
		<view class="button-group">
			<view class="button-item navigate">
				使用指南
			</view>
			<view class="button-item switch-account">
				切换帐号
			</view>
		</view>
		<uni-popup ref="recommendRecord" custom="true" :showMask="false" :maskClick="false">
			<view class="recommendDialog">
				<view class="recommend-title">
					花费详情
				</view>
				<view class="recommend-table">
					<view class="tr">
						<view class="th t1"><text>岗位</text><image src="../../../static/icon/dialog-post.png" mode=""></image></view>
						<view class="th t2"><text>姓名</text><image src="../../../static/icon/dialog-name.png" mode=""></image></view>
						<view class="th t3"><text>赏金</text><image src="../../../static/icon/dialog-reward.png" mode=""></image></view>
						<view class="th t4"><text>提现时间</text><image src="../../../static/icon/dialog-time.png" mode=""></image></view>
					</view>
					<view class="scroll">
						<view class="tr " v-for="item in cashoutList" :key="item.id">
							<view class="td t1">{{item.jobName}}</view>
							<view class="td t2">{{item.name}}</view>
							<view class="td t3">{{item.reward}}</view>
							<view class="td t4">{{item.cashoutTime}}</view>
						</view>	
					</view>
				</view>
				<image class="close-icon" src="../../../static/icon/close.png" @click="closeCashoutDialog" />
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import UserItem from '../../../components/UserItem/UserItem.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import UserModel from '@/models/user.js'
	const userModel = new UserModel()
	export default {
		data() {
			return {
				userData: {
					// name: '张三'
				},
				user:{},
				cashoutList: []
			}
		},
		components: {
			UserItem,
			uniPopup
		},
		mounted(){
			this.UserInfo()
		},
		methods: {
			UserInfo(){
				userModel.getStoreInfo().then(res=>{
					//数据绑定
					const { code, message, data } = res.data
					if(code === '0'){
						this.user = data
						this.userData = data
						console.log(this.userData)
					}else{
						uni.showToast({
							icon: 'none',
							title: message
						})
					}
				}).catch(err=>{
					uni.showToast({
						icon: 'none',
						title:'获取用户信息失败'
					})
				})
			},
			setUser(){
				uni.navigateTo({
					url: '../../user/register-seller/register-seller?isModify=1',
					success() {
						uni.setNavigationBarTitle({
							title: '企业信息'
						})
					}
				})
			},
			showDetail(){
				uni.showLoading({
					title: '加载中...'
				})
				userModel.getCashoutDetail().then(res=>{
					uni.hideLoading()
					const {code, message, data } = res.data
					if(code === '0'){
						this.cashoutList = data.list
						this.$refs.recommendRecord.open()
					}else{
						uni.showToast({
							icon: 'none',
							title: message
						})
					}
				}).catch(err=>{
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '获取花费详单失败'
					})
				})
			},
			closeCashoutDialog(){
				this.$refs.recommendRecord.close()
			},
		}
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
	.button-group{
		margin-top: 106upx;
		.button-item{
			background: #fff;
			text-align: center;
			height: 82upx;
			line-height: 82upx;
			font-size: 48upx;
			color: #ff9058;
		}
		.navigate{
			margin-bottom: 26upx;
		}
	}
	.recommend-title{
		font-size: 36upx;
		width: 100%;
		text-align: center;
		color: #ff9058;
		margin-top: 30upx;
	}
	.recommendDialog {
	  height: 580rpx;
	  width: 730rpx;
	  background: #fff;
	  margin: 0 auto;
	  position: relative;
	  border: 1rpx solid #b5b5b5;
	}
	.close-icon {
	  width: 24rpx;
	  height: 24rpx;
	  position: absolute;
	  top: 16rpx;
	  right: 24rpx;
	}
	.recommend-title-sub{
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 60upx;
		padding-left: 40upx;
		font-size: 28upx;
		.item{
			margin-right: 20upx;
			&.active{
				color: #ff9058;
			}
		}
	}
	.recommend-table{
		width: 668upx;
		height: 350upx;
		margin: 20upx auto;
		border-top: 1upx solid #FFFFFF;
		border-left: 1upx solid #FFFFFF;
		.tr{
			border-bottom: 1upx solid #FFFFFF;
			display: flex;
			align-items: center;
		}
		.scroll{
			overflow: auto;
			max-height: 350upx;
		}
		.th,.td{
			box-sizing: border-box;
			border-right: 1upx solid #FFFFFF;
			text-align: center;
			color: #FFFFFF;
			width: 167upx;
		}
		.th{
			height: 60upx;
			line-height: 60upx;
			font-size: 24upx;	
			font-weight: 600;
			background: #f2a184;
			display: flex;
			align-items: center;
			justify-content: center;
			text{
				
			}
			image{
				height: 28upx;
				width: 28upx;
				margin-left: 10upx;
			}
		}
		.td{
			height: 76upx;
			font-size: 18upx;
			padding-top: 20upx;
			background: #bb836d;
			&.t3{
				padding: 20upx 16upx;
			}
		}
	}
	.recommend-footer{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		.dialog-btn{
			width: 200upx;
			height: 50upx;
			line-height: 50upx;
			color: #FFFFFF;
			background: #f2a184;
			text-align: center;
			font-size: 24upx;
			border-radius: 6upx;
		}
	}
</style>
