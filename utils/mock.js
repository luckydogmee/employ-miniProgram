import Mock from 'mockjs'

Mock.mock('/test','get',{
	code: 200,
	data: {
		name: 'zhangsan',
		age: 24
	}
})
