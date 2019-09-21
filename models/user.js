import { HTTP } from '../utils/http.js'

// 对自己写的接口做一个promise封装，对微信自带的方法不做处理

class UserModel  extends HTTP {
	constructor(arg) {			
	    super()
	}
	// 根据code获取token
	wxLogin(code){
		return this.request({
			url: '/login/wxLogin',
			method: 'POST',
			data: {
				code	
			}
		})
	}
	// 获取手机号登录，返回手机号
	getBindPhoneNumber(encryptedData, iv){
		return this.request({
			url: '/login/getPhoneNumber',
			method: 'POST',
			data: {
				encryptedData,
				iv
			}
		})
	}
	// 绑定电话号码
	fastLogin(phoneNumber){
		return this.request({
			url: '/login/fastLogin',
			method: 'POST',
			data: {
				phoneNumber
			}
		})
	}
	// 获取验证码
	getVerifyCode(phone, type){
		let url = null
		if(type === 'A'){
			url = '/login/sendVerdifyCode'
		}else{
			url = '/login/sendVerdifyCodeForB'
		}
		return this.request({
			url,
			method: 'POST',
			data:{
				phone
			}
		});
	}
	// 验证验证码是否正确
	verifyCode(phone, code){
		return this.request({
			url: '/login/loginByCode',
			method: 'POST',
			data:{
				phone,
				code
			}
		})
	}
	// 注册
	register(name, age, phone, gender, avatar){
		return this.request({
			url: '/login/register',
			methods: 'POST',
			data: {
				name,
				age,
				phone,
				gender,
				avatar
			}
		})
	}
	// 登录
	login(phone, code, type){
		let url = null
		if(type === 'A'){
			url = '/login/loginByCode'
		}else{
			url = '/login/loginByCodeforB'
		}
		return this.request({
			url,
			methods: 'POST',
			data: {
				phone,
				code
			}
		})	
	}
	// 获取用户信息
	getUserInfo(){
		return this.request({
			url: '/user/getUserInfo'
		})
	}
	// 获取用户详细信息
	getUserDetail(){
		return this.request({
			url: '/user/getUserDetail'
		})
	}
	// 获取B端用户信息
	getCompanyInfo(){
		return this.request({
			url: '/user/getCompanyInfo'
		})
	}
	// 更改用户信息
	updateUser(age,name,gender,avatar,phone){
		return this.request({
			url: '/user/updateUser',
			data:{
				age,
				name,
				gender,
				avatar,
				phone
			}
		})
	}
	
	//保存、更改用户信息
	updateUserInfo(name, age){
		return this.request({
			url: '/user/updateUserInfo',
			data: {
				name,
				age
			}
		})
	}
	//获取提现列表
	getCashoutList(){
		return this.request({
			url: '/user/getCashoutList',
		})
	}
	// 申请提现
	cashout(){
		return this.request({
			url: '/user/cashout',
		})
	}
	// 获取用户详情 （B）
	getStoreInfo(){
		return this.request({
			url: '/user/getStoreInfo',
		})
	}
	
	// 获取用户花费详情 （B）
	getCashoutDetail(){
		return this.request({
			url: '/user/getCashoutDetail'
		})
	}
	
	// 判断是否登录B端
	loginForB(){
		return this.request({
			url: '/login/loginForB'
		})
	}
}

export default UserModel