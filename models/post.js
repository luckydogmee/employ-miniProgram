import { HTTP } from '../utils/http.js'

class PostModel extends HTTP {
	constructor(arg) {			
	    super()
	}
	// 获取岗位列表
	getPostList(pageNum, pageSize, keyWord, label){
		return this.request({
			url: '/job/jobList',
			method: 'POST',
			data: {
				pageNum, 
				pageSize, 
				keyWord, 
				label	
			}
		})
	}
	//获取岗位详情
	getPostDetail(id){
		return this.request({
			url: '/job/jobDetail',
			method: 'POST',
			data: {
				id	
			}
		})
	}
}

export default PostModel