<template>
	<view class="project-container">
		<view class="tab-container">
			<view class="tab" @click="switchTab('all')" :class="{'active':type === 'all'}">
				全部岗位
			</view>
			<view class="tab" @click="switchTab('started')" :class="{'active':type === 'started'}">
				已开始
			</view>
			<view class="tab" @click="switchTab('notStart')" :class="{'active':type === 'notStart'}">
				未开始
			</view>
		</view>
		<view class="project-list">
			<ListProject 
				v-for="item in projectList"
				:key="item.id"
				:data="item"
				@show="show(status,id)" 
				@showDetail="showDetail(id)" 
				@showDeliveryDetail="showDeliveryDetail(id)" 
				@recommend="recommend(id)" 
			/>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
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
			getJobList(){
				const type = this.type
				let status = ''
				if(type === 'started'){
					status = 1
				}else if(type === 'notStart'){
					status = 0
				}
				jobModel.collectionJobList(this.pageNum, this.pageSize, status).then(res=>{
					
				})
			},
			switchTab(type){
				if(type === this.type){
					return 
				}
				this.type = type
				this.pageNum = 1
				this.getJobList()
			},
			show(status,id){
				// 根据状态判断
			},
			showDetail(id){
				uni.navigateTo({
					url: '../../PostDetail/PostDetail'
				})
			},
			showDeliveryDetail(id){
				uni.navigateTo({
					url: '../../customer/project/detail'
				})
			},
			recommend(id){
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
