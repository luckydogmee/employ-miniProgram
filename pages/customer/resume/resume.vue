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
		<Search @search="search" />
		<view class="list-container">
<!-- 			<ListResume @on-click-record="showRecord" @on-click-recommend="recommendHim" @on-click-detail="showDetail" ></ListResume>
			<ListResume></ListResume>
			<ListResume></ListResume>
			<ListResume></ListResume> -->
			
			<ListResume
				v-for="item in resumeList"
				:key="item.id"
				:resumeData="item"
				@on-click-record="showRecord"
				@on-click-recommend="recommendHim"
				@on-click-detail="showDetail(item.id)"
				@show="show(status,id)" 
				@showDetail="showDetail(item.id)" 
				@showDeliveryDetail="showDeliveryDetail(id)" 
				@recommend="recommend(id)" 
			/>
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
						<view class="th t1">推荐时间</view>
						<view class="th t2">岗位</view>
						<view class="th t3">公司</view>
						<view class="th t4">当前状态</view>
					</view>
					<view class="tr" v-for="item in recommendRecord" :key="item.id">
						<view class="td t1">{{item.time}}</view>
						<view class="td t2">{{item.post}}</view>
						<view class="td t3">{{item.company}}</view>
						<view class="td t4">{{item.status}}</view>
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
		<Dialog :showDialog="showDialog">
			
		</Dialog>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import ListResume from '@/components/ListResume/ListResume.vue'
	import Search from '@/components/Search/Search.vue' 
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import Dialog from '@/components/Dialog/Dialog.vue'
	import ResumeModel from '@/models/resume.js'
	const resumeModel = new ResumeModel()
	export default {
		data() {
			return {
				resumeList: [
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
				showDialog: false,
				resumeId: '',
				date: '',
				timeStart: '',
				timeEnd: ''
			}
		},
		components:{
			ListResume,
			Search,
			uniPopup,
			Dialog
		},
		computed:{
			...mapState(['currentResume', 'jobId']),
			
		},
		mounted(){
			this.getResumeList()
		},
		methods: {
			...mapMutations(['switchTab']),
			search(keyword){
				// 做搜索动作
				
			},
			getResumeList(){
				const type = this.type
				let status = ''
				let name = ''
				let phone = ''
				if(type === 'started'){
					status = 1
				}else if(type === 'notStart'){
					status = 0
				}
				resumeModel.resumeList(this.pageNum,this.pageSize,status,name,phone).then(res=>{
					//数据绑定
					const { code, message, data } = res.data
					if(code === '0'){
						this.resumeList = data
					}else{
						uni.showToast({
							icon: 'none',
							title: message
						})
					}
				}).catch(err=>{
					uni.showToast({
						icon: 'none',
						title:'获取简历信息失败'
					})
				})
			},
			switchResumeTab(type){
				if(type === this.type){
					return 
				}
				this.type = type
				this.pageNum = 1
				this.getResumeList()
			},
			showRecord(){
				this.$refs.recommendRecord.open()
			},
			closeRecommendDialog(){
				this.$refs.recommendRecord.close()
			},
			showDetail(id){
				uni.navigateTo({
					url: '../../public/addResume/addResume?isEdit=true&id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
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
			showAddResume(){
				uni.navigateTo({
					url: '../../public/addResume/addResume?isEdit=true',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
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
	.close-icon{
		width: 24upx;
		height: 24upx;
		position: absolute;
		top: 16upx;
		right: 24upx;
	}
	.recommend-title{
		font-size: 36upx;
		width: 100%;
		text-align: center;
		color: #ff9058;
		margin-top: 30upx;
	}
	.recommend-table{
		width: 553upx;
		margin: 30upx auto;
		border-top: 1upx solid #595959;
		border-left: 1upx solid #595959;
		overflow: auto;
		.tr{
			border-bottom: 1upx solid #595959;
			display: flex;
			align-items: center;
		}
		.th,.td{
			box-sizing: border-box;
			border-right: 1upx solid #595959;
			text-align: center;
			color: #ff9058;
		}
		.th{
			height: 60upx;
			line-height: 60upx;
			font-size: 24upx;	
			font-weight: 600;
		}
		.td{
			height: 76upx;
			font-size: 18upx;
			padding-top: 20upx;
			&.t3{
				padding: 20upx 16upx;
			}
		}
		.t1{
			width: 150upx;
		}
		.t2{
			width: 105upx;
		}
		.t3{
			width: 148upx;
		}
		.t4{
			width: 150upx;
		}
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
	.selectDateDialog{
		height: 360upx;
		width: 461upx;
	}
	.selectDate-footer{
		height: 86upx;
		width: 462upx;
		padding-top: 1upx;
		box-sizing: border-box;
		display: flex;
		justify-content:space-between;
		background:#e7e7e7;
		align-items: center;
		.selectDate-btn{
			width: 230upx;
			height: 100%;
			line-height: 84upx;
			background: #FFFFFF;
			text-align: center;
			font-size: 30upx;
			color: #ff8353;
		}
	}
	.selectDate-title{
		color: #ff9760;
		font-size: 22upx;
		line-height: 60upx;
		background: #FFFFFF;
		font-weight: blod;
		padding-left: 30upx;
	}
	.selectDate-content{
		background: #FFFFFF;
		height: 210upx;
		width: 462upx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		.selectDate-picker{
			display: flex;
			justify-content: center;
			height: 46upx;
			align-items: center;
			width: 256upx;
			flex-wrap: wrap;
			.selectDate-label{
				width: 72upx;
				height: 30upx;
				font-size: 22upx;
				color: #565656;
			}
			.selectDate-content{
				width: 184upx;
				height: 30upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
			.date-view{
				width: 184upx;
				height: 30upx;
				font-size: 20upx;
				color: #666;
				text-align: center;
				border: 1upx solid #fe9661;
			}
			.time-view{
				width: 80upx;
				height: 30upx;
				font-size: 20upx;
				color: #666;
				text-align: center;
				border: 1upx solid #fe9661;
			}
			.view-line{
				width: 20upx;
			}
		}	
		.text{
			color: #8F8F94;
			text-align: center;
			line-height: 40upx;
			font-size: 20upx;
		}
	}
	
</style>