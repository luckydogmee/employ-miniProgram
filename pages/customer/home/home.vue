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
			<ListItem @showDetail="showDetail" />
			<ListItem />
			<ListItem />
			<ListItem />
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
	import UserModel from '@/models/user.js';
	import ListItem from '@/components/ListItem/ListItem.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	const userModel = new UserModel() 
	export default {
		data(){
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		onReady() {
			
		}, 
		components:{
			ListItem,
			uniPopup
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
						title:'授权失败，请重新授权'
					})
				}
				// 以下执行登录,需要后台提供一个接口
				uni.login({
					provider: 'weixin',
					success(response) {
						if(response.errMsg === 'login:ok'){
							// 此处执行后台登录过程，传递的参数自己斟酌
							userModel.wxLogin({
								data:{
									encryptedData,
									ivData: iv,
									code: response.code
								},
								success(res){
									// 判断是成功了
									if (res.data.code == 0) {
										// 将token存入缓存中
										uni.setStorageSync('token',res.data.data.token)						  
									}else{
										uni.showToast({
											title:'登录失败，请重新授权'
										})
									}									
								}
							})	
						}else{
							uni.showToast({
								icon: 'none',
								title:'获取code失败'
							})
						}
					}
				})
			},
			toRegister(){
				uni.navigateTo({
					url: '../../user/register/register',
				})
			},
			showDetail(){
				const that = this
				uni.checkSession({
					success(res) {
						const token = uni.getStorageSync('token')
						console.log(token)
					},
					fail(err) {
						that.login()
					}
				})
			},
			login(){
				this.$refs.noticeLogin.open()
			}
		}
	}
</script>

<style src="./home.scss" lang="scss"></style>
