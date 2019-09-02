<template>
	<view class="add-container">
		<view class="add-top">
			<InputCell label="公司名称" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="resume.name" placeholder="请输入名称"></InputCell>
			<InputCell label="所在区域" :required="isEdit" :disabled="true" :isSell="true" :withPlugin="true" :hasSlot="true" :content="cityCodeText" placeholder="请选择区域>">
				<picker
					@change="cityPickerChange"
					mode="region"
					class="picker"
					:value="citySelected"
				>
					<view class="select"></view>
				</picker>
			</InputCell>
			<InputCell label="公司地址" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="resume.address" placeholder="请输入详细地址"></InputCell>
			<InputCell label="所在行业" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="resume.industryCode" placeholder="请输入行业"></InputCell>
			<InputCell label="招聘联系人" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="resume.contactName" placeholder="请输入联系人"></InputCell>
			
			<view class="upload-wrapper">
				<UploadItem title="上传营业执照" :imageUrl="resume.businessImg" @on-select-image="uploadBusinessImg" />
				<UploadItem title="上传公司logo" :imageUrl="resume.logo" @on-select-image="uploadLogo" />
				<UploadItem title="上传工作场景照" :imageUrl="resume.companyImg" @on-select-image="uploadCompanyImg" />
			</view>	
		</view>
		<view class="add-bottom">
			<InputCell label="联系电话" :required="isEdit" :disabled="!isEdit" :isSell="true" placeholder="请输入联系电话" :content="resume.phone"></InputCell>
			
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
			<inputCell label="验证码" :required="isEdit" :isSell="true" placeholder="请输入验证码" floatleft="left" :hasSlot="true" :content="verifyCode">
				<button class="default-btn verifyBtn verify-code-btn" :class="{'disabled':!readySendCode} "
					@click="sendVerifyCode">{{readySendCode ? '发送验证码' : surplusSecond + ' 秒后重新发送' }}</button>
			</inputCell>	
		</view>
		
		<button class="default-btn submit" @click="verifyCode">提交审核</button>
	</view>
</template>

<script>
	import InputCell from '@/components/InputCell/InputCell.vue'
	import UploadItem from '@/components/UploadItem/UploadItem.vue'
	export default {
		data() {
			return {
				isEdit: true, // 是否编辑状态
				resume: {
					name: '', // 公司名称
					cityCode: '', // 城市码
					address: '', // 地址
					industryCode: '', // 所在行业
					contactName: '', // 招聘联系人
					businessImg: '', // 营业执照
					companyImg: '', // 工作场景
					logo: '', // 公司logo
					phone: '', // 电话号码
				},
				bussinessImgChanged: false,
				companyImgChanged: false,
				logoChanged: false,
				pictureIndex: 0,
				verifyText: '发送验证码',
				verifyCode: '',
				cityCodeText: '', // 区域文字
				citySelected: [], // 已选中的城市
				readySendCode: true,
				surplusSecond: 0,
				verifyCodeTimer: null
			}
		},
		components: {
			InputCell,
			UploadItem
		},
		onLoad(options){
			if(options.isEdit === 'false'){
				this.isEdit = false
			}
			if(options.isEdit === 'true'){
				this.isEdit = true
			}
		},
		methods:{
			chooseImage(){
				// 让用户选择相册或者拍照
				uni.chooseImage({
					count:1,
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.avatar = res.tempFilePaths[0]
					}
				})
			},
			cityPickerChange(e){
				const { code, value } = e.detail
				this.resume.cityCode = code
				this.cityCodeText = Array.from( new Set(value)).join('')
			},
			uploadBusinessImg(){
				const that = this
				uni.chooseImage({
					count:1,
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						that.bussinessImgChanged = true
						that.resume.businessImg = res.tempFilePaths[0]
					}
				})
			},
			uploadLogo(){
				const that = this
				uni.chooseImage({
					count:1,
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						that.logoChanged = true
						that.resume.logo = res.tempFilePaths[0]
					}
				})
			},
			uploadCompanyImg(){
				const that = this
				uni.chooseImage({
					count:1,
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						that.companyImgChanged = true
						that.resume.companyImg = res.tempFilePaths[0]
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
				userModel.getVerifyCode(this.phone, 'B').then(res=>{
					// 请求成功,并判断code是否正确
					const { code, message, data } = res.data 
					if(code === '0'){
						uni.showToast({
							title: '验证码已发送，请注意查收'
						})
						this.surplusSecond = 120
						// this.focusIndex = 3
						this.verifyCodeTimer = setInterval(()=>{
							if(this.surplusSecond > 0){
								this.surplusSecond -= 1
							}else{
								this.surplusSecond = 0
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
					uni.showToast({
						icon:'none',
						title:'获取验证码失败'
					})
				})
			}
		},
		verifyCode(){
			const that = this
			userModel.login(this.resume.phone, this.verifyCode, 'B').then(res=>{
				const { code, message, data } = res.data
				if(code === '0'){
					that.savaStore()
				}else {
					uni.showToast({
						icon:'none',
						title: message
					})
				}
			})
		},
		savaStore(){
			const that = this
			const array = Object.values(this.resume)
			
			userModel.savaStore(...array).then(res=>{
				const { code, message, data } = res.data
				if(code === '0'){
					that.resume.id = data.id
					// 循环上传三张图片
					Promise.all(that.uploadBusinessImg, that.uploadLogo, that.uploadCompanyImg).then(res=>{
						uni.showToast({
							title: '注册成功'
						})
						setTimeout(()=>{
							uni.redirectTo({
								url: '../../seller/home/home'
							})	
						},2000)
					}).catch(err=>{
						setTimeout(()=>{
							uni.redirectTo({
								url: '../../seller/home/home'
							})	
						},2000)
						uni.showToast({
							icon:'none',
							title: '部分图片上传失败，请稍候完善'
						})
					})
					
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
		uploadBusinessImg(){
			return new Promise((resolve, reject)=>{
				if(that.bussinessImgChanged){
					uni.uploadFile({
						url: 'http://wzkjsyp.natapp1.cc/resume/bindingAvatar',
						filePath: that.resume.bussinessImg,
						name: 'file',
						formData: {
							id: that.resume.id
						},
						success(response) {
							resolve()
						}
					})	
				}else{
					resolve()
				}
			})
		},
		uploadLogoImg(){
			return new Promise((resolve, reject)=>{
				if(that.logoChanged){
					uni.uploadFile({
						url: 'http://wzkjsyp.natapp1.cc/resume/bindingAvatar',
						filePath: that.resume.logo,
						name: 'file',
						formData: {
							id: that.resume.id
						},
						success(response) {
							resolve()
						}
					})	
				}else{
					resolve()
				}
			})
		},
		uploadCompanyImg(){
			return new Promise((resolve, reject)=>{
				if(that.companyImgChanged){
					uni.uploadFile({
						url: 'http://wzkjsyp.natapp1.cc/resume/bindingAvatar',
						filePath: that.resume.companyImg,
						name: 'file',
						formData: {
							id: that.resume.id
						},
						success(response) {
							resolve()
						}
					})	
				}else{
					resolve()
				}
			})
		}
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
</style>
