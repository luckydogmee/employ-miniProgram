<template>
	<view class="home-customer">
		<view class="swiper-container">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item>
					<view class="swiper-item uni-bg-red">
						<image src="../../../static/swiper/banner1.png" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">
						<image src="../../../static/swiper/banner2.png" mode=""></image>
					</view>
				</swiper-item>
			</swiper>	
			<view class="switchToSeller">
				<button class="swiper-button" type="primary" hover-class="none">切换到企业</button>
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
			<ListItem v-for="item in postList" :key="item.id" :postData="item" @showDetail="showDetail" />
		</view>
		<uni-popup ref="noticeLogin" custom="true">
			<view class="notice-login-dialog">
				<view class="notice-title">
					登录微猎头快开始接单
				</view>
				<button class="notice-btn notice-wechat" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信帐号快速登录</button>
				<button class="notice-btn notice-mobile" @click="toRegister">手机号注册/登录</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import UserModel from '@/models/user.js'
	import PostModel from '@/models/post.js'
	import ListItem from '@/components/ListItem/ListItem.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
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
				label:''
			}
		}, 
		components:{
			ListItem,
			uniPopup
		},
		created() {
			postModel.getPostList(this.pageNum, this.pageSize, this.keyword, this.label).then(res=>{
				const { code, message, data } = res.data
				if(code === '0'){
					this.postList = data
					console.log(this.postList)
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
			getPhoneNumber(e){
				const { iv, encryptedData, errMsg } = e.detail
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
								uni.hideLoading()
								// 判断是成功了,在这里判断是否已经绑定手机号，以及是否完善信息，待写
								if (res.code === '0') {
									// 将token存入缓存中
									uni.setStorageSync('token',res.data.token)
									uni.showToast({
										title:'登录成功'
									})
									this.$refs.noticeLogin.close()
								}else{
									uni.showToast({
										icon: 'none',
										title:'登录失败，请重新授权'
									})
								}	
							})
						}else{
							uni.showToast({
								icon: 'none',
								title:'获取code失败'
							})
						}
					},
					fail(err) {
						
					}
				})
			},
			toRegister(){
				uni.navigateTo({
					url: '../../user/register/register',
				})
			},
			showDetail(id){
				const that = this
				uni.checkSession({
					success(res) {
						const token = uni.getStorageSync('token')
						if(!token){
							that.selectLoginType()
						}else{
							uni.navigateTo({
								url: '../../public/PostDetail/PostDetail'
							})
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
				this.$refs.noticeLogin.open()
			}
		}
	}
</script>

<style src="./home.scss" lang="scss"></style>
