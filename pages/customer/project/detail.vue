<template>
	<view class="project-container">
		<view class="tab-container">
			<view class="tab" @click="switchTab('all')" :class="{'active':type === 'all'}">
				全部岗位
			</view>
			<view class="tab" @click="switchTab('started')" :class="{'active':type === 'started'}">
				已开始
			</view>
			<view class="tab" @click="switchTab('notStart')" :class="{'active':type === 'notStart'}">
				未开始
			</view>
		</view>
		<Search @search="search" />
		<view class="project-list">
			<ListProjectDetail :type="type" 
				@showDetail="showDetail(id)" 
			/>
		</view>
	</view>
</template>

<script>
	import ListProjectDetail from '@/components/ListProjectDetail/ListProjectDetail.vue'
	import Search from '@/components/Search/Search.vue'
	export default {
		data() {
			return {
				type: 'all'
			}
		},
		components: {
			ListProjectDetail,
			Search
		},
		methods: {
			switchTab(type){
				if(type === this.type){
					return 
				}
				this.type = type
				// 请求数据
			},
			showDetail(id){
				// 跳转到聊天页面
			},
			search(keyword){
				// 搜索动作
			}
		}
	}
</script>

<style lang="scss">
	.project-container{
		width: 750upx;
		background: #f1f2f7;
	}
	.tab-container{
		display: flex;
		align-items: center;
		justify-content: space-around;
		background: #fff;
		width: 750upx;
		margin-bottom: 10upx;
		.tab{
			flex: 1;
			height: 48upx;
			line-height: 48upx;
			font-size: 30upx;
			
			color: #ff9058;
			text-align: center;
			&.active{
				font-weight: 600;
			}
		}
	}
	.project-list{
		width: 750px;
	}
</style>
