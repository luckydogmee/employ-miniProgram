<template>
    <view class="content">
		<SellerHome v-if="loginType==='seller'"></SellerHome>
		<CustomerHome v-else></CustomerHome>
    </view>
</template>

<script>
    import {
        mapState
    } from 'vuex'
	import { DynamicTabBar } from 'utils/utils.js'
	import CustomerHome from '../customer/home/home.vue'
	import SellerHome from '../seller/home/home.vue'
	// import tabBar from '../../components/tabBar/tabBar.vue'

    export default {
        computed: {
			...mapState(['forcedLogin', 'hasLogin', 'userName']),
			loginType(){
				const type = uni.getStorageSync('userName')
				return type === 'admin' ? 'seller' : 'customer'
			}
		},
		components:{
			CustomerHome,
			SellerHome
		},
        onLoad() {
            if (!this.hasLogin) {
                uni.showModal({
                    title: '未登录',
                    content: '您未登录，需要登录后才能继续',
                    /**
                     * 如果需要强制登录，不显示取消按钮
                     */
                    showCancel: !this.forcedLogin,
                    success: (res) => {
                        if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
                            if (this.forcedLogin) {
                                uni.reLaunch({
                                    url: '../login/login'
                                });
                            } else {
                                uni.navigateTo({
                                    url: '../login/login'
                                });
                            }
                        }
                    }
                });
            }
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
