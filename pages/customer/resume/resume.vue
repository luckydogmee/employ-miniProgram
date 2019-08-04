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
			<ListResume @on-click-record="showRecord" @on-click-recommend="recommendHim" ></ListResume>
			<ListResume></ListResume>
			<ListResume></ListResume>
			<ListResume></ListResume>
		</view>
		<view class="resume-add" @click="showAddResume">
			<image src="../../../static/icon/add.png" mode=""></image>
		</view>
		<!-- 推荐记录dialog -->
		<uni-popup ref="recommendRecord" custom="true" :showMask="false" :maskClick="false">
			<view class="recommendDialog">
				<view class="recommend-title">
					推荐记录
				</view>
				<view class="recommend-table">
					<view class="tr">
						<view class="th t1">推荐时间</view>
						<view class="th t2">岗位</view>
						<view class="th t3">公司</view>
						<view class="th t4">当前状态</view>
					</view>
					<view class="tr" v-for="item in recommendRecord" :key="item.id">
						<view class="td t1">{{item.time}}</view>
						<view class="td t2">{{item.post}}</view>
						<view class="td t3">{{item.company}}</view>
						<view class="td t4">{{item.status}}</view>
					</view>
				</view>
				<image class="close-icon" src="../../../static/icon/close.png" @click="closeRecommendDialog" />
			</view>
		</uni-popup>
		<Dialog :showDialog="showDialog">
			
		</Dialog>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	import ListResume from '@/components/ListResume/ListResume.vue'
	import Search from '@/components/Search/Search.vue' 
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import Dialog from '@/components/Dialog/Dialog.vue'
	export default {
		data() {
			return {
				recommendRecord:[
					{
						id: 1,
						time: '2019.9.15',
						post: '销售经理',
						company: '成都微招科技网络有限公司',
						status: '已终止'
					},
					{
						id: 2,
						time: '2019.9.15',
						post: '销售经理',
						company: '成都微招科技网络有限公司',
						status: '已终止'
					}
				],
				showDialog: false
			}
		},
		components:{
			ListResume,
			Search,
			uniPopup,
			Dialog
		},
		methods: {
			...mapMutations(['switchTab']),
			search(keyword){
				// 做搜索动作
			},
			showRecord(){
				this.$refs.recommendRecord.open()
			},
			closeRecommendDialog(){
				this.$refs.recommendRecord.close()
			},
			recommendHim(){
				
			},
			showAddResume(){
				uni.navigateTo({
					url: '../../public/addResume/addResume',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
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
	.recommendDialog{
		height: 580upx;
		width: 730upx;
		background: #fff;
		margin: 0 auto;
		position: relative;
		border: 1upx solid #b5b5b5;
	}
	.close-icon{
		width: 24upx;
		height: 24upx;
		position: absolute;
		top: 16upx;
		right: 24upx;
	}
	.recommend-title{
		font-size: 36upx;
		width: 100%;
		text-align: center;
		color: #ff9058;
		margin-top: 30upx;
	}
	.recommend-table{
		width: 553upx;
		margin: 30upx auto;
		border-top: 1upx solid #595959;
		border-left: 1upx solid #595959;
		overflow: auto;
		.tr{
			border-bottom: 1upx solid #595959;
			display: flex;
			align-items: center;
		}
		.th,.td{
			box-sizing: border-box;
			border-right: 1upx solid #595959;
			text-align: center;
			color: #ff9058;
		}
		.th{
			height: 60upx;
			line-height: 60upx;
			font-size: 24upx;	
			font-weight: 600;
		}
		.td{
			height: 76upx;
			font-size: 18upx;
			padding-top: 20upx;
			&.t3{
				padding: 20upx 16upx;
			}
		}
		.t1{
			width: 150upx;
		}
		.t2{
			width: 105upx;
		}
		.t3{
			width: 148upx;
		}
		.t4{
			width: 150upx;
		}
	}
	.resume-add{
		position: fixed;
		height: 87upx;
		width: 87upx;
		right: 32upx;
		bottom: 142upx;
		image{
			height: 100%;
			width: 100%;
		}
	},
	.add-resume-container{
		height: 1134upx;
		width: 750upx;
		background: #fff;
		border: 1upx solid red;
		box-sizing: border-box;
	}
</style>
