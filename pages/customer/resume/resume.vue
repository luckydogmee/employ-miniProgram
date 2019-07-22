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
		<view class="search-container">
			<view class="search">
				<input type="text" placeholder="请输入姓名或手机号搜索" />
				<button>搜索</button>
			</view>
		</view>
		<view class="list-container">
			<ListResume></ListResume>
			<ListResume></ListResume>
			<ListResume></ListResume>
			<ListResume></ListResume>
		</view>
	</view>
</template>

<script>
	import ListResume from '../../../components/ListResume/ListResume.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			ListResume	
		},
		methods: {
			
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
	.search-container{
		background: #efeff4;
		height: 150upx;
		width: 750upx;
		display: flex;
		justify-content: center;
		align-items: center;
		.search{
			height: 62upx;
			width: 628upx;
			background: url(../../../static/icon/resume-search.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		input{
			background: rgba(0,0,0,0);
			width: 400upx;
			height: 60upx;
			margin-left: 100upx;
			font-size: 26upx;
			color: #595959;
		}
		button{
			background: rgba(0,0,0,0);
			width: 90upx;
			height: 50upx;
			line-height: 50upx;
			margin-left: 38upx;
			font-size: 30upx;
			padding: unset;
			color: #fff;
			&:after{
				border:none;
			}
		}
	}
</style>
