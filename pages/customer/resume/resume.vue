<template>
	<view class="resume-container">
		<view class="tab-container">
			<view class="tab" @click="switchResumeTab('all')" :class="{'active':type === 'all'}">
				全部简历
			</view>
			<view class="tab" @click="switchResumeTab('started')" :class="{'active':type === 'started'}">
				已推荐过
			</view>
			<view class="tab" @click="switchResumeTab('notStart')" :class="{'active':type === 'notStart'}">
				未推荐过
			</view>
		</view>
		<Search @on-search="search" />
		<view class="list-container" v-if="resumeList.length>0">			
			<ListResume
				v-for="item in resumeList"
				:key="item.id"
				:resumeData="item"
				@on-click-record="showRecord"
				@on-click-recommend="recommendHim"
				@on-click-call="callHim(item)"
				@on-click-detail="showDetail(item.id)"
				@show="show(status,id)" 
				@showDetail="showDetail(item.id)" 
				@showDeliveryDetail="showDeliveryDetail(id)" 
				@recommend="recommend(id)" 
			/>
		</view>
		<view class="empty" v-else>
			暂无相关项目
		</view>
		<view class="resume-add" @click="showAddResume">
			<image src="../../../static/icon/add.png" mode=""></image>
		</view>
		<!-- 推荐记录dialog -->
		<uni-popup ref="recommendRecord" custom="true" :showMask="false" :maskClick="false">
			<view class="recommendDialog">
				<view class="recommend-title">
					推荐记录
				</view>
				<view class="recommend-table">
					<view class="tr">
						<view class="th t1"><text>推荐时间</text><image src="../../../static/icon/time.png" mode=""></image></view>
						<view class="th t2"><text>岗位</text><image src="../../../static/icon/post.png" mode=""></image></view>
						<view class="th t3"><text>公司</text><image src="../../../static/icon/company.png" mode=""></image></view>
						<view class="th t4"><text>当前状态</text><image src="../../../static/icon/status.png" mode=""></image></view>
					</view>
					<view class="scroll">
						<view class="tr " v-for="item in recommendRecord" :key="item.id">
							<view class="td t1">{{item.time}}</view>
							<view class="td t2">{{item.jobName}}</view>
							<view class="td t3">{{item.storeName}}</view>
							<view class="td t4">{{item.statusContent}}</view>
						</view>	
					</view>
				</view>
				<image class="close-icon" src="../../../static/icon/close.png" @click="closeRecommendDialog" />
			</view>
		</uni-popup>
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
						<form name="test" @submit="getFormId" report-submit="true">
							<button class="dialog-btn" form-type="submit">确认推荐</button>
						</form>
					</view>
					<view class="selectDate-btn cancel" @click="cancelPush">
						再等等看
					</view>
				</view>
				<!-- <image class="close-icon" src="../../../static/icon/close.png" @click="closeRecommendDialog" /> -->
			</view>
		</uni-popup>
		<Dialog :showDialog="showDialog">
			
		</Dialog>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import ListResume from '@/components/ListResume/ListResume.vue'
	import hTimePicker from "@/components/h-timePicker/h-timePicker.vue"
	import Search from '@/components/Search/Search.vue' 
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import Dialog from '@/components/Dialog/Dialog.vue'
	import ResumeModel from '@/models/resume.js'
	import { formatDate } from '@/utils/utils.js'
	const resumeModel = new ResumeModel()
	export default {
		data() {
			return {
				resumeList: [],
				type: 'all',
				pageNum: 1,
				pageSize: 10,
				hasEnd: false,
				showDialog: false,
				recommendRecord: [],
				resumeId: '',
				date: '',
				formId: '' , // 推送相关
				keyWord:''
			}
		},
		components:{
			ListResume,
			Search,
			uniPopup,
			Dialog,
			hTimePicker
		},
		computed:{
			...mapState(['currentResume', 'jobId']),
			
		},
		mounted(){
			this.getResumeList()
		},
		methods: {
			...mapMutations(['switchTab']),
			search(keyWord){
				// 做搜索动作
				this.keyWord = keyWord
				this.getResumeList()
			},
			getResumeList(){
				const type = this.type
				const that = this
				let status = ''
				if(type === 'started'){
					status = 1
				}else if(type === 'notStart'){
					status = 0
				}
				if(this.pageNum === 1){
					uni.showLoading({
						mask: true
					})
				}
				//这里解决返回后显示不全的问题
				if(this.pageSize === 1){
					this.pageSize = 10
				}
				resumeModel.resumeList(this.pageNum,this.pageSize,status,this.keyWord).then(res=>{
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
						title:'获取简历信息失败'
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
				if(type === this.type){
					return 
				}
				this.type = type
				this.pageNum = 1
				this.hasEnd = false
				this.getResumeList()
			},
			showRecord(id){
				uni.showLoading({
					mask:true
				})
				resumeModel.resumeRecord(this.pageSize, this.pageNum,id).then(res=>{
					uni.hideLoading()
					this.$refs.recommendRecord.open()
					const { code, message, data} = res.data
					if(code === '0'){
						this.recommendRecord = data
						
					}else {
						uni.showToast({
							icon: 'none',
							title: message
						})
					}
				}).catch(err=>{
					uni.showToast({
						icon: 'none',
						title:'获取推荐记录失败'
					})
				})
			},
			closeRecommendDialog(){
				this.$refs.recommendRecord.close()
			},
			showDetail(id){
				uni.navigateTo({
					url: '../../public/addResume/addResume?isEdit=true&id='+id,
					success: () => {
						uni.setNavigationBarTitle({
							title: '简历详情'
						})
					},
				});
			},
			recommendHim(id){
				const jobId = this.jobId
				this.resumeId = id
				if(jobId){
					this.$refs.selectDate.open()
				}else{
					this.switchTab({index:1,resumeId: this.resumeId})
				}
			},	
			callHim(item){
				const phoneNumber = item.phone
				uni.makePhoneCall({
				    phoneNumber
				})
			},
			pushResume(){
				const that = this
				const jobId = this.jobId
				const resumeId = this.resumeId
				const interviewDate = this.date
				const formId = this.formId
				uni.showLoading({
					title: '提交中...'
				})
				resumeModel.pushResume(jobId, resumeId, interviewDate, formId).then(res=>{
					const { code, message, data } = res.data
					that.formId = ''
					uni.hideLoading()
					if(code === '0'){
						// 推荐成功
						that.$refs.selectDate.close()
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
						title:'推送失败'
					})
				})
			},
			cancelPush(){
				this.$refs.selectDate.close()
			},
			showAddResume(){
				uni.navigateTo({
					url: '../../public/addResume/addResume?isEdit=true',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			bindTimeChange(time){
				this.date = time
			},
			getFormId(e){
				this.formId = e.detail.formId
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
		.tab{
			flex: 1;
			height: 48upx;
			line-height: 48upx;
			font-size: 26upx;
			color: #ff9058;
			text-align: center;
		}
	}
	.recommendDialog{
		height: 580upx;
		width: 730upx;
		background: #fff;
		margin: 0 auto;
		position: relative;
		border: 1upx solid #b5b5b5;
	}
	.recommend-title{
		font-size: 36upx;
		width: 100%;
		text-align: center;
		color: #ff9058;
		margin-top: 30upx;
	}
	.recommend-table{
		width: 668upx;
		margin: 30upx auto;
		border-top: 1upx solid #FFFFFF;
		border-left: 1upx solid #FFFFFF;
		.tr{
			border-bottom: 1upx solid #FFFFFF;
			display: flex;
			align-items: center;
		}
		.scroll{
			overflow: auto;
			max-height: 350upx;
		}
		.th,.td{
			box-sizing: border-box;
			border-right: 1upx solid #FFFFFF;
			text-align: center;
			color: #FFFFFF;
			width: 167upx;
		}
		.th{
			height: 60upx;
			line-height: 60upx;
			font-size: 24upx;	
			font-weight: 600;
			background: #f2a184;
			display: flex;
			align-items: center;
			justify-content: center;
			text{
				
			}
			image{
				height: 28upx;
				width: 28upx;
				margin-left: 10upx;
			}
		}
		.td{
			height: 76upx;
			font-size: 18upx;
			padding-top: 20upx;
			background: #bb836d;
			&.t3{
				padding: 20upx 16upx;
			}
		}
		// .t1{
		// 	width: 150upx;
		// }
		// .t2{
		// 	width: 105upx;
		// }
		// .t3{
		// 	width: 148upx;
		// }
		// .t4{
		// 	width: 150upx;
		// }
	}
	.resume-add{
		position: fixed;
		height: 87upx;
		width: 87upx;
		right: 32upx;
		bottom: 142upx;
		image{
			height: 100%;
			width: 100%;
		}
	},
	.add-resume-container{
		height: 1134upx;
		width: 750upx;
		background: #fff;
		border: 1upx solid red;
		box-sizing: border-box;
	}
	
</style>