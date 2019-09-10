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
		<button v-if="!isEdit" class="default-btn" @click="submit">提 交</button>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import InputCell from '@/components/InputCell/InputCell.vue'
	import ResumeModel from '@/models/resume.js'
	import { config } from '../../../config.js'
	const _ = require('@/utils/lodash.js')
	const resumeModel = new ResumeModel()
	export default {
		data() {
			return {
				isEdit: true, // 是否编辑状态
				avatar: '../../../static/icon/add-avatar.png', //头像地址
				avatarWomen: '../../../static/img/avatar-women.png',
				avatarMen: '../../../static/img/avatar-men.png',
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
			if(options.isEdit == 'false'){
				this.isEdit = false
			}
			if(options.isEdit == 'true'){
				this.isEdit = true
			}
			// 这里去请求获取简历详情并更新 resume
			if(options.id){
				this.resume.id = options.id
				this.getResumeDetail()
			}
		},
		methods:{
			...mapMutations(['switchTab']),
			getResumeDetail(){
				uni.showLoading({
					mask: true
				})
				resumeModel.resumeDetail(this.resume.id).then(res=>{
					uni.hideLoading()
					const { code, data, message } = res.data
					if(code === '0'){
						this.resume = _.pick(data,['id', 'name', 'phone', 'gender', 'age', 'educationDegree', 'workExperience', 'university', 'nativePlace', 'intentionalWork'])
						if(data.avatar){
							this.avatar = data.avatar
						}else{
							if(data.gender == 0){
								this.avatar = this.avatarMen
								this.avatar = this.avatarWomen
							}
						}
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
				if(that.avatar === ''){
					that.showMessage("头像不能为空！")
					return
				}
				if(that.resume.name === ''){
					that.showMessage("姓名不能为空！")
					return
				}
				if(that.resume.gender === ''){
					that.showMessage("性别不能为空！")
					return
				}
				if(that.resume.educationDegree === ''){
					that.showMessage("学历不能为空！")
					return
				}
				if(that.resume.phone === ''){
					that.showMessage("电话不能为空！")
					return
				}else if(!that.checkPhone(that.resume.phone)){
					that.showMessage("电话输入有误请重新输入！")
					return
				}
				if(that.resume.workExperience === ''){
					that.showMessage("工作经验不能为空")
					return
				}
				if(that.resume.university === ''){
					that.showMessage("毕业院校不能为空")
					return
				}
				if(that.resume.nativePlace === ''){
					that.showMessage("籍贯不能为空")
					return
				}
				if(that.resume.intentionalWork === ''){
					that.showMessage("期望工作不能为空")
					return
				}
				
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
								url: config.base_url +　'/resume/bindingAvatar',
								filePath: that.avatar,
								name: 'file',
								formData: {
									id: data.id
								},
								success(response) {
									uni.hideLoading()
									that.showResponse()
								}
							})	
						}else{
							uni.hideLoading()
							that.showResponse()
						}
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
			showResponse(){
				const that = this
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
						that.switchTab({index: 2})
						uni.redirectTo({
							url: '../../customer/main/main'
						})
				},1500)
			},
			showMessage(message){
				uni.showToast({
					title: message,
					icon:"none"
				})
			},
			isNull(str){
				if(str == null || str == undefined || str == ""){
					return true
				}else{
					return false
				}
			},
			checkPhone(phone){			
				var reg = /^1(3|4|5|7|8)[0-9]{9}$/; //验证规则
				var flag = reg.test(phone);
				return flag
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
			border-radius: 50%;
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
