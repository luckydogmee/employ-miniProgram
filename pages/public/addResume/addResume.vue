<template>
	<view class="add-container">
		<InputCell label="姓名" :required="isEdit" :disabled="!isEdit"></InputCell>
		<InputCell label="性别" :required="isEdit" :disabled="!isEdit"></InputCell>
		<InputCell label="年龄" :required="isEdit" :disabled="!isEdit"></InputCell>
		<InputCell label="学历" :disabled="isEdit"></InputCell>
		<InputCell label="电话(不会对企业公开)" :scaleInput="true" :required="isEdit" :disabled="!isEdit"></InputCell>
		<InputCell label="工作经验" :disabled="!isEdit"></InputCell>
		<InputCell label="人员介绍" :disabled="!isEdit"></InputCell>
		<InputCell label="毕业院校" :disabled="!isEdit"></InputCell>
		<InputCell label="籍贯" :disabled="!isEdit"></InputCell>
	</view>
</template>

<script>
	import InputCell from '@/components/InputCell/InputCell.vue'
	export default {
		data() {
			return {
				isEdit: true
			}
		},
		components: {
			InputCell
		}
	}
</script>

<style lang="scss">
	.add-container{
		width: 750upx;
		padding: 0 34upx;
		box-sizing: border-box;
	}
</style>
