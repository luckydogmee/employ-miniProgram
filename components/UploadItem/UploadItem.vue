<template>
	<view class="upload-container">
		<view class="upload-title">
			<view>{{title}}</view>
			<view class="upload-required">*</view>
		</view>
		<view class="upload-content">
			<image src="../../static/upload.png" @click="selectImage" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			required: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			selectImage(){
				this.$emit('on-select-image')
			}
		}
	}
</script>

<style lang="scss">
	.upload-container{
		margin-right: 96upx;
		margin-top: 24upx;
	}
	.upload-title{
		color: #272626;
		font-size: 24upx;
		display: flex;
	}
	.upload-required{
		color: #ff8352;
		font-size: 24upx;
		margin-left: 4upx;
	}
	.upload-content{
		width: 210upx;
		height: 180upx;
		margin-top: 16upx;
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>
