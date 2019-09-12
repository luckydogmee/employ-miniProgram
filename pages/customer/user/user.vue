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
			<view class="button-item navigate" @click="cashoutList">
				申请提现
			</view>
			<view class="button-item switch-account">
				切换帐号
			</view>
		</view>
	</view>
</template>

<script>
	import UserItem from '../../../components/UserItem/UserItem.vue'
	import UserModel from '@/models/user.js'
	const userModel = new UserModel()
	export default {
		data() {
			return {
				userData: {
					// name: '张三'
				},
				user:{}
			}
		},
		components: {
			UserItem,
		},
		// onLoad(){
		// 	this.getUserInfo()
		// },
		mounted(){
			this.getUserInfo()
		},
		methods: {
			getUserInfo(){
				userModel.getUserInfo().then(res=>{
					//数据绑定
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
					uni.showToast({
						icon: 'none',
						title:'获取用户信息失败'
					})
				})
			},
			cashoutList(){
				userModel.cashout().then(res=>{
					console.log(res)
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
</style>
