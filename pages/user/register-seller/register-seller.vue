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
				<UploadItem title="上传营业执照" :imageUrl="resume.businessImg" @on-select-image="uploadImage" />
				<UploadItem title="上传公司logo" :imageUrl="resume.logo" />
				<UploadItem title="上传工作场景照" :imageUrl="resume.companyImg" />
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
			<inputCell label="验证码" :required="isEdit" :isSell="true" placeholder="请输入验证码" floatleft="left" :hasSlot="true">
				<button class="default-btn verifyBtn">{{verifyText}}</button>
			</inputCell>	
		</view>
		
		<button class="default-btn submit">提交审核</button>
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
				pictureIndex: 0,
				verifyText: '发送验证码',
				cityCodeText: '', // 区域文字
				citySelected: [], // 已选中的城市
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
			uploadImage(){
				uni.chooseImage({
					count:1,
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.avatar = res.tempFilePaths[0]
					}
				})
			}
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
