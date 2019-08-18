<template>
	<view class="cell-container" :class="[isSell?'sell':'']">
		<view class="cell-title">{{label}}<text class="required">{{required? '*' : '' }}</text></view>
		<input 
			class="cell-content" 
			:class="{'scale': scaleInput,'floatleft':inputFloat === 'left'}" 
			:placeholder="placeholder" 
			:disabled="disabled" 
			@input="handleInput" 
			:value="value" 
			@click="handleClick"
			placeholder-class="placeholder"
		/>
		<view v-if="hasSlot" class="slot">
			<slot></slot>
		</view>
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
			},
			placeholder: {
				type: String,
				default: ''
			},
			isSell: {
				type: Boolean,
				default: false
			},
			inputFloat:{
				type: String,
				default: 'right'
			},
			hasSlot: {
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
				
			},
			handleClick(e){
				this.$emit('on-click')
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
		&.sell{
			border: unset;
			border-bottom: 1upx solid #cccccc;
			padding: unset;
			margin-top: 24upx;
			margin-bottom: unset;
			height: 60upx;
			line-height: 60upx;
			font-size: 24upx;
			.placeholder{
				color: #595959;
				font-size: 24upx;
			}
		}
		.cell-title{
			color: #272626;
		}
		.cell-content{
			color: #595959;
		}
		::-webkit-input-placeholder{
			
		}
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
		&.floatleft{
			text-align: left;
		}
	}
	.slot{
		margin-left: 20upx;
	}
	.required{
		color: #ff8352;
	}
</style>
