(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"0615":function(n,t,o){"use strict";o.r(t);var e=o("d4e4"),i=o.n(e);for(var r in e)"default"!==r&&function(n){o.d(t,n,function(){return e[n]})}(r);t["default"]=i.a},a014:function(n,t,o){},a417:function(n,t,o){"use strict";o.r(t);var e=o("ab47"),i=o("0615");for(var r in i)"default"!==r&&function(n){o.d(t,n,function(){return i[n]})}(r);o("dfbc");var c=o("2877"),u=Object(c["a"])(i["default"],e["a"],e["b"],!1,null,null,null);t["default"]=u.exports},ab47:function(n,t,o){"use strict";var e=function(){var n=this,t=n.$createElement;n._self._c},i=[];o.d(t,"a",function(){return e}),o.d(t,"b",function(){return i})},d4e4:function(n,t,o){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=r(o("ea1b")),i=o("2f62");function r(n){return n&&n.__esModule?n:{default:n}}function c(n){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},e=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(o).filter(function(n){return Object.getOwnPropertyDescriptor(o,n).enumerable}))),e.forEach(function(t){u(n,t,o[t])})}return n}function u(n,t,o){return t in n?Object.defineProperty(n,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[t]=o,n}var s=function(){return o.e("components/m-input").then(o.bind(null,"1c66"))},a={components:{mInput:s},data:function(){return{providerList:[],hasProvider:!1,account:"",password:"",positionTop:0}},computed:(0,i.mapState)(["forcedLogin"]),methods:c({},(0,i.mapMutations)(["login"]),{initProvider:function(){var t=this,o=["weixin","qq","sinaweibo"];n.getProvider({service:"oauth",success:function(n){if(n.provider&&n.provider.length){for(var e=0;e<n.provider.length;e++)~o.indexOf(n.provider[e])&&t.providerList.push({value:n.provider[e],image:"../../static/img/"+n.provider[e]+".png"});t.hasProvider=!0}console.log(t.providerList)},fail:function(n){console.error("获取服务供应商失败："+JSON.stringify(n))}})},initPosition:function(){this.positionTop=n.getSystemInfoSync().windowHeight-100},bindLogin:function(){if(this.account.length<5)n.showToast({icon:"none",title:"账号最短为 5 个字符"});else if(this.password.length<6)n.showToast({icon:"none",title:"密码最短为 6 个字符"});else{var t={account:this.account,password:this.password},o=e.default.getUsers().some(function(n){return t.account===n.account&&t.password===n.password});o?this.toMain(this.account):n.showToast({icon:"none",title:"用户账号或密码不正确"})}},oauth:function(t){var o=this;n.login({provider:t,success:function(e){n.getUserInfo({provider:t,success:function(n){o.toMain(n.userInfo.nickName)}})},fail:function(n){console.error("授权登录失败："+JSON.stringify(n))}})},toMain:function(t){this.login(t),this.forcedLogin,n.reLaunch({url:"../main/main"})}}),onReady:function(){this.initPosition(),this.initProvider()}};t.default=a}).call(this,o("543d")["default"])},dfbc:function(n,t,o){"use strict";var e=o("a014"),i=o.n(e);i.a}},[["24b6","common/runtime","common/vendor"]]]);