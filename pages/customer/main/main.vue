<template>
	<view class="container customer-container">
		<Home v-if="currentTab === 'Home'" />
		<Project v-if="currentTab === 'Project'" />
		<Resume v-if="currentTab === 'Resume'" />
		<Project v-if="currentTab === 'User'" />
		<TabBar @switchTab="switchTab" />
	</view>
</template>

<script>
	import TabBar from '../../../components/TabBar/TabBar.vue'
	import Home from '../home/home.vue'
	import Project from '../project/project.vue'
	import Resume from '../resume/resume.vue'
	import User from '../user/user'
	export default {
		data(){
			return {
				index: 0,
				tabBar:['Home','Project','Resume','User']
			}
		},
		components:{
			TabBar,
			Home,
			Project,
			Resume,
			User
		},
		computed:{
			currentTab(){
				return this.tabBar[this.index]
			}
		},
		methods:{
			switchTab(type){
				this.index = type
			}
		},
	}
</script>

<style>
</style>
