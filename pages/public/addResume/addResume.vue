<template>
	<view class="add-container">
		<view class="add-avatar">
			<view class="avatar old-avatar">
				<image :src="avatar" mode="" @click="chooseImage"></image>
				<!-- <view v-if="isEdit" class="text">默认头像</view> -->
			</view>
			<!-- <view v-if="isEdit" class="avatar new-avatar">
				<image 
					class="avatar new-avatar" 
					src="../../../static/icon/add-avatar.png" 
					mode=""
					@click="chooseImage"
				></image>
			</view> -->
		</view>
		<InputCell label="姓名" @on-input="nameChange" :required="isEdit" :disabled="!isEdit" :content="resume.name"></InputCell>
		<InputCell label="性别" :required="isEdit" :disabled="true" :withPlugin="true" :hasSlot="true" :content="genderText" placeholder="点击选择">
			<picker
				@change="genderChange"
				class="picker"
				:range="genderArray"
				:disabled="!isEdit"
				:value="resume.gender"
			>
				<view class="select"></view>
			</picker>
		</InputCell>
		<InputCell label="年龄" @on-input="ageChange" :required="isEdit" :disabled="!isEdit" :content="resume.age"></InputCell>
		<InputCell label="学历" :required="isEdit" :disabled="true" :withPlugin="true" :hasSlot="true" :content="educationDegreeText" placeholder="点击选择">
			<picker
				@change="educationDegreeChange"
				class="picker"
				:range="educationDegreeArray"
				:disabled="!isEdit"
				:value="resume.educationDegree"
			>
				<view class="select"></view>
			</picker>
		</InputCell>
		<InputCell label="电话(不会对企业公开)" @on-input="phoneChange" :scaleInput="true" :required="isEdit" :disabled="!isEdit" :content="resume.phone"></InputCell>
		<InputCell label="工作经验" :required="isEdit" :disabled="true" :withPlugin="true" :hasSlot="true" :content="workExperienceText" placeholder="点击选择">
			<picker
				@change="workExperienceChange"
				class="picker"
				:range="workExperienceArray"
				:disabled="!isEdit"
				:value="resume.workExperience"
			>
				<view class="select"></view>
			</picker>
		</InputCell>
		<InputCell label="毕业院校" @on-input="universityChange" :disabled="!isEdit" :content="resume.university"></InputCell>
		<InputCell label="籍贯" @on-input="nativePlaceChange" :disabled="!isEdit" :content="resume.nativePlace"></InputCell>
		<InputCell label="期望工作" @on-input="intentionalWorkChange" :disabled="!isEdit" :content="resume.intentionalWork"></InputCell>
		<button class="default-btn" @click="submit">提 交</button>
	</view>
</template>

<script>
	import InputCell from '@/components/InputCell/InputCell.vue'
	import ResumeModel from '@/models/resume.js'
	const resumeModel = new ResumeModel()
	export default {
		data() {
			return {
				isEdit: true, // 是否编辑状态
				avatar: '../../../static/img/avatar.png', //头像地址
				changedAvatar: false,
				resume: {
					id: '',
					name: '',
					phone: '',
					gender: '',
					age: '',
					educationDegree: '',
					workExperience: '',
					university: '',
					nativePlace: '',
					intentionalWork:''
				},
				pictureArray: ['从相册选择', '相机拍摄'],
				pictureIndex: 0,
				genderArray:['男', '女'],
				educationDegreeArray: ['高中以下','高中','大专','本科及以上'],
				workExperienceArray: ['一年以下', '一年至三年','三年至五年','五年以上']
			}
		},
		components: {
			InputCell
		},
		computed:{
			genderText(){
				return this.genderArray[this.resume.gender] || ''
			},
			educationDegreeText(){
				return this.educationDegreeArray[this.resume.educationDegree] || ''
			},
			workExperienceText(){
				return this.workExperienceArray[this.resume.workExperience] || ''
			}
		},
		onLoad(options){
			if(options.isEdit === 'false'){
				this.isEdit = false
			}
			if(options.isEdit === 'true'){
				this.isEdit = true
			}
			// 这里去请求获取简历详情并更新 resume
			if(options.id){
				this.resume.id = options.id
				this.getResumeDetail()
			}
		},
		methods:{
			getResumeDetail(){
				uni.showLoading({
					mask: true
				})
				resumeModel.resumeDetail(this.resume.id).then(res=>{
					uni.hideLoading()
					const { code, data, message } = res.data
					if(code === '0'){
						this.resume = data
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
						title: '获取岗位详情失败'
					})
				})
			},
			chooseImage(){
				const that = this
				// 让用户选择相册或者拍照
				uni.chooseImage({
					count:1,
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						that.changedAvatar = true
						that.avatar = res.tempFilePaths[0]
					}
				})
			},
			genderChange(e){
				this.resume.gender = e.target.value
			},
			educationDegreeChange(e){
				this.resume.educationDegree = e.target.value
			},
			workExperienceChange(e){
				this.resume.workExperience = e.target.value
			},
			nameChange(e){
				this.resume.name = e
			},
			ageChange(e){
				this.resume.age = e
			},
			phoneChange(e){
				this.resume.phone = e
			},
			universityChange(e){
				this.resume.university = e
			},
			nativePlaceChange(e){
				this.resume.nativePlace = e
			},
			intentionalWorkChange(e){
				this.resume.intentionalWork = e
			},
			submit(){
				const that = this
				// 做表单验证
				
				uni.showLoading({
					title: '提交中...'
				})
				const array = Object.values(this.resume)
				resumeModel.saveResume(...array).then(res=>{
					const { code, message, data } = res.data
					if(code === '0'){
						// 成功,得到id 再上传头像
						// 执行上传头像
						if(that.changedAvatar){
							uni.uploadFile({
								url: '/',
								filePath: that.avatar,
								name: 'file',
								formData: {
									id: data.id
								},
								success(response) {
									showResponse()
								}
							})	
						}else{
							showResponse()
						}
					}else{
						// 错误处理
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
			showResponse(){
				if(this.resume.id){
					uni.showToast({
						title: '更新简历成功!'
					})	
				}else{
					uni.showToast({
						title: '新增简历成功!'
					})
				}
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})	
				},1500)
			}
		}
	}
</script>

<style lang="scss">
	.add-container{
		width: 750upx;
		padding: 0 34upx;
		box-sizing: border-box;
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
	.picker{
		.select{
			width: 260upx;
			height: 52upx;	
		}
	}
</style>
