<template>
	<view class="resume-container">
		<view class="tab-container">
			<view class="tab">
				全部简历
			</view>
			<view class="tab">
				已推荐过
			</view>
			<view class="tab">
				未推荐过
			</view>
		</view>
		<Search @search="search" />
		<view class="list-container">
			<ListResume></ListResume>
			<ListResume></ListResume>
			<ListResume></ListResume>
			<ListResume></ListResume>
		</view>
	</view>
</template>

<script>
	import ListResume from '@/components/ListResume/ListResume.vue'
	import Search from '@/components/Search/Search.vue' 
	export default {
		data() {
			return {
				
			}
		},
		components:{
			ListResume,
			Search
		},
		methods: {
			search(keyword){
				// 做搜索动作
			}
		}
	}
</script>

<style lang="scss">
	.resume-container{
		width: 750upx;
	}
	.tab-container{
		display: flex;
		align-items: center;
		justify-content: space-around;
		background: #fff;
		.tab{
			flex: 1;
			height: 48upx;
			line-height: 48upx;
			font-size: 26upx;
			color: #ff9058;
			text-align: center;
		}
	}
</style>
