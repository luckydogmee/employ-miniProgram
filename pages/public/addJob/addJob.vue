<template>
	<view class="add-container">
		<view class="add-top">
			<InputCell label="岗位名称" 
				:required="isEdit" 
				:disabled="!isEdit" 
				:isSell="true" 
				:content="job.jobName" 
				placeholder="请输入岗位"
				@on-input="jobNameChanged"
			></InputCell>
			<view class="description">
				<view class="cell-title">岗位描述<text class="required">*</text></view>
				<textarea v-model="job.description" :auto-height="true" placeholder-style="color:#595959;font-size: 24upx;" placeholder="请输入岗位详情及福利待遇等" />
			</view>
			<InputCell label="需求人数" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="job.num" placeholder="请输入人数" @on-input="numChanged"></InputCell>
			<InputCell label="教育程度" 
				:required="isEdit" 
				:disabled="true" 
				:isSell="true" 
				:withPlugin="true" 
				:hasSlot="true" 
				:content="educationDegreeText" 
				@on-input="educationDegreeChanged"
				placeholder="点击选择>">
				<picker
					@change="educationDegreeChange"
					class="picker"
					:range="educationDegreeArray"
					:disabled="!isEdit"
					:value="job.educationDegree"
				>
					<view class="select"></view>
				</picker>
			</InputCell>
			<InputCell label="工作经验" :required="isEdit" :disabled="true" :isSell="true" :withPlugin="true" :hasSlot="true" :content="workExperienceText" placeholder="点击选择>">
				<picker
					@change="workExperienceChange"
					class="picker"
					:range="workExperienceArray"
					:disabled="!isEdit"
					:value="job.workExperience"
				>
					<view class="select"></view>
				</picker>
			</InputCell>
			<InputCell type="doubleInput" label="年龄" :required="isEdit" :disabled="true" :withPlugin="true" :hasSlot="true" :isSell="true" :content="resume.address" placeholder="请输入年龄区间">
				<view class="input-wrapper">
					<input class="input-min" type="text" v-model="job.minAge" placeholder="最小年龄" placeholder-style="font-size: 20upx;" />
					<view class="input-line"> - </view>
					<input class="input-min" type="text" v-model="job.maxAge" placeholder="最大年龄" placeholder-style="font-size: 20upx;" />	
				</view>
				<!-- <view class="input-wrapper" @tap="changeShow('pickAge')">
					{{job.minAge}}-{{job.maxAge}}
				</view> -->
			</InputCell>
			<InputCell label="试用期" type="radio" :required="isEdit" :disabled="true" :isSell="true" :radioValue="job.probation" @on-radio-change="probationChanged" ></InputCell>
			<InputCell v-if="job.probation === 1" label="试用期时间" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="resume.trialTime" placeholder="请输入试用期时间" @on-input="trialTimeChanged"></InputCell>
			<InputCell v-if="job.probation === 1" label="底薪" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="job.trialSalary" placeholder="请输入底薪" @on-input="trialSalaryChanged"></InputCell>			
		</view>
		<view class="add-bottom">
			<view class="input-title">
				转正后
			</view>
			<InputCell label="底薪" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="job.officialSalary" placeholder="请输入底薪" @on-input="officialSalaryChanged"></InputCell>
			<InputCell label="平均收入" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="job.avgSalary" placeholder="请输入平均收入" @on-input="avgSalaryChanged"></InputCell>
		</view>
		<view class="add-bottom">
			<view class="input-title">
				悬赏信息
			</view>
			<InputCell label="可面试时间" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="job.interviewTime" placeholder="请输入时间" @on-input="interviewTimeChanged"></InputCell>
			<InputCell label="拟悬赏金额" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="job.reward" placeholder="请输入金额" @on-input="rewardChanged"></InputCell>
			<InputCell label="过保时间" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="job.overtime" placeholder="请输入时间" @on-input="overtimeChanged"></InputCell>
			<InputCell label="履约金" :required="isEdit" :disabled="true" :isSell="true" :content="job.totalAmount" placeholder="0"></InputCell>
		</view>
		<QSpicker type="custom2" ref="pickAge" pickerId="pickAge" :dataSet="ageData" showReset/>
		<button class="default-btn submit" @click="saveJob">提交审核</button>
	</view>
</template>

<script>
	import InputCell from '@/components/InputCell/InputCell.vue'
	import QSpicker from '@/components/QuShe-picker/QuShe-picker.vue'
	import JobModel from '@/models/job.js'
	const jobModel = new JobModel()
	export default {
		data() {
			return {
				isEdit: true, // 是否编辑状态
				job: {
					id: '',
					jobName: '',
					description: '',
					num: '',
					minAge: '',
					maxAge: '',
					educationDegree: '',
					workExperience: '',
					probation: 0,
					trialTime: '',
					trialSalary: '',
					officialSalary: '',
					interviewTime: '',
					avgSalary: '',
					reward: '',
					overtime: '',
					totalAmount: 0, // 履约金
				},
				educationDegreeArray: ['高中以下','高中','大专','本科及以上'],
				workExperienceArray: ['一年以下', '一年至三年','三年至五年','五年以上'],
				ageData:{}
			}
		},
		components: {
			InputCell,
			QSpicker
		},
		onLoad(options){
			if(options.isEdit === 'false'){
				this.isEdit = false
			}
			if(options.isEdit === 'true'){
				this.isEdit = true
			}
			const ageArray = this.renderAge() 
			this.ageData = {
				itemObject: {
					step_1: ageArray,
					step_2: ageArray
				},
				steps: {
					step_1_value: "minAge", //第一级显示的属性名
					step_2_value: "maxAge", //第二级显示的属性名
				},
				defaultValue: [1, 0],
				linkageNum: 2, //3 表示为3级联动
				linkage: true //true 表示开启联动
			}
		},
		computed: {
			educationDegreeText(){
				return this.educationDegreeArray[this.job.educationDegree] || ''
			},
			workExperienceText(){
				return this.workExperienceArray[this.job.workExperience] || ''
			}
		},
		methods:{
			jobNameChanged(value){
				this.job.jobName = value
			},
			numChanged(value){
				this.job.num = value
				if(this.job.num && this.job.reward){
					this.job.totalAmount = Number(this.job.num)*Number(this.job.reward)
				}
			},
			educationDegreeChange(e){
				this.job.educationDegree = e.target.value
			},
			workExperienceChange(e){
				this.job.workExperience = e.target.value
			},
			probationChanged(value){
				this.job.probation = value
			},
			trialTimeChanged(value){
				this.job.trialTime = value
			},
			trialSalaryChanged(value){
				this.job.trialSalary = value
			},
			officialSalaryChanged(value){
				this.job.officialSalary = value
			},
			avgSalaryChanged(value){
				this.job.avgSalary = value
			},
			interviewTimeChanged(value){
				this.job.interviewTime = value
			},
			rewardChanged(value){
				this.job.reward = value
				if(this.job.num && this.job.reward){
					this.job.totalAmount = Number(this.job.num)*Number(this.job.reward)
				}
			},
			overtimeChanged(value){
				this.job.overtime = value
			},
			saveJob(){
				const that = this
				//做表单验证
				if(that.job.jobName === ''){
					that.showMessage("岗位名称不能为空！")
					return
				}
				if(that.job.description === ''){
					that.showMessage("岗位描述不能为空！")
					return
				}
				if(that.job.num === ''){
					that.showMessage("招聘人数不能为空！")
					return
				}
				if(that.job.educationDegree === ''){
					that.showMessage("教育程度不能为空！")
					return
				}
				if(that.job.workExperience === ''){
					that.showMessage("工作经验不能为空！")
					return
				}
				if(that.job.minAge === ''){
					that.showMessage("最小年龄不能为空！")
					return
				}
				if(that.job.maxAge === ''){
					that.showMessage("最大年龄不能为空！")
					return
				}
				if(that.job.probation === ''){
					that.showMessage("试用期不能为空！")
					return
				}
				if(that.job.trialTime === ''){
					that.showMessage("试用时间不能为空！")
					return
				}
				if(that.job.trialSalary === ''){
					that.showMessage("试用薪资不能为空！")
					return
				}
				if(that.job.officialSalary === ''){
					that.showMessage("转正薪资不能为空！")
					return
				}
				if(that.job.avgSalary === ''){
					that.showMessage("平均薪资不能为空！")
					return
				}
				if(that.job.interviewTime === ''){
					that.showMessage("可面试时间不能为空！")
					return
				}
				if(that.job.reward === ''){
					that.showMessage("岗位赏金不能为空！")
					return
				}
				if(that.job.overtime === ''){
					that.showMessage("过保时间不能为空！")
					return
				}
				if(that.job.totalAmount === ''){
					that.showMessage("履约金不能为空！")
					return
				}
				
				uni.showLoading({
					title: '提交中...'
				})
				const array = Object.values(this.job)
				jobModel.saveJob(...array).then(res=>{
					uni.hideLoading()
					const { code, message, data } = res.data
					if(code === '0'){
						uni.showToast({
							title: '创建成功'
						})
						setTimeout(()=>{
							uni.redirectTo({
								url: '../addJobSuccess/addJobSuccess?amount='+ that.job.totalAmount
							})
						},2000)
					}else{
						// 错误处理
						uni.hideLoading()
						uni.showToast({
							icon:'none',
							title: message
						})
					}
				}).catch(err=>{
					uni.showToast({
						icon:'none',
						title: '提交失败，请稍候再试'
					})
				})
			},
			renderAge(){
				const array = []
				for(let i=1; i <10; i++){
					array.push({name: i,value: i})
				}
				return array
			},
			changeShow(name) {
				this.$refs[name].show();
			},
			showMessage(message){
				uni.showToast({
					title: message,
					icon:"none"
				})
			},
			
		},	
	}
</script>

<style lang="scss" >
	.add-container{
		width: 750upx;
		background: #f1f2f7;
	}
	.add-avatar{
		padding: 20upx 0;
		display: flex;
		justify-content: center;
	}
	.avatar{
		width: 164upx;
		text-align: center;
		image{
			height: 84upx;
			width: 84upx;
		}
		.text{
			font-size: 20upx;
		}
	}
	.default-btn{
		height: 50upx;
		width: 164upx;
	} 
	.upload-wrapper{
		display: flex;
		flex-direction: flex-start;
		flex-wrap: wrap;
	}
	.submit{
		margin-top: 40upx;
		font-size: 24upx;
		margin-bottom: 40upx;
	}
	.verifyBtn{
		font-size: 20upx;
		width: 140upx;
		height: 38upx;
		line-height: 38upx;
	}
	.add-top,.add-bottom{
		background: #FFFFFF;
		padding: 0 34upx;
		box-sizing: border-box;
		padding-bottom: 20upx;
	}
	.picker{
		.select{
			width: 260upx;
			height: 52upx;	
		}
	}
	// .input-wrapper{
	// 	height: 62upx;
	// 	width: 300upx;
	// }
	.input-wrapper{
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		.input-min{
			width: 140upx;
			color: #595959;
			font-size: 24upx;
			border: 1upx solid #eee;
			.placeholder{
				color: #595959;
				font-size: 24upx;
			}
		}
		.input-line{
			width: 40upx;
			text-align: center;
		}
	}
	.description{
		margin-top: 30upx;
		.cell-title{
			font-size: 24upx;
			color: #272626;
			.required{
				color: #ff8352;
			}
		}
		textarea{
			width: 658upx;
			border: 1upx solid #cccccc;
			padding: 10upx;
			color: #595959;
			font-size: 24upx;
			margin-top: 8upx;
			min-height: 160upx;
		}
	}
</style>

