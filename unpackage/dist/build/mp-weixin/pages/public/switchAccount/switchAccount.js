(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/public/switchAccount/switchAccount","components/uni-popup/uni-popup"],{"0051":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("3c2a"),i=u(n("d338"));u(n("8bf9"));function u(e){return e&&e.__esModule?e:{default:e}}var a=new i.default,s={data:function(){return{savePhone:!0,surplusSecond:0,readySendCode:!0,verifyCodeTimer:null,focusArray:["phone","verify"],focusIndex:null,phone:"",verifyCode:""}},beforeDestroy:function(){clearInterval(this.verifyCodeTimer),this.verifyCodeTimer=null},methods:{savePhoneChange:function(){this.savePhone=!this.savePhone},handleBlur:function(e){var t=this.focusArray;if(e!=t.length-1)return this[t[e+1]]?void(this.focusIndex=null):void(this.focusIndex=e+1);this.focusIndex=null},getVerifyCode:function(){var t=this;if(this.readySendCode){if(!this.phone)return e.showToast({icon:"none",title:"请输入电话号码"}),void(this.focusIndex=0);var n=(0,o.verifyPhone)(this.phone);if(!n)return e.showToast({icon:"none",title:"手机号码错误，请确认"}),void(this.focusIndex=0);e.showLoading({mask:!0}),a.getVerifyCode(this.phone,"A").then(function(n){e.hideLoading();var o=n.data,i=o.code,u=o.message;o.data;"0"===i?(e.showToast({title:"验证码已发送"}),t.verifyCodeStatus=1,t.readySendCode=!1,t.surplusSecond=60,t.focusIndex=1,t.verifyCodeTimer=setInterval(function(){t.surplusSecond>0?t.surplusSecond-=1:(t.surplusSecond=0,t.verifyCodeStatus=0,t.readySendCode=!0,clearInterval(t.verifyCodeTimer))},1e3),t.focusIndex=1):(e.hideLoading(),e.showToast({icon:"none",title:u}))}).catch(function(t){e.showToast({icon:"none",title:"发送失败"})})}},submit:function(){var t=this;if(!this.phone)return e.showToast({icon:"none",title:"请输入电话号码"}),void this.$nextTick(function(){t.focusIndex=0});if(!this.verifyCode)return e.showToast({icon:"none",title:"请输入验证码"}),void this.$nextTick(function(){t.focusIndex=1});e.showLoading({mask:!0});var n=e.getStorageSync("loginType");a.switchAccount(this.phone,this.verifyCode,n).then(function(t){e.hideLoading();var o=t.data,i=o.code,u=o.data,a=o.message;"0"===i?(e.showToast({title:"切换成功"}),e.setStorageSync("token",u.token),e.setStorageSync("isLogin",u.isLogin),e.setStorageSync("isRegister",u.isRegister),setTimeout(function(){"B"==n?e.reLaunch({url:"../../seller/main/main"}):e.reLaunch({url:"../../customer/main/main"})},2e3)):e.showToast({icon:"none",title:a})}).catch(function(t){e.hideLoading(),e.showToast({icon:"none",title:"登录失败，请稍候再试"})})},toRegister:function(){e.navigateTo({url:"../register/register"})}}};t.default=s}).call(this,n("543d")["default"])},"00b9":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return i})},"0bbd":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={name:"UniPopup",props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},custom:{type:Boolean,default:!1},maskClick:{type:Boolean,default:!0},showMask:{type:Boolean,default:!0}},data:function(){return{ani:"",show:!1}},created:function(){},methods:{clear:function(){},open:function(){var e=this;this.show=!0,this.$nextTick(function(){setTimeout(function(){e.ani="uni-"+e.type},30)})},close:function(e){var t=this;!this.maskClick&&e||(this.ani="",this.$nextTick(function(){setTimeout(function(){t.show=!1},300)}))}}};t.default=o},"1b83":function(e,t,n){},3504:function(e,t,n){"use strict";n.r(t);var o=n("00b9"),i=n("71fe");for(var u in i)"default"!==u&&function(e){n.d(t,e,function(){return i[e]})}(u);n("de55");var a=n("2877"),s=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,"64ddc0a2",null);t["default"]=s.exports},"415a":function(e,t,n){},"71fe":function(e,t,n){"use strict";n.r(t);var o=n("0051"),i=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,function(){return o[e]})}(u);t["default"]=i.a},"7be3":function(e,t,n){"use strict";var o=n("1b83"),i=n.n(o);i.a},"86a3":function(e,t,n){"use strict";n.r(t);var o=n("0bbd"),i=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,function(){return o[e]})}(u);t["default"]=i.a},"8bf9":function(e,t,n){"use strict";n.r(t);var o=n("ca0b"),i=n("86a3");for(var u in i)"default"!==u&&function(e){n.d(t,e,function(){return i[e]})}(u);n("7be3");var a=n("2877"),s=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,null,null);t["default"]=s.exports},ca0b:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return i})},cf3d:function(e,t,n){"use strict";(function(e){n("1833");o(n("66fd"));var t=o(n("3504"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},de55:function(e,t,n){"use strict";var o=n("415a"),i=n.n(o);i.a}},[["cf3d","common/runtime","common/vendor"]]]);