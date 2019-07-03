export const DynamicTabBar = ()=>{
	const type = uni.getStorageSync('userName')
	if(type === 'admin'){
		// 设置tabBar
		uni.setTabBarItem({
			index: 0,
			text: '工作台'
		})
		uni.setNavigationBarTitle({
			title: '卖家首页'
		})
	}else{
		uni.setTabBarItem({
			index: 0,
			text: '首页'
		})
		uni.setNavigationBarTitle({
			title: '买家首页'
		})
	}
}