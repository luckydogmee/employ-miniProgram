(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/customer/home/home"],{3738:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("d338")),i=a(n("58f9"));function a(t){return t&&t.__esModule?t:{default:t}}function s(t){return l(t)||c(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function c(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function l(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}var u=function(){return n.e("components/ListItem/ListItem").then(n.bind(null,"ae53"))},f=new o.default,h=new i.default,d={data:function(){return{background:["color1","color2","color3"],indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,postList:[],pageNum:1,pageSize:8,loading:!1,hasEnd:!1,keyword:"",label:""}},components:{ListItem:u},mounted:function(){this.getJobList()},methods:{getJobList:function(){var e=this,n=this;1===this.pageNum&&t.showLoading({mask:!0}),h.jobList(this.pageNum,this.pageSize,this.keyword,this.label).then(function(o){t.hideLoading(),t.stopPullDownRefresh();var i=o.data,a=i.code,r=i.message,c=i.data;"0"===a?(1===e.pageNum?n.postList=c.list:n.postList=[].concat(s(n.postList),s(c.list)),n.postList.length===c.total&&(n.hasEnd=!0)):t.showToast({icon:"none",title:r})}).catch(function(e){t.hideLoading(),t.stopPullDownRefresh(),t.showToast({icon:"none",title:"获取岗位列表信息失败"})})},refresh:function(){this.pageNum=1,this.hasEnd=!1,this.label="",this.getJobList()},getNext:function(){this.hasEnd||(this.pageNum+=1,this.getJobList())},showDetail:function(e){var n=this;t.checkSession({success:function(o){var i=t.getStorageSync("token"),a=t.getStorageSync("isLogin"),s=t.getStorageSync("isRegister");i&&0===a&&0===s?t.navigateTo({url:"../../public/PostDetail/PostDetail?id="+e}):n.selectLoginType()},fail:function(t){n.selectLoginType()}})},switchToSeller:function(){t.showLoading({mask:!0}),f.loginForB().then(function(e){t.hideLoading();var n=e.data,o=n.code,i=(n.message,n.data);"0"===o?(t.setStorageSync("token",i.token),t.setStorageSync("loginType","B"),t.reLaunch({url:"../../seller/main/main"})):t.showModal({title:"",content:"当前账号尚未注册企业号!\r\n是否注册？",confirmText:"立即注册",cancelText:"算了吧",confirmColor:"#ff9058",cancelColor:"#ff9058",success:function(e){e.confirm&&t.navigateTo({url:"../../user/register-seller/register-seller"})}})}).catch(function(e){t.hideLoading(),t.showToast({icon:"none",title:"获取企业信息失败"})})},switchLabel:function(t){this.label=t,this.pageNum=1,this.hasEnd=!1,this.getJobList()},selectLoginType:function(){this.$emit("showLogin")}}};e.default=d}).call(this,n("543d")["default"])},3778:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},e9c5:function(t,e,n){"use strict";n.r(e);var o=n("3778"),i=n("ee02");for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);n("6fce");var s=n("2877"),r=Object(s["a"])(i["default"],o["a"],o["b"],!1,null,null,null);e["default"]=r.exports},ee02:function(t,e,n){"use strict";n.r(e);var o=n("3738"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/customer/home/home-create-component',
    {
        'pages/customer/home/home-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e9c5"))
        })
    },
    [['pages/customer/home/home-create-component']]
]);                
