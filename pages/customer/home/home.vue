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
			<view class="tab" @click="switchLabel(0)">
				<image src="../../../static/img/currentWeek.png" mode=""></image>
			</view>
			<view class="tab" @click="switchLabel(1)">
				<image src="../../../static/img/famousCompany.png" mode=""></image>
			</view>
			<view class="tab" @click="switchLabel(2)">
				<image src="../../../static/img/urgent.png" mode=""></image>
			</view>
		</view>
		<view class="list-container" v-if="postList.length>0">
			<ListItem v-for="item in postList" :key="item.id" :postData="item" @showDetail="showDetail" btnText="接单" />
			<view v-if="hasEnd" class="hasend">
				已经拉到底了哦
			</view>
		</view>
		<view class="list-empty" v-else>
			该条目下暂时没有岗位哦
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
				pageSize: 8,
				loading: false, 
				hasEnd: false, // 是否已加载完成
				keyword: '',
				label:'',
			}
		}, 
		components:{
			ListItem
		},
		mounted() {
			this.getJobList()
		},
		methods:{
			getJobList(){
				const that = this
				if(this.pageNum === 1){
					uni.showLoading({
						mask: true
					})
				}
				postModel.jobList(this.pageNum, this.pageSize, this.keyword, this.label).then(res=>{
					const { code, message, data } = res.data
					uni.hideLoading()
					uni.stopPullDownRefresh()
					if(code === '0'){
						if(this.pageNum === 1){
							that.postList = data.list
						}else {
							that.postList = [...that.postList, ...data]
						}
						if(data.length < that.pageSize){
							that.hasEnd = true
						}
					}else{
						uni.showToast({
							icon: 'none',
							title: message
						})
					}
				}).catch(err=>{
					uni.hideLoading()
					uni.stopPullDownRefresh()
					uni.showToast({
						icon: 'none',
						title:'获取岗位列表信息失败'
					})
				})
			},
			refresh(){
				this.pageNum = 1
				this.hasEnd = false
				this.label = ''
				this.getJobList()
			},
			getNext(){
				if(!this.hasEnd){
					this.pageNum += 1
					this.getJobList()
				}
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
			switchToSeller(){
				// 判断该用户是否存在b
				
				// 存在B端用户信息时
				uni.reLaunch({
					url: '../../seller/main/main'
				})
			},
			switchLabel(label){
				this.label = label
				this.pageNum = 1
				this.hasEnd = false
				this.getJobList()
			}
		}
	}
</script>

<style src="./home.scss" lang="scss"></style>
