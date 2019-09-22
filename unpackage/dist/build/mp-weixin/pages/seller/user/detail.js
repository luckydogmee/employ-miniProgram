(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/seller/user/detail"],{3810:function(e,t,n){"use strict";var o=n("59ba"),a=n.n(o);a.a},4259:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=d(n("d338")),a=d(n("d844")),i=d(n("58f9")),s=n("debc"),r=d(n("cf82")),c=d(n("3aaa")),u=d(n("b1d8"));function d(e){return e&&e.__esModule?e:{default:e}}function l(e){return m(e)||h(e)||f()}function f(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function h(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function m(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}var g=function(){return n.e("components/InputCell/InputCell").then(n.bind(null,"0972"))},p=function(){return n.e("components/UploadItem/UploadItem").then(n.bind(null,"8ed2"))},y=function(){return n.e("components/mpvue-citypicker/mpvueCityPicker").then(n.bind(null,"56a1"))},v=n("efbd"),b=new o.default,C=new a.default,I=new i.default,T={data:function(){return{isEdit:!0,isModify:!1,resume:{id:"",name:"",cityCode:"",address:"",industryCode:"",contactName:"",businessImg:"",companyImg:"",logo:"",phone:"",avatar:"../../../static/icon/add-avatar.png"},avatarChanged:!1,uploadedAvatar:"",businessImgChanged:!1,companyImgChanged:!1,logoChanged:!1,imageChanged:!1,pictureIndex:0,verifyText:"发送验证码",verifyCode:"",cityCodeText:"",citySelected:["510000","",""],readySendCode:!0,surplusSecond:0,verifyCodeTimer:null,industryArrayObject:[]}},components:{InputCell:g,UploadItem:p,mpvueCityPicker:y},computed:{industryText:function(){var e=this,t="";return this.industryArrayObject.forEach(function(n){n.code===e.resume.industryCode&&(t=n.name)}),t},industryArray:function(){var e=[];return this.industryArrayObject.forEach(function(t){e.push(t.name)}),e}},onLoad:function(e){"false"===e.isEdit&&(this.isEdit=!1),"true"===e.isEdit&&(this.isEdit=!0),this.getIndustry(),this.getCompanyInfo(),this.isModify=!0,this.btnText="提交修改"},methods:{getCompanyInfo:function(){var t=this;e.showLoading({mask:!0}),b.getCompanyInfo().then(function(n){e.hideLoading();var o=n.data,a=o.code,i=o.message,s=o.data;if("0"===a){t.resume=v.pick(s,["id","name","cityCode","address","industryCode","contactName","businessImg","companyImg","logo","phone","avatar"]);var d=t.resume.cityCode.split(","),l="";r.default.forEach(function(e){e.value==d[0].slice(0,2)&&(l+=e.label+"-")});var f=c.default.flat();f.forEach(function(e){e.value==d[1].slice(0,4)&&(l+=e.label+"-")});var h=u.default.flat(2);h.forEach(function(e){e.value==d[2]&&(l+=e.label)}),t.cityCodeText=l}else e.showToast({icon:"none",title:i})}).catch(function(t){e.showToast({icon:"none",title:"获取信息失败"})})},getIndustry:function(){var t=this;I.getIndustry().then(function(n){var o=n.data,a=o.code,i=o.message,s=o.data;"0"===a?t.industryArrayObject=s:e.showToast({icon:"none",title:i})}).catch(function(t){e.showToast({icon:"none",title:"获取行业信息失败"})})},industryChange:function(e){this.resume.industryCode=this.industryArrayObject[e.target.value].code},cityPickerChange:function(e){var t=e.detail,n=t.code,o=t.value;this.resume.cityCode=n.join(","),this.cityCodeText=Array.from(new Set(o)).join("-")},chooseAvatar:function(){var t=this;e.chooseImage({count:1,sizeType:"compressed",sourceType:["album","camera"],success:function(e){t.avatar=e.tempFilePaths[0],t.getImageWebUrl(e.tempFilePaths[0],"avatar")}})},chooseBusinessImg:function(){var t=this;e.chooseImage({count:1,sizeType:"compressed",sourceType:["album","camera"],success:function(e){t.resume.businessImg=e.tempFilePaths[0],t.getImageWebUrl(e.tempFilePaths[0],"businessImg")}})},chooseLogo:function(){var t=this;e.chooseImage({count:1,sizeType:"compressed",sourceType:["album","camera"],success:function(e){t.resume.logo=e.tempFilePaths[0],t.getImageWebUrl(e.tempFilePaths[0],"logo")}})},chooseCompanyImg:function(){var t=this;e.chooseImage({count:1,sizeType:"compressed",sourceType:["album","camera"],success:function(e){t.companyImg=e.tempFilePaths[0],t.getImageWebUrl(e.tempFilePaths[0],"companyImg")}})},sendVerifyCode:function(){var t=this;this.readySendCode&&(this.resume.phone?(e.showLoading({mask:!0}),b.getVerifyCode(this.resume.phone,"B").then(function(n){e.hideLoading();var o=n.data,a=o.code,i=o.message;o.data;"0"===a?(e.showToast({title:"验证码已发送，请注意查收"}),t.readySendCode=!1,t.surplusSecond=60,t.verifyCodeTimer=setInterval(function(){t.surplusSecond>0?t.surplusSecond-=1:(t.surplusSecond=0,t.readySendCode=!0,clearInterval(t.verifyCodeTimer))},1e3)):e.showToast({icon:"none",title:i})}).catch(function(t){e.hideLoading(),e.showToast({icon:"none",title:"获取验证码失败"})})):e.showToast({icon:"none",title:"请输入电话号码"}))},submitForm:function(){this.isModify?this.saveStore():this.postVerifyCode()},postVerifyCode:function(){var t=this;e.showLoading({mask:!0,title:"提交中..."}),b.login(this.resume.phone,this.verifyCode,"B").then(function(n){e.hideLoading();var o=n.data,a=o.code,i=o.message,s=o.data;"0"===a?(e.setStorageSync("token",s.token),t.saveStore()):e.showToast({icon:"none",title:i})}).catch(function(t){e.hideLoading(),e.showToast({icon:"none",title:"验证失败，请稍后再试"})})},saveStore:function(){var t=this;e.showLoading({mask:!0});var n=this,o=Object.values(this.resume);C.saveStore.apply(C,l(o)).then(function(o){var a=o.data,i=a.code,s=a.message;a.data;"0"===i?(e.hideLoading(),t.resume.id?e.showToast({title:"提交成功"}):(n.hasToken=!0,e.showModal({title:"",content:"注册成功!",showCancel:!1,confirmText:"去企业端",success:function(t){e.reLaunch({url:"../../seller/main/main"})}}))):(e.hideLoading(),e.showToast({icon:"none",title:s}))}).catch(function(t){e.showToast({icon:"none",title:"提交失败，请稍候再试"})})},nameChanged:function(e){this.resume.name=e},cityChanged:function(e){this.resume.cityCode=e},addressChanged:function(e){this.resume.address=e},contactNameChanged:function(e){this.resume.contactName=e},phoneChanged:function(e){this.resume.phone=e},verifyCodeChanged:function(e){this.verifyCode=e},getImageWebUrl:function(t,n){var o=this;e.showLoading({title:"上传中，请稍候..."}),e.uploadFile({url:s.config.base_url+"/store/getImageWebUrl",filePath:t,name:"file",success:function(t){e.hideLoading();var a=t.data;"string"===typeof a&&(a=JSON.parse(a));var i=a,s=i.code,r=i.message,c=i.data;"0"===s?(e.showToast({title:"上传成功"}),o.imageChanged=!0,o.resume[n]=c.url,console.log()):e.showToast({icon:"none",title:r})},fail:function(t){e.showToast({icon:"none",title:"上传失败，请稍候再试"})}})},uploadAvatar:function(t){var n=this;e.showLoading({title:"上传中，请稍候..."}),e.uploadFile({url:s.config.base_url+"/store/getImageWebUrl",filePath:t,name:"file",success:function(t){e.hideLoading();var o=t.data;"string"===typeof o&&(o=JSON.parse(o));var a=o,i=a.code,s=a.message,r=a.data;"0"===i?(e.showToast({title:"上传成功"}),n.avatarChanged=!0,n.uploadedAvatar=r.url):e.showToast({icon:"none",title:s})},fail:function(t){e.showToast({icon:"none",title:"上传失败，请稍候再试"})}})}}};t.default=T}).call(this,n("543d")["default"])},"59ba":function(e,t,n){},"5f87":function(e,t,n){"use strict";n.r(t);var o=n("4259"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,function(){return o[e]})}(i);t["default"]=a.a},"6b00":function(e,t,n){"use strict";n.r(t);var o=n("d4ac"),a=n("5f87");for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);n("3810");var s=n("2877"),r=Object(s["a"])(a["default"],o["a"],o["b"],!1,null,null,null);t["default"]=r.exports},d4ac:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=(e._self._c,e.resume.cityCode.split(","));e.$mp.data=Object.assign({},{$root:{g0:n}})},a=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return a})},f3ce:function(e,t,n){"use strict";(function(e){n("1833"),n("921b");o(n("66fd"));var t=o(n("6b00"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["f3ce","common/runtime","common/vendor"]]]);