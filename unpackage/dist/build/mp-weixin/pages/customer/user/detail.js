(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/customer/user/detail"],{"072c":function(e,t,n){"use strict";(function(e){n("1833"),n("921b");a(n("66fd"));var t=a(n("9255"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"190a":function(e,t,n){"use strict";n.r(t);var a=n("2e68"),o=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);t["default"]=o.a},"2e68":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("d338")),o=n("debc");function r(e){return e&&e.__esModule?e:{default:e}}function i(e){return c(e)||s(e)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function s(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function c(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}var f=n("efbd"),l=new a.default,d={data:function(){return{userInfo:{}}},onLoad:function(){this.getUserInfo()},methods:{getUserInfo:function(){var t=this;e.showLoading({mask:!0}),l.getUserDetail().then(function(n){e.hideLoading();var a=n.data,o=a.data,r=a.code,i=a.message;"0"==r?(t.userInfo=f.pick(o,["age","name","gender","avatar"]),t.userInfo.phone=o.empowerPhone):e.showToast({icon:"none",title:i})}).catch(function(t){e.showToast({icon:"none",title:"获取用户信息失败"})})},chooseImage:function(){var t=this;e.chooseImage({count:1,sizeType:"compressed",sourceType:["album","camera"],success:function(e){t.userInfo.avatar=e.tempFilePaths[0],t.getImageWebUrl(e.tempFilePaths[0],"avatar")}})},getImageWebUrl:function(t,n){var a=this;e.showLoading({title:"上传中，请稍候..."}),e.uploadFile({url:o.config.base_url+"/user/uploadAvatar",filePath:t,name:"file",success:function(t){e.hideLoading();var n=t.data;"string"===typeof n&&(n=JSON.parse(n));var o=n,r=o.code,i=o.message,u=o.data;"0"===r?(e.showToast({title:"上传成功"}),a.userInfo.avatar=u.url):e.showToast({icon:"none",title:i})},fail:function(t){e.showToast({icon:"none",title:"上传失败，请稍候再试"})}})},radioChange:function(e){this.userInfo.gender=e.detail.value},submit:function(){e.showLoading({mask:!0});var t=Object.values(this.userInfo);l.updateUser.apply(l,i(t)).then(function(t){e.hideLoading();var n=t.data,a=(n.data,n.code),o=n.message;"0"==a?e.showToast({title:"修改成功"}):e.showToast({icon:"none",title:o})}).catch(function(t){e.showToast({icon:"none",title:"获取用户信息失败"})})}}};t.default=d}).call(this,n("543d")["default"])},"4cbc":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return o})},9255:function(e,t,n){"use strict";n.r(t);var a=n("4cbc"),o=n("190a");for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);n("a4d8");var i=n("2877"),u=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,"350ae1f0",null);t["default"]=u.exports}},[["072c","common/runtime","common/vendor"]]]);