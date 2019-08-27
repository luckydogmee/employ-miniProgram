<template>
	<view class="project-container">
		<view class="tab-container">
			<view class="tab" @click="switchTab('continue')" :class="{'active':type === 'continue'}">
				交付中
			</view>
			<view class="tab" @click="switchTab('finish')" :class="{'active':type === 'finish'}">
				已完成
			</view>
			<view class="tab" @click="switchTab('fail')" :class="{'active':type === 'fail'}">
				未完成
			</view>
		</view>
		<Search @search="search" />
		<view class="project-list">
<!-- 			<ListProjectDetail :type="type" 
				@showDetail="showDetail(id)" 
			/> -->
			
			<ListProjectDetail :type="type"
				v-for="item in receviedList"
				:key="item.id"
				:receviedInfo="item"
				@showDetail="showDetail(id)" 
			/>
		</view>
	</view>
</template>

<script>
	import ListProjectDetail from '@/components/ListProjectDetail/ListProjectDetail.vue'
	import Search from '@/components/Search/Search.vue'
	import ResumeModel from '@/models/resume.js'
	const resumeModel = new ResumeModel()
	export default {
		data() {
			return {
				receviedList: [
					{
						type: 'finish'
					},
					{
						type: 'fail'
					}
				],
				type: 'continue',
				jobId:''
			}
		},
		components: {
			ListProjectDetail,
			Search
		},
		onLoad(option){
			console.log("执行onLoad")
			let jobId = option.id
			this.jobId = jobId
			this.getPushResumeList()
		},
		// mounted(){
		// 	console.log("执行mouted")
		// 	this.getPushResumeList()
		// },
		methods: {
			switchTab(type){
				if(type === this.type){
					return 
				}
				this.type = type
				// 请求数据
				this.pageNum = 1
				this.getPushResumeList()
			},
			getPushResumeList(){
				const type = this.type
				let status = ''
				let name = ''
				let phone = ''
				if(type === 'continue'){
					status = 0
				}else if(type === 'finish'){
					status = 1
				}else if(type === 'fail'){
					status = -1
				}
				resumeModel.pushResumeList(this.pageNum, this.pageSize,this.jobId, status,name,phone).then(res=>{
					//数据绑定
					const { code, message, data } = res.data
					if(code === '0'){
						this.receviedList = data
					}else{
						uni.showToast({
							icon: 'none',
							title: message
						})
					}
				}).catch(err=>{
					uni.showToast({
						icon: 'none',
						title:'获取简历列表信息失败'
					})
				})
			},
			showDetail(id){
				// 跳转到聊天页面
			},
			search(keyword){
				// 搜索动作
			}
		}
	}
</script>

<style lang="scss">
	.project-container{
		width: 750upx;
		background: #f1f2f7;
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
