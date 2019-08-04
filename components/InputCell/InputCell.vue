<template>
	<view class="cell-container">
		<view class="cell-title">{{label}}{{required? '*' : '' }}</view>
		<input class="cell-content" :class="{'scale': scaleInput}" :disabled="disabled" @input="handleInput" :value="value" />
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			required: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			scaleInput:{
				type: Boolean,
				default: false
			}
		},
		data(){
			return {
				value: ''
			}
		},
		mounted(){
			this.value = this.content
		},
		methods: {
			handleInput(e){
				
			}
		}
	}
</script>

<style lang="scss">
	.cell-container{
		height: 70upx;
		// width: 100%;
		border: 1upx solid #cccccc;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		margin-bottom: 20upx;
		font-size: 30upx;
		line-height: 70upx;
	}
	.cell-title{
		min-width: 200upx;
		width: 360upx;
		color: #808080;
		width: auto;
	}
	.cell-content{
		width: 400upx !important;
		text-align: right;
		color: #5a5a5a;
		width: auto;
		&.scale{
			width: 300upx !important;
		}
	}
</style>
