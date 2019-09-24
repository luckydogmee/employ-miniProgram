<template>
	<view class="container customer-container">
		<view class="customer-wrapper">
			<Home v-if="currentTab === 'Home' && hasToken" ref="home" @showLogin="showLogin" @hideLogin="hideLogin" />
			<Project v-if="currentTab === 'Project'" ref="project" @showLogin="showLogin" @hideLogin="hideLogin" />
			<Resume v-if="currentTab === 'Resume'" ref="resume" @showLogin="showLogin" @hideLogin="hideLogin" />
			<User v-if="currentTab === 'User'" @showLogin="showLogin" @hideLogin="hideLogin" />
			<TabBar @switchTab="switchTabBar" :index="tabIndex" @showLogin="showLogin" @completeInfo="completeInfo" @hideLogin="hideLogin"  />
			<uni-popup ref="noticeLogin" custom="true">
				<view class="notice-login-dialog">
					<view class="notice-title">
						登录微猎头快开始接单
					</view>
					<button class="notice-btn notice-wechat" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信帐号快速登录</button>
					<button class="notice-btn notice-mobile" @click="toLogin">手机号注册/登录</button>
				</view>
			</uni-popup>
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
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import UserModel from '../../../models/user.js'
	const userModel = new UserModel()
	export default {
		data(){
			return {
				tabBar: ['Home','Project','Resume','User'],
				hasToken: false
			}
		},
		components:{
			TabBar,
			Home,
			Project,
			Resume,
			User,
			uniPopup
		},
		onReady() {
			// 第一次进入的时候
			const that = this
			const token = uni.getStorageSync('token')
			// uni.checkSession({
			// 	success(res) {
			// 		if(token){
			// 			// 当前用户登录未过期，用原来的token即可
			// 			that.hasToken = true
			// 		}else{
			// 			uni.removeStorageSync('isLogin')
			// 			uni.removeStorageSync('isRegister')
			// 			that.login()
			// 		}
			// 	},
			// 	fail(err) {
			// 		uni.removeStorageSync('isLogin')
			// 		uni.removeStorageSync('isRegister')
			// 		that.login()
			// 	}
			// })	
			// 直接login，避免麻烦同时避免进入时用的B端token
			this.login()
		},
		onPullDownRefresh(){
			if(this.tabIndex === 0){
				this.$refs.home.refresh()
			}
			if(this.tabIndex === 1){
				this.$refs.project.refresh()
			}
			if(this.tabIndex === 2){
				this.$refs.resume.refresh()
			}
		},
		onReachBottom() {
			if(this.tabIndex === 0){
				this.$refs.home.getNext()
			}
			if(this.tabIndex === 1){
				this.$refs.project.getNext()
			}
			if(this.tabIndex === 2){
				this.$refs.resume.getNext()
			}
		},
		onShow(){
			if(this.tabIndex === 2){
				this.$refs.resume.refresh()
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
				this.switchTab({index: type})
			},
			login(){
				const that = this
				uni.showLoading({
					mask: true
				})
				uni.login({
					provider: 'weixin',
					success(res){
						if(res.errMsg === 'login:ok'){
							// 执行后台登录
							userModel.wxLogin(res.code).then(res=>{
								const { code, message, data } = res.data
								if(code === '0'){
									// 将返回的token存入本地
									uni.setStorageSync('token', data.token)
									uni.setStorageSync('isLogin',data.isLogin)
									uni.setStorageSync('isRegister',data.isRegister)
									uni.setStorageSync('loginType','')
									uni.hideLoading()
									that.hasToken = true
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
			},
			// 显示登录框
			showLogin(){
				this.$refs.noticeLogin.open()
			},
			hideLogin(){
				this.$refs.noticeLogin.close()
			},
			completeInfo(){
				uni.navigateTo({
					url: '../../user/inputInfo/inputInfo'
				});
			},
			getPhoneNumber(e){
				const { iv, encryptedData, errMsg } = e.detail
				const that = this
				if( errMsg !== 'getPhoneNumber:ok' ){
					uni.showToast({
						icon: 'none',
						title:'授权失败，请重新授权'
					})
					return 
				}
				// 以下执行登录,需要后台提供一个接口
				uni.checkSession({
					success(response) {
						if(response.errMsg === 'checkSession:ok'){
							// 此处执行后台登录过程，由后台得到手机号并与openid绑定，然后返回token
							uni.showLoading({
								title: '登录中，请稍候'
							})
							userModel.getBindPhoneNumber(encryptedData, iv).then(res=>{
								const { code, data, message } = res.data
								// 判断是成功了,在这里判断是否已经绑定手机号，以及是否完善信息，待写
								if (code === '0') {
									// 将token存入缓存中
									uni.setStorageSync('phoneNumber',data)
									that.fastLogin(data)
									
								}else{
									uni.hideLoading()
									uni.showToast({
										icon: 'none',
										title:'登录失败，请重新授权'
									})
								}	
							})
						}else{
							uni.hideLoading()
							uni.showToast({
								icon: 'none',
								title:'获取code失败'
							})
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			fastLogin(phoneNumber){
				const that = this
				userModel.fastLogin(phoneNumber).then(res=>{
					uni.hideLoading()
					const { code, data, message } = res.data
					if(code === '0'){
						that.hideLogin()
						uni.setStorageSync('isLogin', 0)
						uni.setStorageSync('userType', data.type)
						if(data.isRegister === '0'){
							uni.setStorageSync('isRegister', 0)
							uni.showToast({
								title:'登录成功'
							})		
						}else{
							// uni.navigateTo({
							// 	url: '../../user/inputInfo/inputInfo',
							// })
							uni.navigateTo({
								url: '../../user/register/register?phone='+phoneNumber
							})
						}
					}else{
						uni.showToast({
							icon: 'none',
							title: message
						})
					}
				}).catch(err=>{
					uni.showToast({
						icon: 'none',
						title: '登录失败，请稍候重试'
					})
				})
			},
			toLogin(){
				uni.navigateTo({
					url: '../../user/login/login',
				})
			},
		},
	}
</script>

<style src="./main.scss" lang="scss"></style>
