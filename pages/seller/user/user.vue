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
				<view class="flex-title">累积花费<text class="flex-detail">详单</text></view>
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
					url: '../../user/register-seller/register-seller'
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
