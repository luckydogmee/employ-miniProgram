<template>
	<view class="chat-container">
		<view class="chat-fixed">
			<ListChoose btnText="查看简历" :resumeData="resumeData" @on-show="showResumeDetail" />
		</view>
		<view class="chat-scroll">
			<view v-for="item in processData.list" :key="item.id">
				<view v-if="(item.owner == 0 && loginType == 'B')||(item.owner == 1 && loginType !== 'B')" class="message message-a">
					<view class="message-time">
						{{item.create_time|filterDate}}
					</view>
					<view class="message-container">
						<view class="message-avater">
							<image src="../../../static/img/avatar-man.png" mode=""></image>
						</view>
						<view class="arrow"></view>
						<view class="message-content message-content-withbtn"  v-if="item.sort_number == processData.total">
							<view class="text">{{item.process_content}}</view>
							<view class="btn-group" v-if="loginType == 'B'">
								<view class="message-btn" v-for="btn in item.button_b" :key="btn.text" @click="handleBtnClick(btn,item)">
									{{btn.text}}
								</view>
							</view>
							<view class="btn-group" v-else>
								<view class="message-btn" v-for="btn in item.button_a" :key="btn.text" @click="handleBtnClick(btn,item)">
									{{btn.text}}
								</view>
							</view>
						</view>
						<view class="message-content" v-else>
							<view class="text">{{item.process_content}}</view>
						</view>
					</view>
				</view>
				<view v-else class="message message-b">
					<view class="message-time">
						{{item.create_time|filterDate}}
					</view>
					<view class="message-container">
						<view class="message-avater">
							<image src="../../../static/img/avatar-man.png" mode=""></image>
						</view>
						<view class="arrow"></view>
						<view class="message-content message-content-withbtn"  v-if="item.sort_number == processData.total &&((loginType == 'B' && item.button_b.length>0)||loginType!='B' && item.button_a.length>0)">
							<view class="text">{{item.process_content}}</view>
							<view class="btn-group" v-if="loginType == 'B'">
								<view class="message-btn" v-for="btn in item.button_b" :key="btn.text" @click="handleBtnClick(btn,item)">
									{{btn.text}}
								</view>
							</view>
							<view class="btn-group" v-else>
								<view class="message-btn" v-for="btn in item.button_a" :key="btn.text" @click="handleBtnClick(btn,item)">
									{{btn.text}}
								</view>
							</view>
						</view>
						<view class="message-content" v-else>
							<view class="text">{{item.process_content}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 选择面试时间dialog -->
		<uni-popup ref="selectDate" custom="true" :showMask="false" :maskClick="false">
			<view class="selectDateDialog">
				<view class="selectDate-title">
					请选择{{timeText}}时间
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
				</view>
				<view class="selectDate-footer">
					<view class="selectDate-btn confirm" @click="push">
						确认
					</view>
					<view class="selectDate-btn cancel" @click="cancelPush">
						取消
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import ListChoose from '@/components/ListChoose/ListChoose.vue'
	import ProcessModel from '@/models/process.js'
	import { formatDate } from '@/utils/utils.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	const processModel = new ProcessModel()
	export default {
		data() {
			return {
				resumeData: null,
				processData: [],
				loginType: '',
				date: '',
				entryTime: '',
				timeText: '面试'
			};
		},
		components:{
			ListChoose,
			uniPopup
		},
		onLoad(option){
			this.resumeData = option
			this.loginType = uni.getStorageSync('loginType')
			this.getProcessList()
		},
		filters: {
			filterDate(value){
				return formatDate(value,'yyyy/MM/dd hh:mm:ss')
			}
		},
		methods: {
			showResumeDetail(){
				const that = this
				uni.navigateTo({
					url: '../addResume/addResume?id='+this.resumeData.resumeId+'&isEdit=false',
					success() {
						uni.setNavigationBarTitle({
							title: that.resumeData.name+'的简历'
						})
					}
				})
			},
			getProcessList(){
				const that = this
				uni.showLoading({
					mask: true
				})
				processModel.processList(this.resumeData.receviedId).then(res=>{
					uni.hideLoading()
					const { code, message, data } = res.data
					if(code === '0'){
						// 因为后台的愚蠢而不得不做的处理
						const tempData = data
						tempData.list.map(item=>{
							if(item.button_a){
								item.button_a = JSON.parse(item.button_a)
							}
							if(item.button_b){
								item.button_b = JSON.parse(item.button_b)
							}
						})
						that.processData = tempData
						
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
						title: '获取流程信息失败'
					})
				})
			},
			handleBtnClick(btn, item){
				const id = item.id
				if(btn.text === '面试通过'){
					this.tempInfo = {
						method: 'interviewFeedback',
						options:{
							id,
							status:'0'
						}
					}
					this.timeText = '入职'
					this.$refs.selectDate.open()
					// this.interviewFeedback(id,0,entryTime)
				}
				if(btn.text === '未到场'){
					this.interviewFeedback(id,'1')
				}
				if(btn.text === '未通过'){
					this.interviewFeedback(id,'2')
				}
				if(btn.text === '修改面试时间'){
					this.tempInfo = {
						method: 'interviewFeedback',
						options:{
							id,
							status:'3'
						}
					}
					this.timeText = '面试'
					this.$refs.selectDate.open()
				}
			},
			push(){
				if(this.tempInfo.method === 'interviewFeedback'){
					const array = Object.values(this.tempInfo.options)
					array.push(this.date)
					this.interviewFeedback(...array)
				}
			},
			interviewFeedback(id,status,time){
				uni.showLoading({
					mask: true
				})
				const that = this
				processModel.interviewFeedback(id,status,time).then(res=>{
					uni.hideLoading()
					const { code, message, data } = res.data
					if(code === '0'){
						// 这里做后续处理
						that.getProcessList()
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
						title: '提交失败'
					})
				})
			},
			cancelPush(){
				this.tempInfo = {}
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
	.chat-container{
		background:#f1f2f7;
	}
	.chat-fixed{
		position: fixed;
		top: 0;
		left: 0;
		width: 750upx;
		height: 156upx;
	}
	.chat-scroll{
		width: 750upx;
		padding: 156upx 28upx 30upx 28upx;
		box-sizing: border-box;
	}
	.message{
		padding-top: 30upx;
		padding-bottom: 25px;
	}
	.message-time{
		color: #595959;
		font-size: 16upx;
		margin-bottom: 18upx;
		text-align: center;
	}
	.message-container{
		display: flex;
		align-items: center;
	}
	.message-a{
		.message-container{
			flex-direction: row;
		}
		.message-content{
			background: #FFFFFF;
			color: #040404;
		}
		.arrow{
			margin-left: -20upx;
			border-color: transparent #FFFFFF transparent transparent;
		}
		.btn-group{
			border-top: 1upx solid #ecb599;
		}
		.message-btn{
			border-right: 1upx solid #e28f64;
		}
	}
	.message-b{
		.message-container{
			flex-direction: row-reverse;
		}
		.message-content{
			background: #e28f64;
			color: #FFFFFF;
		}
		.arrow{
			margin-right: -20upx;
			transform: rotate(180deg);
			border-color: transparent #e28f64 transparent transparent;
		}
		.message-btn{
			border-right: 1upx solid #e28f64;
		}
	}
	.message-avater{
		width: 70upx;
		height: 70upx;
		image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.message-content{
		border-radius: 16upx;
		max-width: 486upx;
		min-width: 330upx;
		.text{
			box-sizing: border-box;
			padding: 24upx 30upx;
			font-size: 20upx;	
		}
		
	}
	.message-content-withbtn{
		min-width: 480upx;
	}
	.arrow{
		width: 0; 
		height: 0;
		border-width: 16upx;
		border-left-width: 36upx;
		border-right-width: 36upx;
		border-style: solid;
		border-color: transparent #0099CC transparent transparent;
	}
	.btn-group{
		height: 56upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		.message-btn{
			flex: 1;
			height: 100%;
			line-height: 56upx;
			text-align: center;
			font-size: 24upx;
			color: #ff8352;
			font-weight: 550;
			background-color: #FFFFFF;
		}
		.message-btn:last-child{
			border-right: none;
		}
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
		padding-bottom: 20upx;
	}
	.selectDate-content{
		background: #FFFFFF;
		height: 100upx;
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
