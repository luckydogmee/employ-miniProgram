(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/login/login","components/uni-popup/uni-popup"],{"06b5":function(e,n,t){},"0bbd":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={name:"UniPopup",props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},custom:{type:Boolean,default:!1},maskClick:{type:Boolean,default:!0},showMask:{type:Boolean,default:!0}},data:function(){return{ani:"",show:!1}},created:function(){},methods:{clear:function(){},open:function(){var e=this;this.show=!0,this.$nextTick(function(){setTimeout(function(){e.ani="uni-"+e.type},30)})},close:function(e){var n=this;!this.maskClick&&e||(this.ani="",this.$nextTick(function(){setTimeout(function(){n.show=!1},300)}))}}};n.default=o},"1b83":function(e,n,t){},"3c00":function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return i})},"521d":function(e,n,t){"use strict";t.r(n);var o=t("3c00"),i=t("7f41");for(var u in i)"default"!==u&&function(e){t.d(n,e,function(){return i[e]})}(u);t("6595");var s=t("2877"),a=Object(s["a"])(i["default"],o["a"],o["b"],!1,null,"38f440b4",null);n["default"]=a.exports},6595:function(e,n,t){"use strict";var o=t("06b5"),i=t.n(o);i.a},"7be3":function(e,n,t){"use strict";var o=t("1b83"),i=t.n(o);i.a},"7f41":function(e,n,t){"use strict";t.r(n);var o=t("dbcb"),i=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,function(){return o[e]})}(u);n["default"]=i.a},"86a3":function(e,n,t){"use strict";t.r(n);var o=t("0bbd"),i=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,function(){return o[e]})}(u);n["default"]=i.a},"8bf9":function(e,n,t){"use strict";t.r(n);var o=t("ca0b"),i=t("86a3");for(var u in i)"default"!==u&&function(e){t.d(n,e,function(){return i[e]})}(u);t("7be3");var s=t("2877"),a=Object(s["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=a.exports},ca0b:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return i})},dbcb:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("3c2a"),i=u(t("d338"));u(t("8bf9"));function u(e){return e&&e.__esModule?e:{default:e}}var s=new i.default,a={data:function(){return{savePhone:!0,surplusSecond:0,readySendCode:!0,verifyCodeTimer:null,focusArray:["phone","verify"],focusIndex:null,phone:"",verifyCode:""}},beforeDestroy:function(){clearInterval(this.verifyCodeTimer),this.verifyCodeTimer=null},methods:{savePhoneChange:function(){this.savePhone=!this.savePhone},handleBlur:function(e){var n=this.focusArray;if(e!=n.length-1)return this[n[e+1]]?void(this.focusIndex=null):void(this.focusIndex=e+1);this.focusIndex=null},getVerifyCode:function(){var n=this;if(this.readySendCode){if(!this.phone)return e.showToast({icon:"none",title:"请输入电话号码"}),void(this.focusIndex=0);var t=(0,o.verifyPhone)(this.phone);if(!t)return e.showToast({icon:"none",title:"手机号码错误，请确认"}),void(this.focusIndex=0);e.showLoading({mask:!0}),s.getVerifyCode(this.phone,"A").then(function(t){e.hideLoading();var o=t.data,i=o.code,u=o.message;o.data;"0"===i?(e.showToast({title:"验证码已发送"}),n.verifyCodeStatus=1,n.readySendCode=!1,n.surplusSecond=60,n.focusIndex=1,n.verifyCodeTimer=setInterval(function(){n.surplusSecond>0?n.surplusSecond-=1:(n.surplusSecond=0,n.verifyCodeStatus=0,n.readySendCode=!0,clearInterval(n.verifyCodeTimer))},1e3),n.focusIndex=1):(e.hideLoading(),e.showToast({icon:"none",title:u}))}).catch(function(n){e.showToast({icon:"none",title:"发送失败"})})}},submit:function(){var n=this;return this.phone?this.verifyCode?(e.showLoading({mask:!0}),void s.login(this.phone,this.verifyCode,"A").then(function(n){e.hideLoading();var t=n.data,o=t.code,i=t.data,u=t.message;"0"===o?0==i.isRegister?(e.showToast({title:"登录成功"}),e.setStorageSync("token",i.token),e.setStorageSync("isLogin",i.isLogin),e.setStorageSync("isRegister",i.isRegister),setTimeout(function(){e.reLaunch({url:"../../customer/main/main"})},2e3)):e.showToast({icon:"none",title:"手机号未注册"}):e.showToast({icon:"none",title:u})}).catch(function(n){e.hideLoading(),e.showToast({icon:"none",title:"登录失败，请稍候再试"})})):(e.showToast({icon:"none",title:"请输入验证码"}),void this.$nextTick(function(){n.focusIndex=1})):(e.showToast({icon:"none",title:"请输入电话号码"}),void this.$nextTick(function(){n.focusIndex=0}))},toRegister:function(){e.navigateTo({url:"../register/register"})}}};n.default=a}).call(this,t("543d")["default"])},ee05:function(e,n,t){"use strict";(function(e){t("1833");o(t("66fd"));var n=o(t("521d"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])}},[["ee05","common/runtime","common/vendor"]]]);