<template>
	<view class="container customer-container">
		<view class="customer-wrapper">
			<Home v-if="currentTab === 'Home'" />
			<Project v-if="currentTab === 'Project'" />
			<Resume v-if="currentTab === 'Resume'" />
			<User v-if="currentTab === 'User'" />
			<TabBar @switchTab="switchTab" />
		</view>
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar/TabBar.vue'
	import Home from '../home/home.vue'
	import Project from '../project/project.vue'
	import Resume from '../resume/resume.vue'
	import User from '../user/user'
	import UserModel from '../../../models/user.js'
	const userModel = new UserModel()
	export default {
		data(){
			return {
				index: 1,
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
		onReady() {
			// 第一次进入的时候
			const token = uni.getStorageSync('token')
			if(token){
				uni.checkSession({
					success(res) {
						// 当前用户登录未过期，用原来的token即可
					},
					fail(err) {
						this.login()
					}
				})	
			}else{
				this.login()
			}
			
		},
		computed:{
			currentTab(){
				return this.tabBar[this.index]
			}
		},
		methods:{
			switchTab(type){
				this.index = type
			},
			login(){
				uni.login({
					provider: 'weixin',
					success(res){
						if(res.errMsg === 'login:ok'){
							// 执行后台登录
							userModel.wxLogin({
								code: res.code
							}).then(res=>{
								if(res.code === 'success'){
									// 将返回的token存入本地
									uni.setStorageSync('token', res.data.token)
								}else{
									uni.showToast({
										icon: 'none',
										title: res.msg
									})
								}
							})
						}else{
							uni.showToast({
								icon: 'none',
								title: res.errMeg
							})
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			}
		},
	}
</script>

<style>
</style>
