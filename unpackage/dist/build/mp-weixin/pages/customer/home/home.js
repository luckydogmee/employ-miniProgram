(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/customer/home/home"],{"3e17":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},"7a32":function(t,e,n){"use strict";n.r(e);var o=n("7a6f"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=a.a},"7a6f":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("c501"));function a(t){return t&&t.__esModule?t:{default:t}}var i=function(){return n.e("components/ListItem/ListItem").then(n.bind(null,"5214"))},u=function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"313c"))},c=new o.default,r={data:function(){return{background:["color1","color2","color3"],indicatorDots:!0,autoplay:!0,interval:2e3,duration:500}},onReady:function(){},components:{ListItem:i,uniPopup:u},methods:{chooseImage:function(){t.chooseImage({success:function(e){var n=e.tempFilePaths;t.uploadFile({url:"http://baidu.com",filePath:n[0],name:"file",formData:{},success:function(t){console.log(t.data)}})}})},getUserInfo:function(t){console.log(t)},getPhoneNumber:function(e){var n=e.detail,o=n.iv,a=n.encryptedData,i=n.errMsg;"getPhoneNumber:ok"!==i&&t.showToast({title:"授权失败，请重新授权"}),t.login({provider:"weixin",success:function(e){"login:ok"===e.errMsg?c.wxLogin({data:{encryptedData:a,ivData:o,code:e.code},success:function(e){0==e.data.code?t.setStorageSync("token",e.data.data.token):t.showToast({title:"登录失败，请重新授权"})}}):t.showToast({icon:"none",title:"获取code失败"})}})},toRegister:function(){t.navigateTo({url:"../../user/register/register"})},showDetail:function(){var e=this;t.checkSession({success:function(e){var n=t.getStorageSync("token");console.log(n)},fail:function(t){e.login()}})},login:function(){this.$refs.noticeLogin.open()}}};e.default=r}).call(this,n("543d")["default"])},"8f23":function(t,e,n){"use strict";n.r(e);var o=n("3e17"),a=n("7a32");for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n("7528");var u=n("2877"),c=Object(u["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/customer/home/home-create-component',
    {
        'pages/customer/home/home-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8f23"))
        })
    },
    [['pages/customer/home/home-create-component']]
]);                
