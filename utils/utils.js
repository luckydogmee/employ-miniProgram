export const verifyPhone = (value = '')=>{
	console.log(value)
	const phoneRule = /^1[3456789]\d{9}$/
	return Boolean(phoneRule.test(value))
}
