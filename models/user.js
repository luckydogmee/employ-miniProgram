import { HTTP } from '../utils/http.js'

class UserModel  extends HTTP {
	constructor(arg) {			
	    super()
	}
	// 利用已知数据登录后台
	wxLogin(encryptedData, iv, code){
		return this.request({
			url: '/test',
			data: {
				encryptedData,
				ivData: iv,
				code	
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
	}
}

export default UserModel