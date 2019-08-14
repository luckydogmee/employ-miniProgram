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
	getBindPhoneNumber(encryptedData, ivData){
		return this.request({
			url: '/login/getPhoneNumber',
			method: 'POST',
			data: {
				encryptedData,
				ivData
			}
		})
	}
	// 获取验证码
	getVerifyCode(phoneNumber, type){
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
				phoneNumber
			}
		});
	}
	// 验证验证码是否正确
	verifyCode(phone, code){
		return this.request({
			url: '',
			method: 'POST',
			data:{
				phone,
				code
			}
		})
	}
	// 注册
	register(name, age, phone){
		return this.request({
			url: '',
			methods: 'POST',
			data: {
				name,
				age,
				phone
			}
		})
	}
	// 登录
	login(phone, verifyCode, type){
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
				verifyCode
			}
		})	
	}
}

export default UserModel