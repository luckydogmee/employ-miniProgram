export const verifyPhone = (value = '')=>{
	console.log(value)
	const phoneRule = /^1[3456789]\d{9}$/
	return Boolean(phoneRule.test(value))
}

export const computedRequired = (data) =>{
	let age = `${data.ageMin} ~ ${data.ageMax} 岁`
	let degree = '不限学历'
	let exprience = '不限工作经验'
	switch (data.educationDegree){
		case 0:
			degree = '不限学历'
			break;
		case 1:
			degree = '高中及以上'
			break;
		case 2:
			degree = '大专及以上'
			break;
		case 3:
			degree = '本科及以上'
			break;
		default:
			degree = '不限学历'
			break;
	}
	switch (data.workExperience){
		case 0:
			exprience = '不限工作经验'
			break;
		case 1:
			exprience = '一年以上工作经验'
			break;
		case 2:
			exprience = '三年以上工作经验'
			break;
		case 3:
			exprience = '五年以上工作经验'
			break;
		default:
			exprience = '不限工作经验'
			break;
	}
	return `${age} | ${degree} | ${exprience}`
}
