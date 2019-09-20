<script>
	import {
		 mapState
	} from  'vuex'
	export default {
		computed: mapState(['userName']),
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
	.list-empty{
		text-align: center;
		min-height: 200upx;
		font-size: 24upx;
		color: #8F8F94;
	}
	.hasend{
		height: 40upx;
		line-height: 40upx;
		text-align: center;
		width: 750upx;
		font-size: 20upx;
		color: #666;
		margin-top: 10upx;
		margin-bottom: 10upx;
	}
	.empty{
		text-align: center;
		width: 750upx;
		min-height: 120upx;
		padding-top: 40upx;
		color: #8F8F94;
		font-size: 28upx;
	}
	.selectDateDialog{
		height: 360upx;
		width: 461upx;
	}
	.selectDate-footer{
		height: 86upx;
		width: 462upx;
		padding-top: 1upx;
		box-sizing: border-box;
		display: flex;
		justify-content:space-between;
		background:#e7e7e7;
		align-items: center;
		.selectDate-btn{
			width: 230upx;
			height: 100%;
			line-height: 84upx;
			background: #FFFFFF;
			text-align: center;
			font-size: 30upx;
			color: #ff8353;
		}
	}
	.selectDate-title{
		color: #ff9760;
		font-size: 22upx;
		line-height: 60upx;
		background: #FFFFFF;
		font-weight: blod;
		padding-left: 30upx;
	}
	.selectDate-content{
		background: #FFFFFF;
		height: 210upx;
		width: 462upx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		.selectDate-picker{
			display: flex;
			justify-content: center;
			height: 46upx;
			align-items: center;
			width: 256upx;
			flex-wrap: wrap;
			padding-top: 40upx;
			padding-bottom: 20upx;
			.selectDate-content{
				width: 340upx;
				height: 50upx;
				line-height: 50upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
			.date-view{
				width: 340upx;
				height: 50upx;
				line-height: 50upx;
				font-size: 20upx;
				color: #666;
				text-align: center;
				border: 1upx solid #fe9661;
			}
		}	
		.text{
			color: #8F8F94;
			text-align: center;
			line-height: 40upx;
			font-size: 20upx;
		}
	}
	.changeTime{
		width: 184upx;
		height: 30upx;
		font-size: 20upx;
		color: #666;
		text-align: center;
		border: 1upx solid #fe9661;
	}
	.userAgreement{
		background: #FFFFFF;
		height: 1100upx;
		position: relative;
		padding: 40upx 20upx;
		box-sizing: border-box;
	}
	.close-icon{
		width: 24upx;
		height: 24upx;
		position: absolute;
		top: 16upx;
		right: 24upx;
	}
	.to-login{
		color: #feae86;
		font-size: 24upx;
		margin-top: 18upx;
		text-align: center;
	}
	// 以下独特样式
	
	/* ************ 表单相关 start ************** */
	.form-item{
		width: 100%;
		height: 60upx;
	}
	.form-item.form-input{
		border-bottom: 1upx solid #ffd5a3;
	}
	.sy-input{
		color: #989696;
		font-size: 30upx;
		height: 60upx;
		line-height: 60upx;
		letter-spacing: 4upx;
		width: 340upx;
	}
	.input-placeholder{
		color: #989696;
		font-size: 28upx;
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
