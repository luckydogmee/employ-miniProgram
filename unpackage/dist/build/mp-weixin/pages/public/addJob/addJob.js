(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/public/addJob/addJob"],{2436:function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},i=[];o.d(t,"a",function(){return n}),o.d(t,"b",function(){return i})},"33ea":function(e,t,o){"use strict";(function(e){o("1833");n(o("66fd"));var t=n(o("4680"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("543d")["createPage"])},"41d8":function(e,t,o){"use strict";var n=o("f703"),i=o.n(n);i.a},4680:function(e,t,o){"use strict";o.r(t);var n=o("2436"),i=o("b359");for(var a in i)"default"!==a&&function(e){o.d(t,e,function(){return i[e]})}(a);o("41d8");var r=o("2877"),s=Object(r["a"])(i["default"],n["a"],n["b"],!1,null,null,null);t["default"]=s.exports},b359:function(e,t,o){"use strict";o.r(t);var n=o("f569"),i=o.n(n);for(var a in n)"default"!==a&&function(e){o.d(t,e,function(){return n[e]})}(a);t["default"]=i.a},f569:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(o("58f9"));function i(e){return e&&e.__esModule?e:{default:e}}function a(e){return u(e)||s(e)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function s(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function u(e){if(Array.isArray(e)){for(var t=0,o=new Array(e.length);t<e.length;t++)o[t]=e[t];return o}}var c=function(){return o.e("components/InputCell/InputCell").then(o.bind(null,"0972"))},l=function(){return Promise.all([o.e("common/vendor"),o.e("components/QuShe-picker/QuShe-picker")]).then(o.bind(null,"a86c"))},f=new n.default,h={data:function(){return{isEdit:!0,job:{id:"",jobName:"",description:"",num:"",minAge:"",maxAge:"",educationDegree:"",workExperience:"",probation:1,trialTime:"",trialSalary:"",officialSalary:"",interviewTime:"",avgSalary:"",reward:"",overtime:"",totalAmount:0},educationDegreeArray:["高中以下","高中","大专","本科及以上"],workExperienceArray:["一年以下","一年至三年","三年至五年","五年以上"],overtimeArray:["7天","15天","30天"],trialTimeArray:["一个月","两个月","三个月"],ageData:{}}},components:{InputCell:c,QSpicker:l},onLoad:function(e){"false"===e.isEdit&&(this.isEdit=!1),"true"===e.isEdit&&(this.isEdit=!0);var t=this.renderAge(),o=this.renderAge2();this.ageData={itemObject:{step_1:t,step_2:o},steps:{step_1_value:"name",step_2_value:"name"},defaultValue:[0,0],linkageNum:2,linkage:!0},e.id&&(this.job.id=e.id,this.getJobInfo())},computed:{educationDegreeText:function(){return this.educationDegreeArray[this.job.educationDegree]||""},workExperienceText:function(){return this.workExperienceArray[this.job.workExperience]||""},overtimeText:function(){return this.overtimeArray[this.job.overtime]||""}},methods:{getJobInfo:function(){var t=this;e.showLoading({mask:!0}),f.jobDetail(this.job.id).then(function(o){e.hideLoading();var n=o.data,i=n.code,a=n.data,r=n.message;"0"===i?t.job=a:e.showToast({icon:"none",title:r})}).catch(function(t){e.hideLoading(),e.showToast({icon:"none",title:"获取岗位详情失败"})})},jobNameChanged:function(e){this.job.jobName=e},numChanged:function(e){this.job.num=e,this.job.num&&this.job.reward&&(this.job.totalAmount=Number(this.job.num)*Number(this.job.reward))},educationDegreeChange:function(e){this.job.educationDegree=e.target.value},workExperienceChange:function(e){this.job.workExperience=e.target.value},overtimeChanged:function(e){this.job.overtime=e.target.value},probationChanged:function(e){this.job.probation=e},trialTimeChanged:function(e){this.job.trialTime=this.trialTimeArray[e.target.value]},trialSalaryChanged:function(e){this.job.trialSalary=e},officialSalaryChanged:function(e){this.job.officialSalary=e},avgSalaryChanged:function(e){this.job.avgSalary=e},interviewTimeChanged:function(e){this.job.interviewTime=e},rewardChanged:function(e){this.job.reward=e,this.job.num&&this.job.reward&&(this.job.totalAmount=Number(this.job.num)*Number(this.job.reward))},showNotice:function(){this.job.reward<300&&e.showToast({icon:"none",duration:"5000",title:"金额低于300无法保证招聘效率哦"})},saveJob:function(){var t=this;if(""!==t.job.jobName)if(""!==t.job.description)if(""!==t.job.num)if(""!==t.job.educationDegree)if(""!==t.job.workExperience)if(""!==t.job.minAge)if(""!==t.job.maxAge)if(""!==t.job.probation)if(t.job.probation&&""===t.job.trialTime)t.showMessage("试用时间不能为空！");else if(t.job.probation&&""===t.job.trialSalary)t.showMessage("试用薪资不能为空！");else if(""!==t.job.officialSalary)if(""!==t.job.avgSalary)if(""!==t.job.interviewTime)if(""!==t.job.reward)if(""!==t.job.overtime)if(""!==t.job.totalAmount){e.showLoading({title:"提交中..."});var o=Object.values(this.job);f.saveJob.apply(f,a(o)).then(function(o){e.hideLoading();var n=o.data,i=n.code,a=n.message;n.data;"0"===i?(e.showToast({title:"创建成功"}),setTimeout(function(){e.redirectTo({url:"../addJobSuccess/addJobSuccess?amount="+t.job.totalAmount})},2e3)):(e.hideLoading(),e.showToast({icon:"none",title:a}))}).catch(function(t){e.showToast({icon:"none",title:"提交失败，请稍候再试"})})}else t.showMessage("履约金不能为空！");else t.showMessage("过保时间不能为空！");else t.showMessage("岗位赏金不能为空！");else t.showMessage("可面试时间不能为空！");else t.showMessage("平均薪资不能为空！");else t.showMessage("转正薪资不能为空！");else t.showMessage("试用期不能为空！");else t.showMessage("最大年龄不能为空！");else t.showMessage("最小年龄不能为空！");else t.showMessage("工作经验不能为空！");else t.showMessage("教育程度不能为空！");else t.showMessage("招聘人数不能为空！");else t.showMessage("岗位描述不能为空！");else t.showMessage("岗位名称不能为空！")},renderAge:function(){for(var e=[],t=18;t<100;t++)e.push({name:t,value:t});return e},renderAge2:function(){for(var e=[],t=18;t<100;t++){for(var o=[],n=t+1;n<100;n++)o.push({name:n,value:n});e.push(o)}return e},changeShow:function(e){this.$refs[e].show()},showMessage:function(t){e.showToast({title:t,icon:"none"})},hidePickAge:function(){},showPickAge:function(){},confirmAge:function(e){this.job.minAge=this.ageData.itemObject.step_1[e.value[0]].name,this.job.maxAge=this.ageData.itemObject.step_2[e.value[1]][e.value[0]].name}}};t.default=h}).call(this,o("543d")["default"])},f703:function(e,t,o){}},[["33ea","common/runtime","common/vendor"]]]);