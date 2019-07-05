import { HTTP } from '../utils/http.js'

class UserModel  extends HTTP {
	constructor(arg) {			
	    super()
	}
	test(){
		return this.request({
			url: '/test'
		})
	}
}

export default UserModel