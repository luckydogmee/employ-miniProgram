(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/customer/main/main"],{"0528":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},1600:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("2f62"),i=u(n("e909")),s=u(n("2a37")),a=u(n("5f9a")),r=u(n("d338"));function u(t){return t&&t.__esModule?t:{default:t}}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){f(t,e,n[e])})}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var d=function(){return n.e("components/TabBar/TabBar").then(n.bind(null,"cf31"))},l=function(){return Promise.all([n.e("common/vendor"),n.e("pages/customer/home/home")]).then(n.bind(null,"e9c5"))},h=function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"8bf9"))},m=new r.default,g={data:function(){return{tabBar:["Home","Project","Resume","User"],hasToken:!1}},components:{TabBar:d,Home:l,Project:i.default,Resume:s.default,User:a.default,uniPopup:h},onReady:function(){var e=this,n=t.getStorageSync("token");t.checkSession({success:function(t){n?e.hasToken=!0:e.login()},fail:function(t){e.login()}})},onPullDownRefresh:function(){0===this.tabIndex&&this.$refs.home.refresh(),1===this.tabIndex&&this.$refs.project.refresh(),2===this.tabIndex&&this.$refs.resume.refresh()},onReachBottom:function(){0===this.tabIndex&&this.$refs.home.getNext(),1===this.tabIndex&&this.$refs.project.getNext(),2===this.tabIndex&&this.$refs.resume.getNext()},onShow:function(){2===this.tabIndex&&this.$refs.resume.refresh()},computed:c({},(0,o.mapState)(["tabIndex"]),{currentTab:function(){return this.tabBar[this.tabIndex]}}),methods:c({},(0,o.mapMutations)(["switchTab"]),{switchTabBar:function(t){this.switchTab({index:t})},login:function(){var e=this;t.showLoading({mask:!0}),t.login({provider:"weixin",success:function(n){"login:ok"===n.errMsg?m.wxLogin(n.code).then(function(n){var o=n.data,i=o.code,s=o.message,a=o.data;"0"===i?(t.setStorageSync("token",a.token),t.setStorageSync("isLogin",a.isLogin),t.setStorageSync("isRegister",a.isRegister),t.setStorageSync("loginType",""),t.hideLoading(),e.hasToken=!0):t.showToast({icon:"none",title:s})}):t.showToast({icon:"none",title:n.errMeg})},fail:function(t){console.log(t)}})},showLogin:function(){this.$refs.noticeLogin.open()},hideLogin:function(){this.$refs.noticeLogin.close()},completeInfo:function(){t.navigateTo({url:"../../user/inputInfo/inputInfo"})},getPhoneNumber:function(e){var n=e.detail,o=n.iv,i=n.encryptedData,s=n.errMsg,a=this;"getPhoneNumber:ok"===s?t.checkSession({success:function(e){"checkSession:ok"===e.errMsg?(t.showLoading({title:"登录中，请稍候"}),m.getBindPhoneNumber(i,o).then(function(e){var n=e.data,o=n.code,i=n.data;n.message;"0"===o?(t.setStorageSync("phoneNumber",i),a.fastLogin(i)):(t.hideLoading(),t.showToast({icon:"none",title:"登录失败，请重新授权"}))})):(t.hideLoading(),t.showToast({icon:"none",title:"获取code失败"}))},fail:function(t){console.log(t)}}):t.showToast({icon:"none",title:"授权失败，请重新授权"})},fastLogin:function(e){var n=this;m.fastLogin(e).then(function(o){t.hideLoading();var i=o.data,s=i.code,a=i.data,r=i.message;"0"===s?(n.hideLogin(),t.setStorageSync("isLogin",0),t.setStorageSync("userType",a.type),"0"===a.isRegister?(t.setStorageSync("isRegister",0),t.showToast({title:"登录成功"})):t.navigateTo({url:"../../user/register/register?phone="+e})):t.showToast({icon:"none",title:r})}).catch(function(e){t.showToast({icon:"none",title:"登录失败，请稍候重试"})})},toLogin:function(){t.navigateTo({url:"../../user/login/login"})}})};e.default=g}).call(this,n("543d")["default"])},"21be":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},2845:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},"2a37":function(t,e,n){"use strict";n.r(e);var o=n("0528"),i=n("86b3");for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n("42d8");var a=n("2877"),r=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,null,null);e["default"]=r.exports},"2c67":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("2f62"),i=s(n("27e1"));n("3c2a");function s(t){return t&&t.__esModule?t:{default:t}}function a(t){return c(t)||u(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function c(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){d(t,e,n[e])})}return t}function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l=function(){return n.e("components/ListResume/ListResume").then(n.bind(null,"8929"))},h=function(){return n.e("components/h-timePicker/h-timePicker").then(n.bind(null,"0749"))},m=function(){return n.e("components/Search/Search").then(n.bind(null,"ee79"))},g=function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"8bf9"))},p=function(){return n.e("components/Dialog/Dialog").then(n.bind(null,"e8b7"))},b=new i.default,v={data:function(){return{resumeList:[],type:"all",pageNum:1,pageSize:10,hasEnd:!1,showDialog:!1,recommendRecord:[],resumeId:"",date:"",formId:"",keyWord:""}},components:{ListResume:l,Search:m,uniPopup:g,Dialog:p,hTimePicker:h},computed:f({},(0,o.mapState)(["currentResume","jobId"])),mounted:function(){this.getResumeList()},methods:f({},(0,o.mapMutations)(["switchTab"]),{search:function(t){this.keyWord=t,this.getResumeList()},getResumeList:function(){var e=this.type,n=this,o="";"started"===e?o=1:"notStart"===e&&(o=0),1===this.pageNum&&t.showLoading({mask:!0}),1===this.pageSize&&(this.pageSize=10),b.resumeList(this.pageNum,this.pageSize,o,this.keyWord).then(function(e){t.hideLoading(),t.stopPullDownRefresh();var o=e.data,i=o.code,s=o.message,r=o.data;"0"===i?(1===n.pageNum?n.resumeList=r.list:n.resumeList=[].concat(a(n.resumeList),a(r.list)),n.resumeList.length===r.total&&(n.hasEnd=!0)):t.showToast({icon:"none",title:s})}).catch(function(e){t.hideLoading(),t.stopPullDownRefresh(),t.showToast({icon:"none",title:"获取简历信息失败"})})},refresh:function(){this.pageSize=1,this.hasEnd=!1,this.getResumeList()},getNext:function(){this.hasEnd||(this.pageNum+=1,this.getResumeList())},switchResumeTab:function(t){t!==this.type&&(this.type=t,this.pageNum=1,this.hasEnd=!1,this.getResumeList())},showRecord:function(e){var n=this;t.showLoading({mask:!0}),b.resumeRecord(this.pageSize,this.pageNum,e).then(function(e){t.hideLoading(),n.$refs.recommendRecord.open();var o=e.data,i=o.code,s=o.message,a=o.data;"0"===i?n.recommendRecord=a:t.showToast({icon:"none",title:s})}).catch(function(e){t.showToast({icon:"none",title:"获取推荐记录失败"})})},closeRecommendDialog:function(){this.$refs.recommendRecord.close()},showDetail:function(e){t.navigateTo({url:"../../public/addResume/addResume?isEdit=true&id="+e,success:function(){t.setNavigationBarTitle({title:"简历详情"})}})},recommendHim:function(t){var e=this.jobId;this.resumeId=t,e?this.$refs.selectDate.open():this.switchTab({index:1,resumeId:this.resumeId})},callHim:function(e){var n=e.phone;t.makePhoneCall({phoneNumber:n})},pushResume:function(){var e=this,n=this.jobId,o=this.resumeId,i=this.date,s=this.formId;t.showLoading({title:"提交中..."}),b.pushResume(n,o,i,s).then(function(n){var o=n.data,i=o.code,s=o.message;o.data;e.formId="",t.hideLoading(),"0"===i?(e.$refs.selectDate.close(),t.showModal({title:"",content:"推荐成功!\r\n您可在“我的项目”栏目查看该人员的面试、入职流程",showCancel:!1,confirmText:"知道了",success:function(t){}})):t.showToast({icon:"none",title:s})}).catch(function(n){e.formId="",t.hideLoading(),t.showToast({icon:"none",title:"推送失败"})})},cancelPush:function(){this.$refs.selectDate.close()},showAddResume:function(){t.navigateTo({url:"../../public/addResume/addResume?isEdit=true",success:function(t){},fail:function(){},complete:function(){}})},bindTimeChange:function(t){this.date=t},getFormId:function(t){this.formId=t.detail.formId}})};e.default=v}).call(this,n("543d")["default"])},"2e2f":function(t,e,n){"use strict";n.r(e);var o=n("d4f3"),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);e["default"]=i.a},"2ecb":function(t,e,n){"use strict";n.r(e);var o=n("2845"),i=n("c6c9");for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n("7f4c");var a=n("2877"),r=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,null,null);e["default"]=r.exports},"3f2b":function(t,e,n){},"42d8":function(t,e,n){"use strict";var o=n("3f2b"),i=n.n(o);i.a},"58d8":function(t,e,n){},"5f9a":function(t,e,n){"use strict";n.r(e);var o=n("21be"),i=n("2e2f");for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n("67f5");var a=n("2877"),r=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,null,null);e["default"]=r.exports},"65eb":function(t,e,n){"use strict";n.r(e);var o=n("f108"),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);e["default"]=i.a},"67f5":function(t,e,n){"use strict";var o=n("58d8"),i=n.n(o);i.a},"6c7e":function(t,e,n){},7800:function(t,e,n){"use strict";var o=n("6c7e"),i=n.n(o);i.a},"86b3":function(t,e,n){"use strict";n.r(e);var o=n("2c67"),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);e["default"]=i.a},ad87:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},c6c9:function(t,e,n){"use strict";n.r(e);var o=n("1600"),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);e["default"]=i.a},d4f3:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("d338"));function i(t){return t&&t.__esModule?t:{default:t}}var s=function(){return n.e("components/UserItem/UserItem").then(n.bind(null,"e4a7"))},a=function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"8bf9"))},r=new o.default,u={data:function(){return{userData:{},user:{},dialogActive:0,cashoutList:[]}},components:{UserItem:s,uniPopup:a},mounted:function(){this.getUserInfo()},methods:{getUserInfo:function(){var e=this;t.showLoading(),r.getUserInfo().then(function(n){t.hideLoading();var o=n.data,i=o.code,s=o.message,a=o.data;"0"===i?(e.user=a,e.userData=a):t.showToast({icon:"none",title:s})}).catch(function(e){t.hideLoading(),t.showToast({icon:"none",title:"获取用户信息失败"})})},setUser:function(){t.navigateTo({url:"../../customer/user/detail"})},switchItem:function(t){this.dialogActive=t,0==this.dialogActive?this.getCashoutList():this.getCashoutRecord()},getCashoutList:function(){this.$refs.recommendRecord.open()},closeCashoutDialog:function(){this.$refs.recommendRecord.close()},cancelCashOut:function(){this.closeCashoutDialog()},cashOut:function(){var e=this;this.cashoutList.length>0?(t.showLoading({title:"请稍等..."}),r.cashout().then(function(n){t.hideLoading();var o=n.data,i=o.code,s=o.message;o.data;"0"===i?(e.closeCashoutDialog(),t.showModal({title:"",content:"提现申请提交成功!\r\n我们将在三个工作日内与您联系，并汇款到您的账户。",showCancel:!1,confirmText:"好的",success:function(t){}})):t.showToast({icon:"none",title:s})}).catch(function(e){t.hideLoading(),t.showToast({icon:"none",title:"提现失败，请稍后再试"})})):t.showToast({icon:"none",title:"当前没有可提现"})},getCashoutRecord:function(){var e=this;t.showLoading({title:"正在获取..."}),this.cashoutList=[],r.getCashoutList().then(function(n){t.hideLoading();var o=n.data,i=o.code,s=o.message,a=o.data;"0"===i?(e.cashoutList=a.list,e.$refs.recommendRecord.open()):t.showToast({icon:"none",title:s})}).catch(function(e){t.hideLoading(),t.showToast({icon:"none",title:"获取提现记录失败"})})}}};e.default=u}).call(this,n("543d")["default"])},e7be:function(t,e,n){"use strict";(function(t){n("1833"),n("921b");o(n("66fd"));var e=o(n("2ecb"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},e909:function(t,e,n){"use strict";n.r(e);var o=n("ad87"),i=n("65eb");for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n("7800");var a=n("2877"),r=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,null,null);e["default"]=r.exports},f108:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("2f62"),i=(n("3c2a"),a(n("58f9"))),s=a(n("27e1"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t){return f(t)||c(t)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function c(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function f(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){l(t,e,n[e])})}return t}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var h=function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"8bf9"))},m=function(){return n.e("components/h-timePicker/h-timePicker").then(n.bind(null,"0749"))},g=function(){return n.e("components/ListProject/ListProject").then(n.bind(null,"62bb"))},p=new s.default,b=new i.default,v={data:function(){return{projectList:[],type:"all",pageNum:1,pageSize:10,hasEnd:!1,jobId:"",date:"",formId:""}},computed:d({},(0,o.mapState)(["resumeId"])),mounted:function(){this.getJobList()},components:{ListProject:g,uniPopup:h,hTimePicker:m},methods:d({},(0,o.mapMutations)(["switchTab"]),{getJobList:function(){var e=this.type,n=this,o="";"started"===e?o=1:"notStart"===e&&(o=0),1===this.pageNum&&t.showLoading({mask:!0}),b.collectionJobList(this.pageNum,this.pageSize,o).then(function(e){t.hideLoading(),t.stopPullDownRefresh();var o=e.data,i=o.code,s=o.message,a=o.data;"0"===i?(1===n.pageNum?n.projectList=a.list:n.projectList=[].concat(r(n.projectList),r(a.list)),n.projectList.length===a.total&&(n.hasEnd=!0)):t.showToast({icon:"none",title:s})}).catch(function(e){t.hideLoading(),t.stopPullDownRefresh(),t.showToast({icon:"none",title:"获取岗位列表信息失败"})})},refresh:function(){this.pageNum=1,this.hasEnd=!1,this.getJobList()},getNext:function(){this.hasEnd||(this.pageNum+=1,this.getJobList())},switchProjectTab:function(t){t!==this.type&&(this.type=t,this.pageNum=1,this.hasEnd=!1,this.getJobList())},show:function(t,e){},showDetail:function(e){t.navigateTo({url:"../../public/PostDetail/PostDetail?id="+e})},showDeliveryDetail:function(e){t.navigateTo({url:"../../customer/project/detail?id="+e})},recommend:function(t){this.jobId=t,this.resumeId?this.$refs.selectDate.open():this.switchTab({index:2,jobId:t})},pushResume:function(){var e=this,n=this.jobId,o=this.resumeId,i=this.date,s=this.formId;t.showLoading({mask:!0}),p.pushResume(n,o,i,s).then(function(n){t.hideLoading();var o=n.data,i=o.code,s=o.message;o.data;e.formId="","0"===i?(e.$refs.selectDate.close(),t.showModal({title:"",content:"推荐成功!\r\n您可在“我的项目”栏目查看该人员的面试、入职流程",showCancel:!1,confirmText:"知道了",success:function(t){}})):t.showToast({icon:"none",title:s})}).catch(function(n){e.formId="",t.hideLoading(),t.showToast({icon:"none",title:"推送失败"})})},cancelPush:function(){this.$refs.selectDate.close()},bindTimeChange:function(t){this.date=t}})};e.default=v}).call(this,n("543d")["default"])}},[["e7be","common/runtime","common/vendor"]]]);