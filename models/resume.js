import { HTTP } from '../utils/http.js'

class ResumeModel extends HTTP {
	constructor(arg){
		super()
	}
	// 查看自己创建的建立列表
	resumeList(pageNum=1, pageSize=10, status=1, keyWord){
		return this.request({
			url: '/resume/resumeList',
			method: 'POST',
			data: {
				pageNum, 
				pageSize, 
				status, 
				keyWord
			}
		})
	}
	// 保存、修改简历
	saveResume(
		id,
		name,
		phone,
		gender,
		age,
		educationDegree,
		workExperience,
		university,
		nativePlace,
		intentionalWork
	){
		return this.request({
			url: '/resume/saveResume',
			method: 'POST',
			data: {
				id,
				name,
				phone,
				gender,
				age,
				educationDegree,
				workExperience,
				university,
				nativePlace,
				intentionalWork
			}
		})
	}
	// 删除简历
	deleteResume(id){
		return this.request({
			url: '/resume/deleteResume',
			data: {
				id
			}
		})
	}
	//推送简历
	pushResume(jobId, resumeId, interviewDate, interviewTime,formId){
		return this.request({
			url: '/resume/pushResume',
			data: {
				jobId, 
				resumeId, 
				interviewDate, 
				interviewTime,
				formId
			}
		})
	}
	//查看推送的简历列表
	pushResumeList(pageNum=1, pageSize=10, jobId, status, keyWord){
		return this.request({
			url: '/resume/pushResumeList',
			data: {
				pageNum, 
				pageSize, 
				jobId, 
				status,
				keyWord
			}
		})
	}
	// 获取简历详情
	resumeDetail(id){
		return this.request({
			url: '/resume/resumeDetail',
			data: {
				id
			}
		})
	}
	// 获取简历推荐记录
	resumeRecord(pageNum=1, pageSize=10, id){
		return this.request({
			url: '/resume/resumeRecord',
			data: {
				pageNum,
				pageSize,
				id
			}
		})
	}
	/*** 以下B端 ***/
}

export default ResumeModel