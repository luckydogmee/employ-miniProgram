(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/register/register"],{"04de":function(e,n,t){"use strict";t.r(n);var o=t("1417"),i=t("75bf");for(var a in i)"default"!==a&&function(e){t.d(n,e,function(){return i[e]})}(a);t("f41d");var s=t("2877"),r=Object(s["a"])(i["default"],o["a"],o["b"],!1,null,"4793e450",null);n["default"]=r.exports},1417:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return i})},"75bf":function(e,n,t){"use strict";t.r(n);var o=t("e3dd"),i=t.n(o);for(var a in o)"default"!==a&&function(e){t.d(n,e,function(){return o[e]})}(a);n["default"]=i.a},d81c:function(e,n,t){"use strict";(function(e){t("1833");o(t("66fd"));var n=o(t("04de"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},e3dd:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("3c2a"),i=s(t("d338")),a=t("debc");function s(e){return e&&e.__esModule?e:{default:e}}var r=function(){return t.e("components/uni-popup/uni-popup").then(t.bind(null,"8bf9"))},u=new i.default,c={data:function(){return{surplusSecond:0,readySendCode:!0,verifyCodeTimer:null,focusArray:["name","age","gender","phone","verify"],focusIndex:null,agreement:!1,uploadedAvatar:"",avatarChanged:!1,name:"",age:"",gender:0,phone:"",verifyCode:"",genderArray:["男","女"],avatar:"../../../static/icon/add-avatar.png",userAgreement:""}},beforeDestroy:function(){clearInterval(this.verifyCodeTimer),this.verifyCodeTimer=null},onLoad:function(e){e.phone&&(this.phone=e.phone,this.userAgreement=a.config.userAgreement)},components:{uniPopup:r},computed:{genderText:function(){return this.genderArray[this.gender]}},methods:{agreementChange:function(){this.agreement=!this.agreement},handleBlur:function(e){this.focusArray},chooseImage:function(){var n=this;e.chooseImage({count:1,sizeType:"compressed",sourceType:["album","camera"],success:function(e){n.avatar=e.tempFilePaths[0],n.getImageWebUrl(e.tempFilePaths[0],"avatar")}})},getImageWebUrl:function(n,t){var o=this;e.showLoading({title:"上传中，请稍候..."}),e.uploadFile({url:a.config.base_url+"/user/uploadAvatar",filePath:n,name:"file",success:function(n){e.hideLoading();var t=n.data;"string"===typeof t&&(t=JSON.parse(t));var i=t,a=i.code,s=i.message,r=i.data;"0"===a?(e.showToast({title:"上传成功"}),o.avatarChanged=!0,o.uploadedAvatar=r.url,o.avatar=r.url,console.log(o)):e.showToast({icon:"none",title:s})},fail:function(n){e.showToast({icon:"none",title:"上传失败，请稍候再试"})}})},sendVerifyCode:function(){var n=this;if(this.readySendCode)if(this.phone){var t=(0,o.verifyPhone)(this.phone);t?(e.showLoading({mask:!0}),u.getVerifyCode(this.phone,"A").then(function(t){e.hideLoading();var o=t.data,i=o.code,a=o.message;o.data;"0"===i?(e.showToast({title:"已发送"}),n.surplusSecond=60,n.verifyCodeTimer=setInterval(function(){n.surplusSecond>0?(n.surplusSecond-=1,n.readySendCode=!1):(n.surplusSecond=0,n.readySendCode=!0,clearInterval(n.verifyCodeTimer))},1e3)):e.showToast({icon:"none",title:a})}).catch(function(n){e.showToast({icon:"none",title:"获取验证码失败"})})):e.showToast({icon:"none",title:"手机号码错误，请确认"})}else e.showToast({icon:"none",title:"请输入电话号码"})},submit:function(){var n=this;return this.name?this.age?this.phone?this.verifyCode?void(this.agreement?(e.showLoading({mask:!0}),u.verifyCode(this.phone,this.verifyCode).then(function(t){var o=t.data,i=(o.data,o.message),a=o.code;"0"==a?n.realRegister():(e.hideLoading(),e.showToast({icon:"none",title:i}))}).catch(function(n){e.hideLoading(),e.showToast({icon:"none",title:"注册失败"})})):e.showToast({icon:"none",title:"必须同意用户协议"})):(e.showToast({icon:"none",title:"请输入验证码"}),void this.$nextTick(function(){})):(e.showToast({icon:"none",title:"请输入电话号码"}),void this.$nextTick(function(){})):(e.showToast({icon:"none",title:"请输入年龄"}),void this.$nextTick(function(){})):(e.showToast({icon:"none",title:"请输入姓名"}),void this.$nextTick(function(){}))},realRegister:function(){var n=this,t=this.avatarChanged?this.avatar:"";u.register(this.name,this.age,this.phone,this.gender,t).then(function(t){var o=t.data,i=o.data,a=o.message,s=o.code;"0"===s?(e.hideLoading(),n.$refs.registerSuccess.open(),e.setStorageSync("isLogin",i.isLogin),e.setStorageSync("isRegister",i.isRegister),setTimeout(function(){e.reLaunch({url:"../../customer/main/main"})},2e3)):(e.hideLoading(),e.showToast({icon:"none",title:a}))}).catch(function(n){e.hideLoading(),e.showToast({icon:"none",title:"注册失败"})})},toLogin:function(){e.navigateTo({url:"../login/login"})},radioChange:function(e){this.gender=e.detail.value},showUserAgreement:function(){this.$refs.userAgreement.open()},closeDialog:function(){this.$refs.userAgreement.close()}}};n.default=c}).call(this,t("543d")["default"])}},[["d81c","common/runtime","common/vendor"]]]);