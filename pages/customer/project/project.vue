<template>
	<view class="project-container">
		<view class="tab-container">
			<view class="tab" @click="switchProjectTab('all')" :class="{'active':type === 'all'}">
				全部岗位
			</view>
			<view class="tab" @click="switchProjectTab('started')" :class="{'active':type === 'started'}">
				已开始
			</view>
			<view class="tab" @click="switchProjectTab('notStart')" :class="{'active':type === 'notStart'}">
				未开始
			</view>
		</view>
		<view class="project-list" v-if="projectList.length>0">
			<ListProject 
				v-for="item in projectList"
				:key="item.id"
				:projectData="item"
				@on-show="show(collectionJobStatus,id)" 
				@on-showDetail="showDetail" 
				@on-showDeliveryDetail="showDeliveryDetail" 
				@on-recommend="recommend" 
			/>
		</view>
		<view class="empty" v-else>
			暂无相关项目
		</view>
		<!-- 选择面试时间dialog -->
		<uni-popup ref="selectDate" custom="true" :showMask="false" :maskClick="false">
			<view class="selectDateDialog">
				<view class="selectDate-title">
					请选择面试时间
				</view>
				<view class="selectDate-content">
					<view class="selectDate-picker time-picker">
						<view class="selectDate-content">
							<hTimePicker sTime="9" cTime="18" interval="30" @changeTime="bindTimeChange">
							  <view slot="pCon" class="date-view">
							    {{date||'点击选择时间'}}
							  </view>
							</hTimePicker>
						</view>
					</view>
					<view class="text">
						确认推荐后
					</view>
					<view class="text">
						请主动与求职者联系，可在流程中查看短信模板
					</view>
				</view>
				<view class="selectDate-footer">
					<view class="selectDate-btn confirm" @click="pushResume">
						确认推荐
					</view>
					<view class="selectDate-btn cancel" @click="cancelPush">
						再等等看
					</view>
				</view>
				<!-- <image class="close-icon" src="../../../static/icon/close.png" @click="closeRecommendDialog" /> -->
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import hTimePicker from "@/components/h-timePicker/h-timePicker.vue"
	import ListProject from '@/components/ListProject/ListProject.vue'
	import { formatDate } from '@/utils/utils.js'
	import JobModel from '@/models/job.js'
	import ResumeModel from '@/models/resume.js'
	const resumeModel = new ResumeModel()
	const jobModel = new JobModel()
	export default {
		data() {
			return {
				projectList: [],
				type: 'all',
				// type: 'started',
				pageNum: 1,
				pageSize: 10,
				hasEnd: false,
				jobId: '',
				date: '',
				formId: '' , // 推送相关
			}
		},
		computed:{
			...mapState(['resumeId']),
			
		},
		mounted(){
			this.getJobList()
		},
		components: {
			ListProject,
			uniPopup,
			hTimePicker
		},
		methods: {
			...mapMutations(['switchTab']),
			getJobList(){
				const type = this.type
				const that = this
				let collectionJobStatus = ''
				if(type === 'started'){
					collectionJobStatus = 1
				}else if(type === 'notStart'){
					collectionJobStatus = 0
				}
				if(this.pageNum === 1){
					uni.showLoading({
						mask: true
					})
				}
				jobModel.collectionJobList(this.pageNum, this.pageSize, collectionJobStatus).then(res=>{
					uni.hideLoading()
					uni.stopPullDownRefresh()
					//数据绑定
					const { code, message, data } = res.data
					if(code === '0'){
						if(that.pageNum === 1){
							that.projectList = data.list
						}else {
							that.projectList = [...that.projectList, ...data.list]
						}
						if(that.projectList.length === data.total){
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
				this.getJobList()
			},
			getNext(){
				if(!this.hasEnd){
					this.pageNum += 1
					this.getJobList()
				}
			},
			switchProjectTab(type){
				if(type === this.type){
					return 
				}
				this.type = type
				this.pageNum = 1
				this.hasEnd = false
				this.getJobList()
			},
			show(collectionJobStatus,id){
				// 根据状态判断
			},
			showDetail(id){
				uni.navigateTo({
					url: '../../public/PostDetail/PostDetail?id='+id
				})
				
				// uni.navigateTo({
				// 	url: '../../PostDetail/PostDetail'
				// })
			},
			showDeliveryDetail(id){
				uni.navigateTo({
					url: '../../customer/project/detail?id='+id
				})
			},
			recommend(id){
				this.jobId = id
				if(this.resumeId){
					this.$refs.selectDate.open()
				}else{
					this.switchTab({index:2,jobId:id})
				}
			},
			pushResume(){
				const that = this
				const jobId = this.jobId
				const resumeId = this.resumeId
				const interviewDate = this.date
				const formId = this.formId
				uni.showLoading({
					mask: true
				})
				resumeModel.pushResume(jobId, resumeId, interviewDate, formId).then(res=>{
					uni.hideLoading()
					const { code, message, data } = res.data
					that.formId = ''
					if(code === '0'){
						that.$refs.selectDate.close()
						// 推荐成功
						uni.showModal({
							title: '',
							content: '推荐成功!\r\n您可在“我的项目”栏目查看该人员的面试、入职流程',
							showCancel: false,
							confirmText: '知道了',
							success: res => {},
						})
					}else{
						uni.showToast({
							icon: 'none',
							title: message
						})
					}
				}).catch(err=>{
					that.formId = ''
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '推送失败'
					})
				})
			},
			cancelPush(){
				this.$refs.selectDate.close()
			},
			bindTimeChange(time){
				this.date = time
			}
		}
	}
</script>

<style lang="scss">
	.project-container{
		width: 750upx;
	}
	.tab-container{
		display: flex;
		align-items: center;
		justify-content: space-around;
		background: #fff;
		width: 750upx;
		margin-bottom: 10upx;
		.tab{
			flex: 1;
			height: 48upx;
			line-height: 48upx;
			font-size: 30upx;
			color: #999;
			text-align: center;
			&.active{
				font-weight: 600;
				color: #ff9058;
			}
		}
	}
	.project-list{
		width: 750px;
	}
</style>
