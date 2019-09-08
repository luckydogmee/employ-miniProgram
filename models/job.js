import { HTTP } from '../utils/http.js'

class PostModel extends HTTP {
	constructor(arg) {			
	    super()
	}
	// 获取岗位列表
	jobList(pageNum, pageSize, keyWord, label){
		return this.request({
			url: '/job/jobList',
			data: {
				pageNum, 
				pageSize, 
				keyWord, 
				label	
			}
		})
	}
	//获取岗位详情
	jobDetail(id){
		return this.request({
			url: '/job/jobDetail',
			data: {
				id	
			}
		})
	}
	// A端接单
	collectionJob(id){
		return this.request({
			url: '/job/collectionJob',
			data: {
				id	
			}
		})
	}
	// 获取我的项目列表
	collectionJobList(pageNum=1, pageSize=10, collectionJobStatus){
		return this.request({
			url: '/job/collectionJobList',
			data: {
				pageNum,
				pageSize,
				collectionJobStatus
			}
		})
	}
	
	/********** 以下B端接口 *************/
	
	// 查看 发布的项目 （B）
	publishJobList(pageNum=1, pageSize=10, status=0, jobName=''){
		return this.request({
			url: '/job/publishJobList',
			data: {
				pageNum,
				pageSize,
				jobName,
				status
			}
		})
	}
	// 保存/修改岗位信息
	saveJob(
		/* id, 
		industryCode, // 行业代码
		jobName, // 岗位名称
		description, // 岗位描述
		num, // 招聘人数
		educationDegree, // 学历 0、1、2、3
		workExperience, // 工作经验 0、1、2、3
		probation, //是否有试用期 0、1
		trialTime, // 可面试时间
		trialSalary, // 试用薪资
		officialSalary, // 正式薪资
		avgSalary, // 平均薪资
		reward, // 岗位赏金
		overtime // 过保时间 */
		
		id,
		jobName,
		description,
		num,
		minAge,
		maxAge,
		educationDegree,
		workExperience,
		probation,
		trialTime,
		trialSalary,
		officialSalary,
		interviewTime,
		avgSalary,
		reward,
		overtime,
		totalAmount, // 履约金
	){
		return this.request({
			url: '/job/saveJob',
			data: {
				id,
				jobName,
				description,
				num,
				minAge,
				maxAge,
				educationDegree,
				workExperience,
				probation,
				trialTime,
				trialSalary,
				officialSalary,
				interviewTime,
				avgSalary,
				reward,
				overtime,
				totalAmount,
			}
		})
	}
	// 更改岗位状态
	// status 0 审核中 1 已发布 2 已下架
	updateStatus(id, status){
		return this.request({
			url: '/job/updateStatus',
			data: {
				id,
				status
			}
		})
	}
	// 获取区域信息
	getArea(parentCode="root"){
		return this.request({
			url: '/job/getArea',
			data: {
				id,
				parentCode
			}
		})
	}
	// 获取行业信息
	getIndustry(){
		return this.request({
			url: '/job/getIndustry',
			data: {}
		})
	}
}

export default PostModel