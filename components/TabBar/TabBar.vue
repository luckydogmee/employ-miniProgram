<template>
	<view class="tabbar-container">
		<view class="tabbar tabbar-customer" v-if="type === 'customer'">
			<view class="tabbar-item" @click="switchTab(0)">
				<image class="item-icon" v-if="activeTab === 0" src="../../static/icon/customer-post-active.png"></image>
				<image class="item-icon" v-else src="../../static/icon/customer-post.png"></image>
				<view class="tabbar-item-text" :class="activeTab === 0 ? 'text-active':''">岗位列表</view>
			</view>
			<view class="tabbar-item" @click="switchTab(1)">
				<image class="item-icon" v-if="activeTab === 1" src="../../static/icon/customer-project-active.png"></image>
				<image class="item-icon" v-else src="../../static/icon/customer-project.png"></image>
				<view class="tabbar-item-text" :class="activeTab === 1 ? 'text-active':''">我的项目</view>
			</view>
			<view class="tabbar-item" @click="switchTab(2)">
				<image class="item-icon" v-if="activeTab === 2" src="../../static/icon/customer-resume-active.png"></image>
				<image class="item-icon" v-else src="../../static/icon/customer-resume.png"></image>
				<view class="tabbar-item-text" :class="activeTab === 2 ? 'text-active':''">我的简历库</view>
			</view>
			<view class="tabbar-item" @click="switchTab(3)">
				<image class="item-icon" v-if="activeTab === 3" src="../../static/icon/customer-user-active.png"></image>
				<image class="item-icon" v-else src="../../static/icon/customer-user.png"></image>
				<view class="tabbar-item-text" :class="activeTab === 3 ? 'text-active':''">个人中心</view>
			</view>	
		</view>
		<view class="tabbar tabber-seller" v-if="type === 'seller'">
			<view class="tabbar-item" @click="switchTab(0)">
				<image class="item-icon" v-if="activeTab === 0" src="../../static/icon/seller-home-active.png"></image>
				<image class="item-icon" v-else src="../../static/icon/seller-home.png"></image>
				<view class="tabbar-item-text" :class="activeTab === 0 ? 'text-active':''">发布的项目</view>
			</view>
			<view class="tabbar-item" @click="switchTab(1)">
				<image class="item-icon" v-if="activeTab === 1" src="../../static/icon/seller-choose-active.png"></image>
				<image class="item-icon" v-else src="../../static/icon/seller-choose.png"></image>
				<view class="tabbar-item-text" :class="activeTab === 1 ? 'text-active':''">我的候选人</view>
			</view>
			<view class="tabbar-item" @click="switchTab(2)">
				<image class="item-icon" v-if="activeTab === 2" src="../../static/icon/seller-user-active.png"></image>
				<image class="item-icon" v-else src="../../static/icon/seller-user.png"></image>
				<view class="tabbar-item-text" :class="activeTab === 2 ? 'text-active':''">企业中心</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 0
			};
		},
		props:{
			type:{
				type: String,
				default:'customer'
			},
			index:{
				type:Number,
				default:0
			}
		},
		mounted() {
			this.activeTab = this.index
		},
		methods:{
			switchTab(type){
				this.activeTab = type
				this.$emit('switchTab',type)
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
		position: fixed;
		padding-top: 6upx;
		bottom: 0;
		left: 0;
		box-shadow: -10px 0px 10px #fff;
		box-sizing: border-box;
		border-top: 1upx solid #eee;
	}
	.tabbar-item{
		width: 150upx;
		height: 100%;
		text-align:center;
		font-size: 24upx;
		display: flex;
		flex-direction: column;
		justify-content: center ;
		align-items: center;
		.item-icon{
			height: 40upx;
			width: 40upx;
		}
	}
	.tabbar-item-text{
		font-size: 20upx;
		line-height: 40upx;
	}
	.text-active{
		color:#ff8352;
	}
</style>
