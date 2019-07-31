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
		<view class="project-list">
			<ListProject 
				:type="type" 
				@show="show(status,id)" 
				@showDetail="showDetail(id)" 
				@showDeliveryDetail="showDeliveryDetail(id)" 
				@recommend="recommend(id)" 
			/>
		</view>
	</view>
</template>

<script>
	import ListProject from '@/components/ListProject/ListProject.vue'
	export default {
		data() {
			return {
				type: 'all'
			}
		},
		components: {
			ListProject
		},
		methods: {
			switchTab(type){
				if(type === this.type){
					return 
				}
				this.type = type
				// 请求数据
			},
			show(status,id){
				// 根据状态判断
			},
			showDetail(id){
				uni.navigateTo({
					url: '../../PostDetail/PostDetail'
				})
			},
			showDeliveryDetail(id){
				uni.navigateTo({
					url: '../../customer/project/detail'
				})
			},
			recommend(id){
				
			}
		}
	}
</script>

<style lang="scss">
	.project-container{
		width: 750upx;
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
