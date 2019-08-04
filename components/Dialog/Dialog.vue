<template>
	<view class="dialog-container">
		<uniPopup ref="dialog" custom="true" :showMask="false" :maskClick="false">
			<view v-if="type === 'alert'" class="dialog-alert">
				<slot>
					
				</slot>
			</view>
			<view v-if="type === 'confirm'" class="dialog-confirm">
				
			</view>
		</uniPopup>	
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components:{
			uniPopup
		},
		props:{
			showDialog: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: 'alert'
			},
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
		},
		watch: {
			showDialog(value){
				if(value){
					this.open()
				}
			}
		},
		methods:{
			open(){
				this.$refs.dialog.open()
			}
		}
	}
</script>

<style>
</style>
