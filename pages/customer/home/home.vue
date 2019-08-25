<template>
	<view class="home-customer">
		<view class="swiper-container">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item>
					<view class="swiper-item uni-bg-red">
						<image src="../../../static/img/banner1.png" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">
						<image src="../../../static/img/banner2.png" mode=""></image>
					</view>
				</swiper-item>
			</swiper>	
			<view class="switchToSeller">
				<button class="swiper-button" type="primary" hover-class="none" @click.prevent="switchToSeller">切换到企业</button>
			</view>
		</view>
		<view class="tab-container">
			<view class="tab">
				<image src="../../../static/img/currentWeek.png" mode=""></image>
			</view>
			<view class="tab">
				<image src="../../../static/img/famousCompany.png" mode=""></image>
			</view>
			<view class="tab">
				<image src="../../../static/img/urgent.png" mode=""></image>
			</view>
		</view>
		<view class="list-container">
			<ListItem v-for="item in postList" :key="item.id" :postData="item" @showDetail="showDetail" :btnText="userType===0?'接单':'查看'" />
		</view>
	</view>
</template>

<script>
	import UserModel from '@/models/user.js'
	import PostModel from '@/models/job.js'
	import ListItem from '@/components/ListItem/ListItem.vue'
	const userModel = new UserModel() 
	const postModel = new PostModel()
	export default {
		data(){
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				postList: [],
				pageNum: 1,
				pageSize: 10,
				keyword: '',
				label:'',
				userType: 0
			}
		}, 
		components:{
			ListItem
		},
		mounted() {
			this.userType = uni.getStorageSync('userType') || 0
			this.getJobList()
		},
		methods:{
			chooseImage(){
				uni.chooseImage({
					success(res) {
						const tempFilePath = res.tempFilePaths
						uni.uploadFile({
							url:'http://baidu.com',
							filePath:tempFilePath[0],
							name:'file',
							formData:{
								
							},
							success(uploadFileRes){
								console.log(uploadFileRes.data)
							}
						})
					}
				})
			},
			getUserInfo(e){
				console.log(e)
			},
			getJobList(){
				postModel.jobList(this.pageNum, this.pageSize, this.keyword, this.label).then(res=>{
					const { code, message, data } = res.data
					if(code === '0'){
						this.postList = data
					}else{
						uni.showToast({
							icon: 'none',
							title: message
						})
					}
				}).catch(err=>{
					uni.showToast({
						icon: 'none',
						title:'获取岗位列表信息失败'
					})
				})
			},
			showDetail(id){
				const that = this
				uni.checkSession({
					success(res) {
						const token = uni.getStorageSync('token')
						const isLogin = uni.getStorageSync('isLogin')
						const isRegister = uni.getStorageSync('isRegister')
						if(token && isLogin === 0 && isRegister === 0){
							uni.navigateTo({
								url: '../../public/PostDetail/PostDetail?id='+id
							})
						}else if(token && isLogin === 0){
							uni.navigateTo({
								url: '../../user/inputInfo/inputInfo'
							})
						}else{
							that.selectLoginType()
						}
					},
					fail(err) {
						that.selectLoginType()
					}
				})
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
			},
			selectLoginType(){
				this.$emit('showLogin')
			},
			switchToSeller(){
				uni.reLaunch({
					url: '../../seller/main/main'
				})
			}
		}
	}
</script>

<style src="./home.scss" lang="scss"></style>
