<template>
	<view class="container detail-container">
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
			<Cell title="悬赏信息" :subTitle="jobInfo.reward+'元/人'" />
			<Cell title="面试时间" :content="jobInfo.interviewTime" />
			<Cell title="过保时间" :subTitle="jobInfo.overtime+'天'" />
		</view>
	</view>
</template>

<script>
	import Cell from '../../../components/Cell/Cell.vue'
	
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
				jobInfo:{}
			}
		},
		onLoad(option){
			this.id = option.id
			this.getJobDetail()
		},
		components: {
			Cell
		},
		filters: {
			filterProbation(data){
				if(data.probation === 0){
					return '无试用期'
				}
				return `时间：${data.trialTime} | 薪资: ${data.trialSalary}`
			}
		},
		computed: {
			required(){
				return computedRequired(this.jobInfo)
			}
		},
		methods: {
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
</style>
