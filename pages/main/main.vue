<template>
    <view class="content">
		<!-- <SellerHome v-if="loginType==='seller'"></SellerHome>
		<CustomerHome v-else></CustomerHome> -->
    </view>
</template>

<script>
    import {
        mapState
    } from 'vuex'
	import { DynamicTabBar } from 'utils/utils.js'
	import CustomerHome from '../customer/home/home.vue'
	import SellerHome from '../seller/home/home.vue'
    export default {
        computed: {
			...mapState(['forcedLogin', 'hasLogin', 'userName']),
			loginType(){
				const type = uni.getStorageSync('userName')
				// 开发阶段默认显示招聘端
				return 'customer'
				return type === 'admin' ? 'seller' : 'customer'
			}
		},
		components:{
			CustomerHome,
			SellerHome
		},
        onLoad() {
           
        },
		onShow() {
			DynamicTabBar()
		}
    } 
</script>

<style>
    .hello {
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    .title {
        color: #8f8f94;
        margin-top: 50upx;
    }

    .ul {
        font-size: 30upx;
        color: #8f8f94;
        margin-top: 50upx;
    }

    .ul>view {
        line-height: 50upx;
    }
</style>
