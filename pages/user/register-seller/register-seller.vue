<template>
	<view class="add-container">
		<view class="add-top">
			<view class="add-avatar">
				<view class="avatar old-avatar">
					<image :src="avatar" mode="" @click="chooseAvatar"></image>
				</view>
			</view>
			<InputCell label="公司名称" 
				:required="isEdit" 
				:disabled="!isEdit" 
				:isSell="true" 
				:content="resume.name" 
				placeholder="请输入名称"
				@on-input="nameChanged"
			></InputCell>
			<InputCell label="所在区域" 
				:required="isEdit" 
				:disabled="true" 
				:isSell="true" 
				:withPlugin="true" 
				:hasSlot="true" 
				:content="cityCodeText" 
				@on-input="cityChanged"
				placeholder="请选择区域>">
				<picker
					@change="cityPickerChange"
					mode="region"
					class="picker"
					:value="citySelected"
				>
					<view class="select"></view>
				</picker>
			</InputCell>
			<InputCell label="公司地址" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="resume.address" placeholder="请输入详细地址" @on-input="addressChanged"></InputCell>
			<InputCell label="所在行业"
				:required="isEdit" 
				:isSell="true"
				:disabled="true"
				:withPlugin="true"
				:hasSlot="true" 
				:content="industryText" 
				placeholder="请选择行业>" 
			>
				<picker
					@change="industryChange"
					class="picker"
					:range="industryArray"
					:value="resume.industryCode"
				>
					<view class="select"></view>
				</picker>
			</InputCell>
			<InputCell label="招聘联系人" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="resume.contactName" placeholder="请输入联系人" @on-input="contactNameChanged"></InputCell>
			
			<view class="upload-wrapper">
				<UploadItem :required="true" title="上传营业执照" :imageUrl="resume.businessImg" @on-select-image="chooseBusinessImg" />
				<UploadItem :required="false" title="上传公司logo" :imageUrl="resume.logo" @on-select-image="chooseLogo" />
				<UploadItem :required="false" title="上传工作场景照" :imageUrl="resume.companyImg" @on-select-image="chooseCompanyImg" />
			</view>	
		</view>
		<view class="add-bottom">
			<InputCell label="联系电话" :required="isEdit" :disabled="!isEdit" :isSell="true" placeholder="请输入联系电话" :content="resume.phone" @on-input="phoneChanged"></InputCell>
			
			<!-- <view class="add-avatar">
				<view v-if="isEdit" class="avatar new-avatar">
					<image 
						class="avatar new-avatar" 
						src="../../../static/icon/add-avatar.png" 
						mode=""
						@click="chooseImage"
					></image>
				</view>
			</view> -->
			<inputCell v-if="isEdit&&!isModify" label="验证码" :required="isEdit" :isSell="true" placeholder="请输入验证码" floatleft="left" :hasSlot="true" :content="verifyCode" @on-input="verifyCodeChanged">
				<button class="default-btn verifyBtn verify-code-btn" :class="{'disabled':!readySendCode} "
					@click="sendVerifyCode">{{readySendCode ? '发送验证码' : surplusSecond + ' 秒' }}</button>
			</inputCell>	
		</view>
		
		<button v-if="isEdit" class="default-btn submit" @click="postVerifyCode">{{isModify ? '提交修改': '提交审核'}}</button>
	</view>
</template>

<script>
	import InputCell from '@/components/InputCell/InputCell.vue'
	import UploadItem from '@/components/UploadItem/UploadItem.vue'
	import UserModel from '@/models/user.js'
	import StoreModel from '@/models/store.js'
	import JobModel from '@/models/job.js'
	import { config } from '../../../config.js'
	import { verifyPhone } from '../../../utils/utils.js'
	const userModel = new UserModel()
	const storeModel = new StoreModel()
	const jobModel = new JobModel()
	export default {
		data() {
			return {
				isEdit: true, // 是否编辑状态
				isModify: false,
				resume: {
					id:　'',
					name: '', // 公司名称
					cityCode: '', // 城市码
					address: '', // 地址
					industryCode: '', // 所在行业
					contactName: '', // 招聘联系人
					businessImg: '', // 营业执照
					companyImg: '', // 工作场景
					logo: '', // 公司logo
					phone: '', // 电话号码
					avatar:''
				},
				avatar: '../../../static/icon/add-avatar.png',
				avatarChanged: false,
				uploadedAvatar:'',
				businessImgChanged: false,
				companyImgChanged: false,
				logoChanged: false,
				imageChanged: false,
				pictureIndex: 0,
				verifyText: '发送验证码',
				verifyCode: '',
				cityCodeText: '', // 区域文字
				citySelected: ['510000','',''], // 已选中的城市
				readySendCode: true,
				surplusSecond: 0,
				verifyCodeTimer: null,
				industryArrayObject:[]
			}
		},
		components: {
			InputCell,
			UploadItem
		},
		computed:{
			industryText(){
				let text = ''
				this.industryArrayObject.forEach(item=>{
					if(item.code === this.resume.industryCode){
						text = item.name
					}
				})
				return text
			},
			industryArray(){
				const tempArray = []
				this.industryArrayObject.forEach(item=>{
					tempArray.push(item.name)
				})
				return tempArray
			}
		},
		onLoad(options){
			if(options.isEdit === 'false'){
				this.isEdit = false
			}
			if(options.isEdit === 'true'){
				this.isEdit = true
			}
			this.getIndustry()
			if(options.isModify == 1){
				this.isModify = true
				this.btnText = '提交修改'
				this.getUserInfo()
			}
		},
		methods:{
			getUserInfo(){
				jobModel.getIndustry().then(res=>{
					const { code, message, data } = res.data
					if(code === '0'){
						// 单独写了页面，此处废弃
					}
				})
			},
			getIndustry(){
				jobModel.getIndustry().then(res=>{
					const { code, message, data } = res.data
					if(code === '0'){
						this.industryArrayObject = data
					}else{
						uni.showToast({
							icon:'none',
							title:message
						})
					}
				}).catch(err=>{
					uni.showToast({
						icon:'none',
						title:'获取行业信息失败'
					})
				})
			},
			industryChange(e){
				this.resume.industryCode = this.industryArrayObject[e.target.value].code
			},
			cityPickerChange(e){
				const { code, value } = e.detail
				this.resume.cityCode = code.join(',')
				this.cityCodeText = Array.from( new Set(value)).join('-')
			},
			chooseAvatar(){
				const that = this
				uni.chooseImage({
					count:1,
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						that.avatar = res.tempFilePaths[0]
						// 这里考虑到可能上传头像地址不同
						// that.uploadAvatar(res.tempFilePaths[0],)
						that.getImageWebUrl(res.tempFilePaths[0], 'avatar')
					}
				})
			},
			chooseBusinessImg(){
				const that = this
				uni.chooseImage({
					count:1,
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						that.resume.businessImg = res.tempFilePaths[0]
						that.getImageWebUrl(res.tempFilePaths[0], 'businessImg')
					}
				})
			},
			chooseLogo(){
				const that = this
				uni.chooseImage({
					count:1,
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						that.resume.logo = res.tempFilePaths[0]
						that.getImageWebUrl(res.tempFilePaths[0], 'logo')
					}
				})
			},
			chooseCompanyImg(){
				const that = this
				uni.chooseImage({
					count:1,
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						that.companyImg = res.tempFilePaths[0]
						that.getImageWebUrl(res.tempFilePaths[0], 'companyImg')
					}
				})
			},
			sendVerifyCode(){
				if(!this.readySendCode){
					return 
				}
				if(!this.resume.phone){
					uni.showToast({
						icon:'none',
						title:'请输入电话号码'
					})
					return
				}
				const correctPhone = verifyPhone(this.resume.phone)
				if(!correctPhone){
					uni.showToast({
						icon:'none',
						title:'手机号码错误，请确认'
					})
					return
				} 
				uni.showLoading({
					mask: true
				})
				userModel.getVerifyCode(this.resume.phone, 'B').then(res=>{
					// 请求成功,并判断code是否正确
					uni.hideLoading()
					const { code, message, data } = res.data 
					if(code === '0'){
						uni.showToast({
							title: '验证码已发送，请注意查收'
						})
						this.readySendCode = false
						this.surplusSecond = 60
						// this.focusIndex = 3
						this.verifyCodeTimer = setInterval(()=>{
							if(this.surplusSecond > 0){
								this.surplusSecond -= 1
							}else{
								this.surplusSecond = 0
								this.readySendCode = true
								clearInterval(this.verifyCodeTimer)
							}
						}, 1000)
						// this.focusIndex = 3	
					}else{
						uni.showToast({
							icon:'none',
							title: message
						})
					}
					
				}).catch(err=>{
					uni.hideLoading()
					uni.showToast({
						icon:'none',
						title:'获取验证码失败'
					})
				})
			},
			postVerifyCode(){
				// 表单验证
				if(!this.resume.name){
					uni.showToast({
						icon:'none',
						title:'请输入公司名称'
					})
					return
				}
				if(!this.resume.cityCode){
					uni.showToast({
						icon:'none',
						title:'请选择区域'
					})
					return
				}
				if(!this.resume.address){
					uni.showToast({
						icon:'none',
						title:'请输入地址'
					})
					return
				}
				if(!this.resume.industryCode){
					uni.showToast({
						icon:'none',
						title:'请选择所在行业'
					})
					return
				}
				if(!this.resume.contactName){
					uni.showToast({
						icon:'none',
						title:'请输入招聘联系人'
					})
					return
				}
				if(!this.resume.phone){
					uni.showToast({
						icon:'none',
						title:'请输入电话号码'
					})
					return
				}
				const that = this
				uni.showLoading({
					title: '提交中...'
				})
				userModel.login(this.resume.phone, this.verifyCode, 'B').then(res=>{
					const { code, message, data } = res.data
					if(code === '0'){
						uni.setStorageSync('token',data.token)
						uni.setStorageSync('loginType','B')
						uni.setStorageSync('isLogin',0)
						that.saveStore()
					}else {
						uni.hideLoading()
						uni.showToast({
							icon:'none',
							title: message
						})
					}
				}).catch(res=>{
					uni.hideLoading()
					uni.showToast({
						icon:'none',
						title: '验证失败，请稍后再试'
					})
				})
			},
			saveStore(){
				const that = this
				const array = Object.values(this.resume)
				array.push(this.avatar)
				storeModel.saveStore(...array).then(res=>{
					const { code, message, data } = res.data
					if(code === '0'){
						uni.hideLoading()
						if(!this.resume.id){
							that.hasToken = true
							uni.showModal({
								title: '',
								content: '注册成功!',
								showCancel: false,
								confirmText: '去企业端',
								success: res => {
									uni.reLaunch({
										url: '../../seller/main/main',
									})		
								},
							})
						}else{
							uni.showToast({
								title: '修改成功'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1
								})	
							},2000)
						}
					}else{
						uni.hideLoading()
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
			nameChanged(value){
				this.resume.name = value
			},
			cityChanged(value){
				this.resume.cityCode = value
			},
			addressChanged(value){
				this.resume.address = value
			},
			industryChanged(value){
				this.resume.industryCode = value
			},
			contactNameChanged(value){
				this.resume.contactName = value
			},
			phoneChanged(value){
				this.resume.phone = value
			},	
			verifyCodeChanged(value){
				this.verifyCode = value
			},
			getImageWebUrl(path, name){
				const that = this
				uni.showLoading({
					title: '上传中，请稍候...'
				})
				uni.uploadFile({
					url: config.base_url + '/store/getImageWebUrl',
					filePath: path,
					name: 'file',
					success(res){
						// 这里返回图片的url地址 response.data.url
						uni.hideLoading()
						let response = res.data
						if(typeof response === 'string'){
							response = JSON.parse(response)
						}
						const { code, message, data } = response
						if(code === '0'){
							uni.showToast({
								title: '上传成功'
							})
							that.imageChanged = true
							that.resume[name] = data.url
							console.log()
						}else{
							uni.showToast({
								icon:'none',
								title: message
							})
						}
						
					},
					fail: res=>{
						uni.showToast({
							icon:'none',
							title: '上传失败，请稍候再试'
						})
					}
				})
			},
			uploadAvatar(path){
				const that = this
				uni.showLoading({
					title: '上传中，请稍候...'
				})
				uni.uploadFile({
					// 这里修改上传地址
					url: config.base_url + '/store/getImageWebUrl',
					filePath: path,
					name: 'file',
					success(res){
						uni.hideLoading()
						let response = res.data
						if(typeof response === 'string'){
							response = JSON.parse(response)
						}
						const { code, message, data } = response
						if(code === '0'){
							uni.showToast({
								title: '上传成功'
							})
							that.avatarChanged = true
							that.uploadedAvatar = data.url
						}else{
							uni.showToast({
								icon:'none',
								title: message
							})
						}
					},
					fail: res=>{
						uni.showToast({
							icon:'none',
							title: '上传失败，请稍候再试'
						})
					}
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
	.avatar{
		width: 164upx;
		text-align: center;
		margin: 0 auto;
		image{
			height: 84upx;
			width: 84upx;
			border-radius: 50%;
		}
		.text{
			font-size: 20upx;
		}
	}
</style>
