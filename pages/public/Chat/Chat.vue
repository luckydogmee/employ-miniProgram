<template>
	<view class="chat-container">
		<view class="chat-fixed">
			<ListChoose btnText="查看简历" :resumeData="resumeData" @on-show="showResumeDetail" />
		</view>
		<view class="chat-scroll">
			<view v-for="item in processData.list" :key="item.id">
				<view v-if="((item.owner == 0 && loginType == 'B')||(item.owner == 1 && loginType !== 'B')) && (item.sort_number !=0 || loginType !='B' ) " class="message message-a">
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
				<view v-else-if="item.sort_number !=0 || loginType !='B'" class="message message-b">
					<view class="message-time">
						{{item.create_time|filterDate}}
					</view>
					<view class="message-container">
						<view class="message-avater">
							<image src="../../../static/img/avatar-man.png" mode=""></image>
						</view>
						<view class="arrow"></view>
						<view class="message-content message-content-withbtn"  v-if="(item.sort_number == processData.total || item.sort_number == 0) &&((loginType == 'B' && item.button_b.length>0)||loginType!='B' && item.button_a.length>0)">
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
					<view class="selectDate-picker time-picker">
						<view class="selectDate-content">
							<hTimePicker sTime="9" cTime="18" interval="30" @changeTime="bindTimeChange">
							  <view slot="pCon" class="date-view">
							    {{date||'点击选择时间'}}
							  </view>
							</hTimePicker>
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
		<!-- 输入申诉内容dialog -->
		<uni-popup ref="inputDialog" custom="true" :showMask="false" :maskClick="false">
			<view class="selectDateDialog">
				<view class="selectDate-title" style="text-align: center;font-size: 26upx;">
					申诉
				</view>
				<view class="selectDate-content" style="height: 140upx;padding-bottom:24upx;">
					<textarea class="content-textarea" v-model="inputContent" placeholder="请输入申诉内容" placeholder-class="textarea-place" />
				</view>
				<view class="selectDate-footer">
					<view class="selectDate-btn confirm" @click="appealSubmit">
						确认
					</view>
					<view class="selectDate-btn cancel" @click="appealCancel">
						取消
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import ListChoose from '@/components/ListChoose/ListChoose.vue'
	import hTimePicker from "@/components/h-timePicker/h-timePicker.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import ProcessModel from '@/models/process.js'
	import { formatDate } from '@/utils/utils.js'
	const processModel = new ProcessModel()
	export default {
		data() {
			return {
				resumeData: null,
				processData: [],
				loginType: '',
				date: '',
				entryTime: '',
				timeText: '面试',
				inputContent: '', // 申诉内容
				tempItem: '',
			};
		},
		components:{
			ListChoose,
			uniPopup,
			hTimePicker
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
				// 面试反馈
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
				if(btn.text === '修改时间'){
					if(btn.method === 'interviewFeedback'){
						this.tempInfo = {
							method: 'interviewFeedback',
							options:{
								id,
								status:'3'
							}
						}
						this.timeText = '面试'
						this.$refs.selectDate.open()	
					}else if(btn.method === 'entryFeedback'){
						this.tempInfo = {
							method: 'entryFeedback',
							options:{
								id,
								status:'2'
							}
						}
						this.timeText = '入职'
						this.$refs.selectDate.open()
					}	
				}
				// A取消简历
				if(btn.text === '取消面试'){
					this.cancelResume(id)
				}
				if(btn.text === '已知晓'){
					this.hasKnown(item)
				}
				if(btn.text === '申诉'){
					this.appeal(item)
				}
				if(btn.text === '认可'){
					this.approval(item)
				}
				if(btn.text === '已入职'){
					this.tempInfo = {
						method: 'entryFeedback',
						options:{
							id,
							status:'0'
						}
					}
					this.timeText = '入职'
					this.$refs.selectDate.open()
				}
				if(btn.text === '未入职'){
					this.entryFeedback(id,1)
				}
				if(btn.text === '已离职'){
					this.tempInfo = {
						method: 'quitFeedBack',
						options:{
							id
						}
					}
					this.timeText = '离职'
					this.$refs.selectDate.open()
				}
				if(btn.text === '复制文本'){
					uni.setClipboardData({
					    data: item.process_content,
					    success: function () {
					        console.log('success');
					    }
					});
				}
			},
			push(){
				if(this.tempInfo.method === 'interviewFeedback'){
					const array = Object.values(this.tempInfo.options)
					array.push(this.date)
					this.interviewFeedback(...array)
				}else if(this.tempInfo.method === 'entryFeedback'){
					const array = Object.values(this.tempInfo.options)
					array.push(this.date)
					this.entryFeedback(...array)
				}else if(this.tempInfo.method === 'quitFeedBack'){
					const array = Object.values(this.tempInfo.options)
					array.push(this.date)
					this.quitFeedBack(...array)
				}
			},
			// 提交面试反馈
			interviewFeedback(id,status,time){
				uni.showLoading({
					mask: true
				})
				const that = this
				processModel.interviewFeedback(id,status,time).then(res=>{
					uni.hideLoading()
					that.$refs.selectDate.close()
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
			// 提交入职反馈
			entryFeedback(id,status,time){
				uni.showLoading({
					mask: true
				})
				const that = this
				processModel.entryFeedBack(id,status,time).then(res=>{
					uni.hideLoading()
					that.$refs.selectDate.close()
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
			quitFeedBack(id,time){
				uni.showLoading({
					mask: true
				})
				const that = this
				processModel.quitFeedBack(id,time).then(res=>{
					uni.hideLoading()
					that.$refs.selectDate.close()
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
			// 取消选择
			cancelPush(){
				this.tempInfo = {}
				this.$refs.selectDate.close()
			},
			bindTimeChange(time){
				this.date = time
			},
			// A端取消简历
			cancelResume(id){
				uni.showLoading({
					title: '取消中'
				})
				processModel.cancelResume(id).then(res=>{
					uni.hideLoading()
					const { code, message, data } = res.data
					if(code === '0'){
						uni.showToast({
							title: '取消简历成功'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})	
						},2000)
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
						title: '取消失败'
					})
				})
			},
			hasKnown(item){
				uni.showLoading({
					title: '请稍等...'
				})
				const that = this
				processModel.isKnow(item.id).then(res=>{
					uni.hideLoading()
					const { code, message, data } = res.data
					if(code === '0'){
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
						title: '取消失败'
					})
				})
			},
			appeal(item){
				this.tempItem = item
				this.$refs.inputDialog.open()
			},
			appealSubmit(){
				uni.showLoading({
					title: '请稍等...'
				})
				const item = this.tempItem
				const that = this
				processModel.appeal(item.id,this.inputContent).then(res=>{
					uni.hideLoading()
					that.$refs.inputDialog.close()
					const { code, message, data } = res.data
					if(code === '0'){
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
			appealCancel(){
				this.$refs.inputDialog.close()
			},
			// B 认可
			approval(item){
				uni.showLoading({
					title: '请稍等...'
				})
				const that = this
				processModel.approval(item.id,this.inputContent).then(res=>{
					uni.hideLoading()
					const { code, message, data } = res.data
					if(code === '0'){
						this.processData.total += 1
						this.processData.list.push({
							create_time: new Date(),
							process_content: '认可',
							sort_number: item.sort_number + 1,
							owner: item.owner == 1? 0:1
						})
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
			}
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
			font-size: 22upx;
				min-height: 88upx;
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
	.selectDate-content{
		height: 158upx;
	}
	.content-textarea{
		width: 440upx;
		border: 1upx solid #DDDDDD;
		font-size: 24upx;
		color: #595959;
		padding: 6upx;
	}
	.textarea-place{
		font-size: 22upx;
		color:#ccc;
	}
</style>
