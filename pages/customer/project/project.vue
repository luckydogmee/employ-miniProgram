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
		<view class="project-list">
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
		<!-- 选择面试时间dialog -->
		<uni-popup ref="selectDate" custom="true" :showMask="false" :maskClick="false">
			<view class="selectDateDialog">
				<view class="selectDate-title">
					请选择面试时间
				</view>
				<view class="selectDate-content">
					<view class="selectDate-picker date-picker">
						<view class="selectDate-label">
							日期：
						</view>
						<view class="selectDate-content">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="view date-view">{{date}}</view>
							</picker>
						</view>
					</view>
					<view class="selectDate-picker time-picker">
						<view class="selectDate-label">
							时间：
						</view>
						<view class="selectDate-content">
							<picker mode="time" :value="timeStart" @change="bindTimeStartChange">
								<view class="view time-view">{{timeStart}}</view>
							</picker>
							<view class="view-line">-</view>
							<picker mode="time" :value="timeEnd" @change="bindTimeEndChange">
								<view class="view time-view">{{timeEnd}}</view>
							</picker>
						</view>
					</view>
					<view class="text">
						确认推荐后
					</view>
					<view class="text">
						系统将自动向求职者发送面试邀请
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
	import ListProject from '@/components/ListProject/ListProject.vue'
	import JobModel from '@/models/job.js'
	import ResumeModel from '@/models/resume.js'
	const resumeModel = new ResumeModel()
	const jobModel = new JobModel()
	export default {
		data() {
			return {
				projectList: [
					{
						type: 'started'
					},
					{
						type: 'notStart'
					}
				],
				type: 'all',
				// type: 'started',
				pageNum: 1,
				pageSize: 10,
				jobId: '',
				date: '',
				timeStart: '',
				timeEnd: ''
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
			uniPopup
		},
		methods: {
			...mapMutations(['switchTab']),
			getJobList(){
				const type = this.type
				let collectionJobStatus = ''
				if(type === 'started'){
					collectionJobStatus = 1
				}else if(type === 'notStart'){
					collectionJobStatus = 0
				}
				jobModel.collectionJobList(this.pageNum, this.pageSize, collectionJobStatus).then(res=>{
					//数据绑定
					const { code, message, data } = res.data
					if(code === '0'){
						this.projectList = data
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
			switchProjectTab(type){
				if(type === this.type){
					return 
				}
				this.type = type
				this.pageNum = 1
				this.getJobList()
			},
			show(collectionJobStatus,id){
				// 根据状态判断
			},
			showDetail(id){
				console.log(id)
				uni.navigateTo({
					url: '../../public/PostDetail/PostDetail?id='+id
				})
				
				// uni.navigateTo({
				// 	url: '../../PostDetail/PostDetail'
				// })
			},
			showDeliveryDetail(id){
				uni.navigateTo({
					url: '../../customer/project/detail'
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
				const jobId = this.jobId
				const resumeId = this.resumeId
				const interviewDate = this.date
				const interviewTime = this.timeStart + this.timeEnd
				resumeModel.pushResume(jobId, resumeId, interviewDate, interviewTime).then(res=>{
					const { code, message, data } = res.data
					if(code === '0'){
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
				})
			},
			cancelPush(){
				this.$refs.selectDate.close()
			},
			bindDateChange(e){
				this.date = e.target.value
			},
			bindTimeStartChange(e){
				this.timeStart = e.target.value
			},
			bindTimeEndChange(e){
				this.timeEnd = e.target.value
			},
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
			
			color: #ff9058;
			text-align: center;
			&.active{
				font-weight: 600;
			}
		}
	}
	.project-list{
		width: 750px;
	}
</style>
