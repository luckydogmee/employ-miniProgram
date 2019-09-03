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
				<button class="swiper-button" type="primary" hover-class="none" @click="switchToCustomer">切换到猎头</button>
			</view>
		</view>
		<view class="tab-container">
			<view class="tab">
				<button type="default" @click="switchLabel(0)">审核中</button>
			</view>
			<view class="tab">
				<button type="default" @click="switchLabel(1)">已发布</button>
			</view>
			<view class="tab">
				<button type="default" @click="switchLabel(2)">已下架</button>
			</view>
		</view>
		<view class="list-container" v-if="jobList.length>0">
			<ListItem v-for="item in jobList" :key="item.id" :postData="item" @showDetail="showDetail" btnText="查看" />
			<view v-if="hasEnd" class="hasend">
				已经拉到底了哦
			</view>
		</view>
		<view class="list-empty" v-else>
			暂无相关项目
		</view>
	</view>
</template>

<script>
	import ListItem from '../../../components/ListItem/ListItem.vue'
	
	import UserModel from '../../../models/user.js';
	import PostModel from '@/models/job.js'
	const postModel = new PostModel()
	const userModel = new UserModel() 
	export default {
		data(){
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				jobList: [],
				pageNum: 1,
				pageSize: 10,
				label: '',
				loading: false, 
				hasEnd: false,
			}
		},
		onReady() {
			this.getPublishJobList()
		}, 
		components:{
			ListItem
		},
		methods:{
			showDetail(id){
				uni.navigateTo({
					url: '../../PostDetail/PostDetail?id='+id
				})
			},

			getUserInfo(e){
				console.log(e)
			},
			switchToCustomer(){
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
								uni.hideLoading()
								const { code, message, data } = res.data
								if(code === '0'){
									// 将返回的token存入本地
									uni.setStorageSync('token', data.token)
									
									that.hasToken = true
								}else{
									uni.showToast({
										icon: 'none',
										title: message
									})
								}
							}).catch(err=>{
								uni.hideLoading()
								uni.showToast({
									icon: 'none',
									title: '切换失败，请稍后再试'
								})
							})
						}else{
							uni.hideLoading()
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
			getPublishJobList(){
				const that = this
				postModel.publishJobList(this.pageNum, this.pageSize, this.label).then(res=>{
					uni.hideLoading()
					uni.stopPullDownRefresh()
					const { code, message, data } = res.data
					if(code === '0'){
						if(this.pageNum === 1){
							that.jobList = data.list
						}else {
							that.jobList = [...that.jobList, ...data.list]
						}
						if(that.jobList.length === data.total){
							that.hasEnd = true
						}
					}else {
						uni.showToast({
							icon: 'none',
							title: res.message
						})
					}
				}).catch(err=>{
					uni.hideLoading()
					uni.stopPullDownRefresh()
					uni.showToast({
						icon: 'none',
						title:'获取项目信息失败'
					})
				})
			},
			refresh(){
				this.pageNum = 1
				this.hasEnd = false
				this.label = ''
				this.getPublishJobList()
			},
			getNext(){
				if(!this.hasEnd){
					this.pageNum += 1
					this.getPublishJobList()
				}
			},
			switchLabel(label){
				this.label = label
				console.log(this.label)
				this.pageNum = 1
				this.hasEnd = false
				this.getPublishJobList()
			},
		}
	}
</script>

<style lang="scss">
	.upload-wrapper{
		height: 230upx;
		width:750upx;
		margin-top: 40upx;
		image{
			height: 100%;
			width:100%;
		}
	}
	.authorize{
		margin-top:40upx; 
	}
	.swiper-container{
		position: relative;
		height: 300upx;
		width: 750upx;
	}
	.switchToSeller{
		position: absolute;
		top: 20upx;
		right: 20upx;
	}
	.tab-container{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: 34upx 0;
		width: 750upx;
		background: unset;
		.tab{
			button{
				width: 170upx;
				height: 50upx;
				line-height: 50upx;
				font-size: 30upx;
				background: #fe935d;
				color: #fff;
				&:after{
					border: none;
				}
			}
		} 
	}
</style>
