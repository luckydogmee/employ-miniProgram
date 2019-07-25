import { HTTP } from '../utils/http.js'

// 对自己写的接口做一个promise封装，对微信自带的方法不做处理

class UserModel  extends HTTP {
	constructor(arg) {			
	    super()
	}
	// 根据code获取token
	wxLogin(code){
		return this.request({
			url: '/test',
			data: {
				code	
			}
		})
	}
	// 获取手机号登录，返回手机号
	getBindPhoneNumber(encryptedData, ivData){
		return this.request({
			url: '/test',
			data: {
				encryptedData,
				ivData
			}
		})
	}
	// 获取验证码
	getVerifyCode(phoneNumber){
		return this.request({
			url: '/getVerifyCode',
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
	},
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
	},
	// 登录
	login(phone, savePhoneNumber){
		return this.request({
			url: '',
			methods: 'POST',
			data: {
				phone,
				savePhoneNumber
			}
		})	
	}
}

export default UserModel