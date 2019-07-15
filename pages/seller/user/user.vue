<template>
	<view class="user-container">
		<UserItem />
		<UserFlex />
		<view class="button-group">
			<view class="button-item navigate">
				使用指南
			</view>
			<view class="button-item switch-account">
				切换帐号
			</view>
		</view>
	</view>
</template>

<script>
	import UserItem from '../../../components/UserItem/UserItem.vue'
	import UserFlex from '../../../components/UserFlex/UserFlex.vue'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			UserItem,
			UserFlex
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.button-group{
		margin-top: 106upx;
		.button-item{
			background: #fff;
			text-align: center;
			height: 82upx;
			line-height: 82upx;
			font-size: 48upx;
			color: #ff9058;
		}
		.navigate{
			margin-bottom: 26upx;
		}
	}
</style>
