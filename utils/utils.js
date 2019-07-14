export const DynamicTabBar = ()=>{
	// uni.hideTabBar()
	const type = uni.getStorageSync('userName')
	/* if(type === 'admin'){
		// 设置tabBar
		uni.setTabBarItem({
			index: 0,
			text: '发布的项目'
		})
		uni.setTabBarItem({
			index: 1,
			text: '我的候选人'
		})
		uni.setTabBarItem({
			index: 2,
			text: '企业中心'
		})
		uni.setNavigationBarTitle({
			title: '街聘'
		})
	}else{
		uni.setTabBarItem({
			index: 0,
			text: '首页'
		})
		uni.setNavigationBarTitle({
			title: '街聘'
		})
	} */
}