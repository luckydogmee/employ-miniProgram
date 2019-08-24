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
				:data="item"
				@on-show="show(collectionJobStatus,id)" 
				@on-showDetail="showDetail(item.id)" 
				@on-showDeliveryDetail="showDeliveryDetail(id)" 
				@on-recommend="recommend(id)" 
			/>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import ListProject from '@/components/ListProject/ListProject.vue'
	import JobModel from '@/models/job.js'
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
			}
		},
		computed:{
			...mapState(['currentResume']),
			
		},
		mounted(){
			this.getJobList()
		},
		components: {
			ListProject
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
				this.switchTab(2, {jobId:id})
				return
				let success = false
				// if success
				
				if(success){
					uni.showModal({
						title: '',
						content: '推荐成功!\r\n您可在“我的项目”栏目查看该人员的面试、入职流程',
						showCancel: false,
						confirmText: '知道了',
						success: res => {},
					})	
				}else{
					// if fail
					uni.showModal({
						title: '',
						content: '抱歉!\r\n该简历年龄与岗位要求不符,无法推荐!',
						showCancel: false,
						confirmText: '知道了',
						success: res => {},
					})
				}
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
