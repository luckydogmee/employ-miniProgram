<template>
	<view class="add-container">
		<view class="add-avatar">
			<view class="avatar old-avatar">
				<image :src="avatar" mode=""></image>
				<view v-if="isEdit" class="text">默认头像</view>
			</view>
			<view v-if="isEdit" class="avatar new-avatar">
				<image 
					class="avatar new-avatar" 
					src="../../../static/icon/add-avatar.png" 
					mode=""
					@click="chooseImage"
				></image>
			</view>
		</view>
		<InputCell label="姓名" :required="isEdit" :disabled="!isEdit" :content="resume.name"></InputCell>
		<InputCell label="性别" :required="isEdit" :disabled="!isEdit" :content="resume.sex"></InputCell>
		<InputCell label="年龄" :required="isEdit" :disabled="!isEdit" :content="resume.age"></InputCell>
		<InputCell label="学历" :disabled="!isEdit" :content="resume.education"></InputCell>
		<InputCell label="电话(不会对企业公开)" :scaleInput="true" :required="isEdit" :disabled="!isEdit" :content="resume.phone"></InputCell>
		<InputCell label="工作经验" :disabled="!isEdit" :content="resume.exprience"></InputCell>
		<InputCell label="人员介绍" :disabled="!isEdit" :content="resume.introduction"></InputCell>
		<InputCell label="毕业院校" :disabled="!isEdit" :content="resume.university"></InputCell>
		<InputCell label="籍贯" :disabled="!isEdit" :content="resume.nativePlace"></InputCell>
		<button class="default-btn">提 交</button>
	</view>
</template>

<script>
	import InputCell from '@/components/InputCell/InputCell.vue'
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
				pictureIndex: 0
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
</style>
