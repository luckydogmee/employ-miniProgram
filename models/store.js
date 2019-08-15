import { HTTP } from '/utils/http.js'
 
 class StoreModel extends HTTP {
	 constructor(args){
		 super()
	 }
	 // 保存、修改商户
	 saveStore(
		id,
		name,
		cityCode,
		address,
		industryCode,
		contactName,
		businessImg,
		companyImg,
		logo,
		phone
	 ){
		 return this.request({
			 url: '/store/saveStore',
			 data: {
				 id,
				 name,
				 cityCode,
				 address,
				 industryCode,
				 contactName,
				 businessImg,
				 companyImg,
				 logo,
				 phone
			 }
		 })
	 }
	 // 上传图片
	 uploadImage(file){
		 return this.request({
			 url: '/store/uploadImage',
			 data: {
				 file
			 }
		 })
	 }
 }
 
export default StoreModel