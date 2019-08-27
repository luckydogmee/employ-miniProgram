<script>
	import {
		 mapState
	} from  'vuex'
	export default {
		computed: mapState(['userName']),
		onLaunch(){
			// setTimeout(()=>{
			// 	uni.reLaunch({
			// 		url:'../../../pages/seller/main/main'
			// 	})	
			// },100)
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>
<style lang="scss">
	/*每个页面公共css */
	body,
	page {
		min-height: 100%;
		display: flex;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		/* padding: 20upx; */
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
	}
	/* 公共样式 */
	.container{
		background: #f1f2f7;
	}
	.swiper-item{
		height:100%;
		width:100%;
		image{
			height: 100%;
			width:100%;
		}
	}
	.customer-wrapper{
		padding-bottom: 100upx;
	}
	button.swiper-button{
		height: 40upx;
		width: 160upx;
		font-size: 20upx;
		line-height: 40upx;
		background: #ff9058;
		&:after{
			border: none;
		}
	}
	
	// 以下独特样式
	
	/* ************ 表单相关 start ************** */
	.form-item{
		width: 100%;
		height: 60upx;
	}
	.sy-input{
		border-bottom: 1upx solid #ffd5a3;
		color: #989696;
		font-size: 30upx;
		height: 60upx;
		line-height: 60upx;
		letter-spacing: 4upx;
	}
	.input-placeholder{
		color: #989696;
		font-size: 30upx;
	}
	.default-btn{
		height: 48upx;
		width: 160upx;
		background: #ff9058;
		font-size: 30upx;
		line-height: 48upx;
		color: #fff;
		padding: unset;
		&:after{
			border: none;
		}
		&.disabled{
			background: #c8c7cc;
		}
	}
	.dialog-btn{
		height: 84upx;
		width: 100%;
		background: rgba(0,0,0,0);
		font-size: 30upx;
		color:#ff8353;
		&:after{
			border: none;
		}
	}
	
	/* ************ 表单相关 end ************** */
</style>
