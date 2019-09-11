import { HTTP } from '../utils/http.js'

class ProcessModel extends HTTP {
	constructor(arg) {
		super()
	}
	// 查看简历流程列表
	processList(receviedId){
		return this.request({
			url: '/process/processList',
			data: {
				receviedId
			}
		})
	}
	// 取消推送简历
	cancelResume(id){
		return this.request({
			url : '/process/cancelResume',
			data: {
				id
			}
		})
	}
	
	// 面试反馈 (B)
	interviewFeedback(processInfoId, feedbackStatus, time){
		return this.request({
			url : '/process/interviewFeedback',
			data: {
				processInfoId, 
				feedbackStatus, 
				time
			}
		})
	}
	
	// 入职反馈
	entryFeedBack(processInfoId, feedbackStatus, entryTime){
		return this.request({
			url : '/process/entryFeedback',
			data: {
				processInfoId, 
				feedbackStatus, 
				entryTime
			}
		})
	}
	// 离职反馈
	quitFeedBack(processInfoId, quitTime){
		return this.request({
			url : '/process/quitFeedback',
			data: {
				processInfoId, 
				entryTime
			}
		})
	}
} 

export default ProcessModel