<template>
	<view class="home-customer">
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
			<view class="switchToSeller">
				<button type="primary" hover-class="none">切换到猎头</button>
			</view>
		</view>
		<view class="tab-container">
			<view class="tab">
				<button type="default">审核中</button>
			</view>
			<view class="tab">
				<button type="default">已发布</button>
			</view>
			<view class="tab">
				<button type="default">已下架</button>
			</view>
		</view>
		<view class="list-container">
			<ListItem @showDetail="showDetail" />
			<ListItem />
			<ListItem />
			<ListItem />
		</view>
	</view>
</template>

<script>
	import ListItem from '../../../components/ListItem/ListItem.vue'
	
	import UserModel from '../../../models/user.js';
	const userModel = new UserModel() 
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
		onReady() {
			this.showDetail(1)
		}, 
		onPullDownRefresh() {
			console.log(11111)
		},
		components:{
			ListItem
		},
		methods:{
			showDetail(id){
				uni.navigateTo({
					url: '../../PostDetail/PostDetail?id='+id
				})
			},
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
			}
		}
	}
</script>

<style lang="scss">
	.upload-wrapper{
		height: 230upx;
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
	.swiper-container{
		position: relative;
		height: 300upx;
		width: 750upx;
	}
	.switchToSeller{
		position: absolute;
		top: 20upx;
		right: 20upx;
		button{
			height: 40upx;
			width: 160upx;
			font-size: 20upx;
			line-height: 40upx;
			background: #ff9058;
			&:after{
				border: none;
			}
		}
	}
	.tab-container{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: 34upx 0;
		width: 750upx;
		background: unset;
		.tab{
			button{
				width: 170upx;
				height: 50upx;
				line-height: 50upx;
				font-size: 30upx;
				background: #fe935d;
				color: #fff;
				&:after{
					border: none;
				}
			}
		} 
	}
</style>
