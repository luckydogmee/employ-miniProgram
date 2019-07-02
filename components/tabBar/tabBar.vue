<template>
	<view class="tabbar">
		<view class="tabbar-item" @click="switchTab('home')">
			<image class="item-icon" v-if="active === 'home'" src="../../static/img/homeHL.png"></image>
			<image class="item-icon" v-else src="../../static/img/home.png"></image>
			<view class="tabbar-item-text">首页</view>
		</view>
		<view class="tabbar-item" @click="switchTab('user')">
			<image class="item-icon" v-if="active === 'user'" src="../../static/img/userHL.png"></image>
			<image class="item-icon" v-else src="../../static/img/user.png"></image>
			<view class="tabbar-item-text">我的</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 'home'
			};
		},
		methods:{
			switchTab(type){
				this.active = type
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar{
		width: 750upx;
		height: 100upx;
		background: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	.tabbar-item{
		width: 100upx;
		height: 100%;
		text-align:center;
		font-size: 28upx;
		display: flex;
		flex-direction: column;
		justify-content: center ;
		align-items: center;
		.item-icon{
			height: 40upx;
			width: 50upx;
		}
	}
</style>
