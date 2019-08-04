<template>
	<view class="container customer-container">
		<view class="customer-wrapper">
			<Home v-if="currentTab === 'Home'" />
			<Choose v-if="currentTab === 'Choose'" />
			<User v-if="currentTab === 'User'" />	
		</view>
		<TabBar type="seller" @switchTab="switchTabBar" :index="tabIndex" />
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import TabBar from '../../../components/TabBar/TabBar.vue'
	import Home from '../home/home.vue'
	import Choose from '../choose/choose.vue'
	import User from '../user/user'
	export default {
		data(){
			return {
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
			...mapState(['tabIndex']),
			currentTab(){
				return this.tabBar[this.index]
			}
		},
		onPullDownRefresh() {
			console.log(222)
		},
		methods:{
			...mapMutations(['switchTab']),
			switchTabBar(type){
				this.tabIndex = type
			}
		}
	}
</script>

<style lang="scss">
	
</style>
