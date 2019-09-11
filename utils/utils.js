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

export const formatDate = (date, fmt) => {
  var currentDate = new Date(date);
  var o = {
    "M+": currentDate.getMonth() + 1, //月份
    "d+": currentDate.getDate(), //日
    "h+": currentDate.getHours(), //小时
    "m+": currentDate.getMinutes(), //分
    "s+": currentDate.getSeconds(), //秒
    "q+": Math.floor((currentDate.getMonth() + 3) / 3), //季度
    "S": currentDate.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
