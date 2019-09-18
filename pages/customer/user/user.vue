<template>
	<view>
		<UserItem type="customer" :userData="userData" />
		<view class="flex-container">
			<view class="flex-item">
				<view class="flex-title">共推荐求职者</view>
				<view class="flex-sub">{{user.totalNumber}}个</view>
			</view>
			<view class="flex-item">
				<view class="flex-title">应聘成功</view>
				<view class="flex-sub">{{user.successNum}}人</view>
			</view>
			<view class="flex-item">
				<view class="flex-title">未提现金额</view>
				<view class="flex-sub">{{user.noCashout}}元</view>
			</view>
		</view>
		<view class="button-group">
			<view class="button-item navigate" @click="getCashoutList">
				申请提现
			</view>
			<view class="button-item switch-account">
				切换帐号
			</view>
		</view>
		<uni-popup ref="recommendRecord" custom="true" :showMask="false" :maskClick="false">
			<view class="recommendDialog">
				<view class="recommend-title">
					提现信息
				</view>
				<view class="recommend-title-sub">
					<view class="item" @click="switchItem(0)" :class="{'active':dialogActive === 0}" >
						提现列表
					</view>
					<view class="item" @click="switchItem(1)" :class="{'active':dialogActive === 1}">
						提现记录
					</view>
				</view>
				<view class="recommend-table">
					<view class="tr">
						<view class="th t1"><text>岗位</text><image src="../../../static/icon/dialog-post.png" mode=""></image></view>
						<view class="th t2"><text>姓名</text><image src="../../../static/icon/dialog-name.png" mode=""></image></view>
						<view class="th t3"><text>赏金</text><image src="../../../static/icon/dialog-reward.png" mode=""></image></view>
						<view class="th t4"><text>{{dialogActive == 0 ? '过保时间': '提现时间'}}</text><image src="../../../static/icon/dialog-time.png" mode=""></image></view>
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
				<view class="recommend-footer" v-if="dialogActive == 0">
					<view class="dialog-btn" @click="cashOut">
						立即提现
					</view>
					<view class="dialog-btn" @click="cancelCashOut">
						再等等吧
					</view>
				</view>
				<image class="close-icon" src="../../../static/icon/close.png" @click="closeCashoutDialog" />
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import UserItem from '../../../components/UserItem/UserItem.vue'
	import UserModel from '@/models/user.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	const userModel = new UserModel()
	export default {
		data() {
			return {
				userData: {
					// name: '张三'
				},
				user:{},
				dialogActive: 0,
				cashoutList:[]
			}
		},
		components: {
			UserItem,
			uniPopup
		},
		// onLoad(){
		// 	this.getUserInfo()
		// },
		mounted(){
			this.getUserInfo()
		},
		methods: {
			getUserInfo(){
				uni.showLoading()
				userModel.getUserInfo().then(res=>{
					//数据绑定
					uni.hideLoading()
					const { code, message, data } = res.data
					if(code === '0'){
						this.user = data
						this.userData = data
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
						title:'获取用户信息失败'
					})
				})
			},
			switchItem(index){
				this.dialogActive = index
				if(this.dialogActive == 0){
					this.getCashoutList()
				}else{
					this.getCashoutRecord()
				}
			},
			getCashoutList(){
				uni.showLoading({
					title: '加载中...'
				})
				userModel.getCashoutList().then(res=>{
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
						title: '获取提现信息失败'
					})
				})
			},
			closeCashoutDialog(){
				this.$refs.recommendRecord.close()
			},
			cancelCashOut(){
				this.closeCashoutDialog()
			},
			cashOut(){
				if(this.cashoutList.length>0){
					uni.showLoading({
						title: '请稍等...'
					})
					userModel.cashout().then(res=>{
						uni.hideLoading()
						const {code, message, data } = res.data
						if(code === '0'){
							this.closeCashoutDialog()
							uni.showModal({
								title: '',
								content: '提现申请提交成功!\r\n我们将在三个工作日内与您联系，并汇款到您的账户。',
								showCancel: false,
								confirmText: '好的',
								success: res => {},
							})
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
							title: '提现失败，请稍后再试'
						})
					})	
				}else{
					uni.showToast({
						icon: 'none',
						title: '当前没有可提现'
					})
				}
			},
			// 这是提现记录，需要改地址
			getCashoutRecord(){
				uni.showLoading({
					title: '正在获取...'
				})
				this.cashoutList = []
				userModel.getCashoutList().then(res=>{
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
						title: '获取提现记录失败'
					})
				})
			}
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
	.recommendDialog{
		height: 610upx;
	}
	.recommend-title{
		font-size: 36upx;
		width: 100%;
		text-align: center;
		color: #ff9058;
		margin-top: 30upx;
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
