<template>
	<view class="container detail-container">
		<view class="detail-wrapper">
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
			</view>
			<view class="detail-content">
				<Cell :title="jobInfo.storeName">
					<view class="content">
						<text>招聘人数： {{jobInfo.num}}人</text>
						<text>地址：{{jobInfo.address}}</text>	
					</view>
				</Cell>
				<Cell title="职位名称" :content="jobInfo.jobName" />
				<Cell title="职位描述" :content="jobInfo.description" />
				<Cell title="岗位要求" :content="required"></Cell>
				<Cell title="试用期" :content="jobInfo | filterProbation" />
				<Cell title="转正后">
					<view class="content">
						<text>底薪：{{jobInfo.officialSalary}}元/月</text>
						<text>月均收入：{{jobInfo.avgSalary}}元</text>
					</view>
				</Cell>
				<Cell title="悬赏信息" :content="jobInfo.reward+'元/人'" />
				<Cell title="面试时间" :content="jobInfo.interviewTime" />
				<Cell title="过保时间" :content="jobInfo.overtime|filterOverTime" />
			</view>	
		</view>
		<view class="detail-footer" v-if="loginType === 'B'">
			<button v-if="jobInfo.status == 1" class="default-btn" @click="modifyJob">修改</button>
			<button v-if="jobInfo.status == 1" class="default-btn" @click="unShelveJob">下架</button>
			<button v-if="jobInfo.status == 1" class="default-btn" open-type="share">分享</button>
			<button v-if="jobInfo.status == 2" class="default-btn" @click="shelveJob">上架</button>
			<button v-if="jobInfo.status == 0" class="default-btn" >审核中</button>
		</view>
		<view class="detail-footer" v-else>
			<button v-if="jobInfo.collectionJobStatus === 0" class="default-btn" @click="recommend">推荐</button>
			<button v-else class="default-btn" @click="recceiveOrder">接单</button>
			<button class="default-btn" @click="copyText">复制文字</button>
			<button class="default-btn" open-type="share">分享</button>
		</view>
	</view>
</template>

<script>
	import Cell from '../../../components/Cell/Cell.vue'
	import { mapMutations } from 'vuex'
	import { computedRequired } from '../../../utils/utils.js'
	import JobModel from '@/models/job.js'
	const jobModel = new JobModel()
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				id: '',
				jobInfo:{
					storeName: ' ',
					num: ' ',
					address: ' ',
					jobName: ' ',
					description: ' ',
					officialSalary: ' ',
					avgSalary: ' ',
					reward: ' ',
					interviewTime: ' ',
					overtime: ' '
				},
				loginType: ''
			}
		},
		onLoad(option){
			this.id = option.id
			this.getJobDetail()
			this.loginType = uni.getStorageSync('loginType')
		},
		components: {
			Cell
		},
		filters: {
			filterProbation(data){
				if(data.probation === 0){
					return '无试用期'
				}
				const trialTime = data.trialTime == 0 ? '一个月' : data.trialTime == 1 ? '两个月' : '三个月'
				return `时间：${trialTime} | 薪资: ${data.trialSalary|| ' '}`
			},
			filterOverTime(time){
				const overtime = time == 0 ? '7天' : time == 1 ? '15天' : '30天'
				return `${overtime}`
			}
		},
		computed: {
			required(){
				return computedRequired(this.jobInfo)
			}
		},
		onShareAppMessage(e) {
			
		},
		methods: {
			...mapMutations(['switchTab']),
			getJobDetail(){
				uni.showLoading({
					mask: true
				})
				jobModel.jobDetail(this.id).then(res=>{
					uni.hideLoading()
					const { code, data, message } = res.data
					if(code === '0'){
						this.jobInfo = data
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
						title: '获取岗位详情失败'
					})
				})
			},
			recceiveOrder(){
				const { id } = this.jobInfo
				uni.showLoading({
					mask:true
				})
				jobModel.collectionJob(id).then(res=>{
					uni.hideLoading()
					const {code, message, data } = res.data
					if(code === '0'){
						// 执行接单成功后续动作
						uni.showModal({
							title: '',
							content: '接单成功！\r\n是否立即推荐候选人',
							confirmText: '立即推荐',
							confirmColor: '#ff9058',
							cancelText: '再等等吧',
							cancelColor: '#ff9058',
							success: (response)=>{
								if(response.confirm){
									this.switchTab({index: 2,jobId:id})
									uni.reLaunch({
										url: '../../customer/main/main'
									})
									
								}else if(response.cancel){
									uni.showModal({
										title: '',
										content: '您可进入【我的项目】继续操作',
										confirmText: '知道了',
										confirmColor: '#ff9058',
										showCancel: false
									})
								}
							},
							fail: err=>{
								console.log(err)
							}
						})
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
						title: '操作失败，请稍后再试'
					})
				})
			},
			share(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
				    href: "http://uniapp.dcloud.io/",
				    title: "标题",
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				    	console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				    	console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			recommend(){
				this.switchTab({index: 2,jobId:id})
				uni.reLaunch({
					url: '../../customer/main/main'
				})
			},
			unShelveJob(){
				this.updatsStatus(2)
			},
			shelveJob(){
				this.updatsStatus(1)
			},
			updatsStatus(status){
				const that = this
				const { id } = this.jobInfo
				uni.showLoading({
					mask: true
				})
				jobModel.updateStatus(id, status).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title: '操作成功'
					})
					const {code, message, data } = res.data
					if(code === '0'){
						that.jobInfo.status = status
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
						title: '操作失败，请稍后再试'
					})
				})
			},
			modifyJob(){
				uni.navigateTo({
					url: '../addJob/addJob?id='+ this.jobInfo.id
				})
			},
			copyText(){
				const {storeName,num,address,jobName,description,probation,trialTime,trialSalary,officialSalary,avgSalary,interviewTime,educationDegree,workExperience} = this.jobInfo
				let probationText = ''
				let trialTimeText = ''
				if(probation === 0){
					probationText =  '无试用期'
				}else{
					trialTimeText = trialTime == 0 ? '一个月' : trialTime == 1 ? '两个月' : '三个月'
				}
				const jobLevel = computedRequired(this.jobInfo)
				const text = `公司: ${storeName}\n招聘人数: ${num}\n地址: ${address}\n职位: ${jobName}\n职位描述: ${description}\n岗位要求: ${jobLevel}\n${'试用期薪资: '+trialSalary +'元/月\n'}转正后: ${officialSalary} 元/月\n月均收入: ${officialSalary} 元\n面试时间: ${interviewTime}`
				uni.setClipboardData({
				    data: text,
				    success: function () {
				        console.log('success');
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.swiper-container{
		height: 350upx;
		width: 750upx;
		.swiper{
			height: 100%;
		}
	}
	.content{
		background: #fff;
		text{
			line-height: 48upx;
		}
	}
	.detail-wrapper{
		padding-bottom: 150upx;
	}
	.detail-footer{
		height: 150upx;
		width: 750upx;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #f1f2f7;
		display: flex;
		align-items: center;
	}
</style>
