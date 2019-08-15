import { config } from '../config.js'

const tips = {
	0: '未知错误'
}

class HTTP{
	request({url, method="POST", data={}}){
		return new Promise((resolve, reject)=>{
			this._request(url, resolve, reject, method, data)
		})
	}
	_request(url, resolve, reject, method, data){
		const that = this
		let header = {
			"Content-Type": "application/x-www-form-urlencoded"
		}
		if(uni.getStorageSync('token')){
			header.authorization =  uni.getStorageSync('token')
		}
		uni.request({
			url: config.base_url + url,
			method,
			data,
			header,
			success(res) {
				// TODO  根据返回的数据统一格式做处理
				resolve(res)
			},
			fail(err) {
				reject(err)
				that._showError(err.code)
			}
		})
	}
	_showError(errCode){
		const tip = tips[errCode]
		uni.showToast({
			title: tip ? tip : tips[0],
			icon: 'none',
			duration: 3000
		})
	}
}

export { HTTP }