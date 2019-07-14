<template>
	<view class="container customer-container">
		<view class="customer-wrapper">
			<Home v-if="currentTab === 'Home'" />
			<Choose v-if="currentTab === 'Choose'" />
			<User v-if="currentTab === 'User'" />	
		</view>
		<TabBar type="seller" @switchTab="switchTab" :index="index" />
	</view>
</template>

<script>
	import TabBar from '../../../components/TabBar/TabBar.vue'
	import Home from '../home/home.vue'
	import Choose from '../choose/choose.vue'
	import User from '../user/user'
	export default {
		data(){
			return {
				index: 2,
				tabBar:['Home','Choose','User']
			}
		},
		components:{
			TabBar,
			Home,
			Choose,
			User
		},
		computed:{
			currentTab(){
				return this.tabBar[this.index]
			}
		},
		onPullDownRefresh() {
			console.log(222)
		},
		methods:{
			switchTab(type){
				this.index = type
			}
		}
	}
</script>

<style lang="scss">
	.customer-wrapper{
		padding-bottom: 100upx;
	}
</style>
