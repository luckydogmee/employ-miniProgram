<template>
	<view class="resume-container">
		<view class="tab-container">
			<view class="tab" @click="switchResumeTab(0)" :class="{'active':type === 0}">
				交付中
			</view>
			<view class="tab" @click="switchResumeTab(1)" :class="{'active':type === 1}">
				已完成
			</view>
			<view class="tab" @click="switchResumeTab(2)" :class="{'active':type === 2}">
				未完成
			</view>
		</view>
		<Search @on-search="search" />
		<view class="list-container">			
			<ListChoose v-for="item in resumeList" :key="item.receviedId" :resumeData="item" @on-show="showDetail(item)" />
		</view>
	</view>	
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import ListChoose from '@/components/ListChoose/ListChoose.vue'
	import Search from '@/components/Search/Search.vue' 
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import Dialog from '@/components/Dialog/Dialog.vue'
	import ResumeModel from '@/models/resume.js'
	const resumeModel = new ResumeModel()
	export default {
		data() {
			return {
				resumeList: [],
				type: 0,
				pageNum: 1,
				pageSize: 10,
				hasEnd: false,
				showDialog: false,
				formId: '' , // 推送相关
				keyWord:''
			}
		},
		components:{
			ListChoose,
			Search,
			Dialog
		},
		computed:{
			
		},
		mounted(){
			this.getResumeList()
		},
		methods: {
			...mapMutations(['switchTab']),
			search(keyWord){
				// 做搜索动作
				this.keyWord = keyWord
				this.pageNum = 1
				this.hasEnd = false
				this.getResumeList()
			},
			getResumeList(){
				const that = this
				if(this.pageNum === 1){
					uni.showLoading({
						mask: true
					})
				}
				resumeModel.myCandidate(this.pageNum,this.pageSize,this.type,this.keyWord).then(res=>{
					//数据绑定
					uni.hideLoading()
					uni.stopPullDownRefresh()
					const { code, message, data } = res.data
					if(code === '0'){
						if(that.pageNum === 1){
							that.resumeList = data.list
						}else {
							that.resumeList = [...that.resumeList, ...data.list]
						}
						if(that.resumeList.length === data.total){
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
						title:'获取候选人列表失败'
					})
				})
			},
			refresh(){
				this.pageSize = 1
				this.hasEnd = false
				this.getResumeList()
			},
			getNext(){
				if(!this.hasEnd){
					this.pageNum += 1
					this.getResumeList()
				}
			},
			switchResumeTab(type){
				this.type = type
				this.pageNum = 1
				this.hasEnd = false
				this.getResumeList()
			},
			showDetail(item){
				const {jobId, receviedId, jobName, name, latestFeedback,avatar,resumeId} = item
				uni.navigateTo({
					url: '../../public/Chat/Chat?jobId='+ jobId +'&receviedId='+receviedId+'&jobName='+jobName+'&name='+name+'&latestFeedback='+latestFeedback+'&avatar='+avatar+'&resumeId='+resumeId
				})
			}
		}
	}
</script>

<style lang="scss">
	.resume-container{
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
	
</style>