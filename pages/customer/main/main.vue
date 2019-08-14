<template>
	<view class="container customer-container">
		<view class="customer-wrapper">
			<Home v-if="currentTab === 'Home'" />
			<Project v-if="currentTab === 'Project'" />
			<Resume v-if="currentTab === 'Resume'" />
			<User v-if="currentTab === 'User'" />
			<TabBar @switchTab="switchTabBar" :index="tabIndex" />
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
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
			...mapState(['tabIndex']),
			currentTab(){
				return this.tabBar[this.tabIndex]
			}
		},
		methods:{
			...mapMutations(['switchTab']),
			switchTabBar(type){
				this.switchTab(type)
			},
			login(){
				uni.login({
					provider: 'weixin',
					success(res){
						if(res.errMsg === 'login:ok'){
							// 执行后台登录
							userModel.wxLogin(res.code).then(res=>{
								const { code, message, data } = res.data
								if(code === '0'){
									// 将返回的token存入本地
									uni.setStorageSync('token', data)
								}else{
									uni.showToast({
										icon: 'none',
										title: message
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
