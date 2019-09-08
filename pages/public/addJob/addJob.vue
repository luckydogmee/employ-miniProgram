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
		<button class="default-btn submit" @click="saveJob">提交审核</button>
	</view>
</template>

<script>
	import InputCell from '@/components/InputCell/InputCell.vue'
	import JobModel from '@/models/job.js'
	const jobModel = new JobModel()
	export default {
		data() {
			return {
				isEdit: true, // 是否编辑状态
				job: {
					id: '',
					jobName: '',
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
				workExperienceArray: ['一年以下', '一年至三年','三年至五年','五年以上']
			}
		},
		components: {
			InputCell
		},
		onLoad(options){
			if(options.isEdit === 'false'){
				this.isEdit = false
			}
			if(options.isEdit === 'true'){
				this.isEdit = true
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
				//做表单验证
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
								url: '../../seller/main/main'
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
			}
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
</style>

