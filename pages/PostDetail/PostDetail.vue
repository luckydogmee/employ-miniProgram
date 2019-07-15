<template>
	<view class="container detail-container">
		<view class="swiper-container">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item>
					<view class="swiper-item uni-bg-red">
						<image src="../../static/swiper/banner1.png" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">
						<image src="../../static/img/upload.jpeg" mode=""></image>
					</view>
				</swiper-item>
			</swiper>	
		</view>
		<view class="detail-content">
			<Cell title="成都微派财富有限公司">
				<view class="content">
					<text>招聘人数： 10人</text>
					<text>地址：中国四川省成都市锦江区</text>	
				</view>
			</Cell>
			<Cell title="职位描述" />
			<Cell title="悬赏信息" subTitle="300元/人" />
		</view>
	</view>
</template>

<script>
	import Cell from '../../components/Cell/Cell.vue'
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		onLoad(option){
			console.log(option.id)
		},
		components: {
			Cell
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.swiper-container{
		height: 350upx;
		width: 750upx;
		.swiper{
			height: 100%;
		}
	}
	.content{
		background: #fff;
		text{
			line-height: 48upx;
		}
	}
</style>
