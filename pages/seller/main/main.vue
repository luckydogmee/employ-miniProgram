<template>
	<view class="container customer-container">
		<view class="customer-wrapper">
			<Home v-if="currentTab === 'Home'" ref="home" />
			<Choose v-if="currentTab === 'Choose'" ref="choose" />
			<User v-if="currentTab === 'User'" ref="user" />	
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
				return this.tabBar[this.tabIndex]
			}
		},
		onPullDownRefresh(){
			if(this.tabIndex === 0){
				this.$refs.home.refresh()
			}	
			if(this.tabIndex === 1){
				this.$refs.choose.refresh()
			}
		},
		onReachBottom() {
			if(this.tabIndex === 0){
				this.$refs.home.getNext()
			}
			if(this.tabIndex === 1){
				this.$refs.choose.getNext()
			}
		},
		onShow() {
			if(this.tabIndex === 1){
				this.$refs.choose.refresh()
			}
		},
		methods:{
			...mapMutations(['switchTab']),
			switchTabBar(type){
				console.log(type)
				this.switchTab({index:type})
			},
		}
	}
</script>

<style lang="scss">
	
</style>
