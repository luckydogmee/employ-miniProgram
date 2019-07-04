<template>
	<view class="home-seller">
		<view class="swiper-container">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item>
					<view class="swiper-item uni-bg-red">
						<image src="../../../static/swiper/banner1.png" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">
						<image src="../../../static/swiper/banner2.png" mode=""></image>
					</view>
				</swiper-item>
			</swiper>	
			<view class="upload-wrapper">
				<image src="../../../static/img/upload.jpeg" mode="" @click="chooseImage"></image>
			</view>
			<view class="authorize">
				<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">获取用户权限</button>
				<button type="primary" open-type="share">分享</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
 
			}
		},
		methods:{
			chooseImage(){
				uni.chooseImage({
					success(res) {
						const tempFilePath = res.tempFilePaths
						uni.uploadFile({
							url:'http://baidu.com',
							filePath:tempFilePath[0],
							name:'file',
							formData:{
								
							},
							success(uploadFileRes){
								console.log(uploadFileRes.data)
							}
						})
					}
				})
			},
			getUserInfo(e){
				console.log(e)
			},
		}
	}
</script>

<style scoped lang="scss">
	.swiper-item{
		height:100%;
		width:100%;
		image{
			height: 100%;
			width:100%;
		}
	}
	.upload-wrapper{
		height: 320upx;
		width:750upx;
		margin-top: 40upx;
		image{
			height: 100%;
			width:100%;
		}
	}
	.authorize{
		margin-top:40upx; 
	}
</style>
