<template>
	<view class="add-container">
		<InputCell label="公司名称" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="resume.name" placeholder="请输入名称"></InputCell>
		<InputCell label="所在区域" :required="isEdit" :disabled="true" :isSell="true" :content="resume.sex" placeholder="请选择区域"></InputCell>
		<InputCell label="公司地址" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="resume.age" placeholder="请输入详细地址>"></InputCell>
		<InputCell label="所在行业" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="resume.education" placeholder="请输入行业"></InputCell>
		<InputCell label="招聘联系人" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="resume.exprience" placeholder="请输入联系人"></InputCell>
		
		<view class="upload-wrapper">
			<UploadItem title="上传营业执照" />
			<UploadItem title="上传公司logo" />
			<UploadItem title="上传工作场景照" />
		</view>
		<InputCell label="联系电话" :required="isEdit" :disabled="!isEdit" :isSell="true" :content="resume.introduction"></InputCell>
		
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
		<inputCell label="验证码" :required="isEdit" :isSell="true" floatleft="left" :hasSlot="true">
			<button class="default-btn">{{verifyText}}</button>
		</inputCell>
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
				avatar: '../../../static/img/avatar.png', //头像地址
				resume: {
					name: '',
					sex:　'',
					age: '',
					education: '',
					phone: '',
					exprience: '',
					introduction: '',
					university: '',
					nativePlace: ''
				},
				pictureArray: ['从相册选择', '相机拍摄'],
				pictureIndex: 0,
				verifyText: '发送验证码'
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
	.upload-wrapper{
		display: flex;
		flex-direction: flex-start;
		flex-wrap: wrap;
	}
	.submit{
		margin-top: 40upx;
	}
</style>
