(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/user/register-seller/register-seller"],{

/***/ 126:
/*!***********************************************************************************************************!*\
  !*** E:/workspace/employ-miniProgram/main.js?{"page":"pages%2Fuser%2Fregister-seller%2Fregister-seller"} ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _registerSeller = _interopRequireDefault(__webpack_require__(/*! ./pages/user/register-seller/register-seller.vue */ 127));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_registerSeller.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 127:
/*!**************************************************************************************!*\
  !*** E:/workspace/employ-miniProgram/pages/user/register-seller/register-seller.vue ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _register_seller_vue_vue_type_template_id_4181d045___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register-seller.vue?vue&type=template&id=4181d045& */ 128);
/* harmony import */ var _register_seller_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register-seller.vue?vue&type=script&lang=js& */ 130);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _register_seller_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _register_seller_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _register_seller_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register-seller.vue?vue&type=style&index=0&lang=scss& */ 133);
/* harmony import */ var _D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 15);






/* normalize component */

var component = Object(_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _register_seller_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _register_seller_vue_vue_type_template_id_4181d045___WEBPACK_IMPORTED_MODULE_0__["render"],
  _register_seller_vue_vue_type_template_id_4181d045___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "E:/workspace/employ-miniProgram/pages/user/register-seller/register-seller.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 128:
/*!*********************************************************************************************************************!*\
  !*** E:/workspace/employ-miniProgram/pages/user/register-seller/register-seller.vue?vue&type=template&id=4181d045& ***!
  \*********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_template_id_4181d045___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./register-seller.vue?vue&type=template&id=4181d045& */ 129);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_template_id_4181d045___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_template_id_4181d045___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 129:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/workspace/employ-miniProgram/pages/user/register-seller/register-seller.vue?vue&type=template&id=4181d045& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 130:
/*!***************************************************************************************************************!*\
  !*** E:/workspace/employ-miniProgram/pages/user/register-seller/register-seller.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_work_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./register-seller.vue?vue&type=script&lang=js& */ 131);
/* harmony import */ var _D_work_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_work_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_work_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_work_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_work_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 131:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/workspace/employ-miniProgram/pages/user/register-seller/register-seller.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;






















































































var _user = _interopRequireDefault(__webpack_require__(/*! @/models/user.js */ 24));
var _store = _interopRequireDefault(__webpack_require__(/*! @/models/store.js */ 132));
var _job = _interopRequireDefault(__webpack_require__(/*! @/models/job.js */ 47));
var _config = __webpack_require__(/*! ../../../config.js */ 26);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}var InputCell = function InputCell() {return __webpack_require__.e(/*! import() | components/InputCell/InputCell */ "components/InputCell/InputCell").then(__webpack_require__.bind(null, /*! @/components/InputCell/InputCell.vue */ 267));};var UploadItem = function UploadItem() {return __webpack_require__.e(/*! import() | components/UploadItem/UploadItem */ "components/UploadItem/UploadItem").then(__webpack_require__.bind(null, /*! @/components/UploadItem/UploadItem.vue */ 274));};
var userModel = new _user.default();
var storeModel = new _store.default();
var jobModel = new _job.default();var _default =
{
  data: function data() {
    return {
      isEdit: true, // 是否编辑状态
      isModify: false,
      resume: {
        id: '',
        name: '', // 公司名称
        cityCode: '', // 城市码
        address: '', // 地址
        industryCode: '', // 所在行业
        contactName: '', // 招聘联系人
        businessImg: '', // 营业执照
        companyImg: '', // 工作场景
        logo: '', // 公司logo
        phone: '', // 电话号码
        avatar: '' },

      avatar: '../../../static/icon/add-avatar.png',
      avatarChanged: false,
      uploadedAvatar: '',
      businessImgChanged: false,
      companyImgChanged: false,
      logoChanged: false,
      imageChanged: false,
      pictureIndex: 0,
      verifyText: '发送验证码',
      verifyCode: '',
      cityCodeText: '', // 区域文字
      citySelected: ['510000', '', ''], // 已选中的城市
      readySendCode: true,
      surplusSecond: 0,
      verifyCodeTimer: null,
      industryArrayObject: [] };

  },
  components: {
    InputCell: InputCell,
    UploadItem: UploadItem },

  computed: {
    industryText: function industryText() {var _this = this;
      var text = '';
      this.industryArrayObject.forEach(function (item) {
        if (item.code === _this.resume.industryCode) {
          text = item.name;
        }
      });
      return text;
    },
    industryArray: function industryArray() {
      var tempArray = [];
      this.industryArrayObject.forEach(function (item) {
        tempArray.push(item.name);
      });
      return tempArray;
    } },

  onLoad: function onLoad(options) {
    if (options.isEdit === 'false') {
      this.isEdit = false;
    }
    if (options.isEdit === 'true') {
      this.isEdit = true;
    }
    this.getIndustry();
    if (options.isModify == 1) {
      this.isModify = true;
      this.btnText = '提交修改';
      this.getUserInfo();
    }
  },
  methods: {
    getUserInfo: function getUserInfo() {
      jobModel.getIndustry().then(function (res) {var _res$data =
        res.data,code = _res$data.code,message = _res$data.message,data = _res$data.data;
        if (code === '0') {
          // 单独写了页面，此处废弃
        }
      });
    },
    getIndustry: function getIndustry() {var _this2 = this;
      jobModel.getIndustry().then(function (res) {var _res$data2 =
        res.data,code = _res$data2.code,message = _res$data2.message,data = _res$data2.data;
        if (code === '0') {
          _this2.industryArrayObject = data;
        } else {
          uni.showToast({
            icon: 'none',
            title: message });

        }
      }).catch(function (err) {
        uni.showToast({
          icon: 'none',
          title: '获取行业信息失败' });

      });
    },
    industryChange: function industryChange(e) {
      this.resume.industryCode = this.industryArrayObject[e.target.value].code;
    },
    cityPickerChange: function cityPickerChange(e) {var _e$detail =
      e.detail,code = _e$detail.code,value = _e$detail.value;
      this.resume.cityCode = code.join(',');
      this.cityCodeText = Array.from(new Set(value)).join('-');
    },
    chooseAvatar: function chooseAvatar() {
      var that = this;
      uni.chooseImage({
        count: 1,
        sizeType: 'compressed',
        sourceType: ['album', 'camera'],
        success: function success(res) {
          that.avatar = res.tempFilePaths[0];
          // 这里考虑到可能上传头像地址不同
          // that.uploadAvatar(res.tempFilePaths[0],)
          that.getImageWebUrl(res.tempFilePaths[0], 'avatar');
        } });

    },
    chooseBusinessImg: function chooseBusinessImg() {
      var that = this;
      uni.chooseImage({
        count: 1,
        sizeType: 'compressed',
        sourceType: ['album', 'camera'],
        success: function success(res) {
          that.resume.businessImg = res.tempFilePaths[0];
          that.getImageWebUrl(res.tempFilePaths[0], 'businessImg');
        } });

    },
    chooseLogo: function chooseLogo() {
      var that = this;
      uni.chooseImage({
        count: 1,
        sizeType: 'compressed',
        sourceType: ['album', 'camera'],
        success: function success(res) {
          that.resume.logo = res.tempFilePaths[0];
          that.getImageWebUrl(res.tempFilePaths[0], 'logo');
        } });

    },
    chooseCompanyImg: function chooseCompanyImg() {
      var that = this;
      uni.chooseImage({
        count: 1,
        sizeType: 'compressed',
        sourceType: ['album', 'camera'],
        success: function success(res) {
          that.companyImg = res.tempFilePaths[0];
          that.getImageWebUrl(res.tempFilePaths[0], 'companyImg');
        } });

    },
    sendVerifyCode: function sendVerifyCode() {var _this3 = this;
      if (!this.readySendCode) {
        return;
      }
      if (!this.resume.phone) {
        uni.showToast({
          icon: 'none',
          title: '请输入电话号码' });

        return;
      }
      uni.showLoading({
        mask: true });

      userModel.getVerifyCode(this.resume.phone, 'B').then(function (res) {
        // 请求成功,并判断code是否正确
        uni.hideLoading();var _res$data3 =
        res.data,code = _res$data3.code,message = _res$data3.message,data = _res$data3.data;
        if (code === '0') {
          uni.showToast({
            title: '验证码已发送，请注意查收' });

          _this3.readySendCode = false;
          _this3.surplusSecond = 60;
          // this.focusIndex = 3
          _this3.verifyCodeTimer = setInterval(function () {
            if (_this3.surplusSecond > 0) {
              _this3.surplusSecond -= 1;
            } else {
              _this3.surplusSecond = 0;
              _this3.readySendCode = true;
              clearInterval(_this3.verifyCodeTimer);
            }
          }, 1000);
          // this.focusIndex = 3	
        } else {
          uni.showToast({
            icon: 'none',
            title: message });

        }

      }).catch(function (err) {
        uni.hideLoading();
        uni.showToast({
          icon: 'none',
          title: '获取验证码失败' });

      });
    },
    postVerifyCode: function postVerifyCode() {
      var that = this;
      uni.showLoading({
        title: '提交中...' });

      userModel.login(this.resume.phone, this.verifyCode, 'B').then(function (res) {var _res$data4 =
        res.data,code = _res$data4.code,message = _res$data4.message,data = _res$data4.data;
        if (code === '0') {
          uni.setStorageSync('token', data.token);
          uni.setStorageSync('loginType', 'B');
          uni.setStorageSync('isLogin', 0);
          that.saveStore();
        } else {
          uni.hideLoading();
          uni.showToast({
            icon: 'none',
            title: message });

        }
      }).catch(function (res) {
        uni.hideLoading();
        uni.showToast({
          icon: 'none',
          title: '验证失败，请稍后再试' });

      });
    },
    saveStore: function saveStore() {var _this4 = this;
      var that = this;
      var array = Object.values(this.resume);
      array.push(this.avatar);
      storeModel.saveStore.apply(storeModel, _toConsumableArray(array)).then(function (res) {var _res$data5 =
        res.data,code = _res$data5.code,message = _res$data5.message,data = _res$data5.data;
        if (code === '0') {
          uni.hideLoading();
          if (!_this4.resume.id) {
            that.hasToken = true;
            uni.showModal({
              title: '',
              content: '注册成功!',
              showCancel: false,
              confirmText: '去企业端',
              success: function success(res) {
                uni.reLaunch({
                  url: '../../seller/main/main' });

              } });

          } else {
            uni.showToast({
              title: '修改成功' });

            setTimeout(function () {
              uni.navigateBack({
                delta: 1 });

            }, 2000);
          }
        } else {
          uni.hideLoading();
          // 错误处理
          uni.showToast({
            icon: 'none',
            title: message });

        }
      }).catch(function (err) {
        uni.showToast({
          icon: 'none',
          title: '提交失败，请稍候再试' });

      });

    },
    nameChanged: function nameChanged(value) {
      this.resume.name = value;
    },
    cityChanged: function cityChanged(value) {
      this.resume.cityCode = value;
    },
    addressChanged: function addressChanged(value) {
      this.resume.address = value;
    },
    industryChanged: function industryChanged(value) {
      this.resume.industryCode = value;
    },
    contactNameChanged: function contactNameChanged(value) {
      this.resume.contactName = value;
    },
    phoneChanged: function phoneChanged(value) {
      this.resume.phone = value;
    },
    verifyCodeChanged: function verifyCodeChanged(value) {
      this.verifyCode = value;
    },
    getImageWebUrl: function getImageWebUrl(path, name) {
      var that = this;
      uni.showLoading({
        title: '上传中，请稍候...' });

      uni.uploadFile({
        url: _config.config.base_url + '/store/getImageWebUrl',
        filePath: path,
        name: 'file',
        success: function success(res) {
          // 这里返回图片的url地址 response.data.url
          uni.hideLoading();
          var response = res.data;
          if (typeof response === 'string') {
            response = JSON.parse(response);
          }var _response =
          response,code = _response.code,message = _response.message,data = _response.data;
          if (code === '0') {
            uni.showToast({
              title: '上传成功' });

            that.imageChanged = true;
            that.resume[name] = data.url;
            console.log();
          } else {
            uni.showToast({
              icon: 'none',
              title: message });

          }

        },
        fail: function fail(res) {
          uni.showToast({
            icon: 'none',
            title: '上传失败，请稍候再试' });

        } });

    },
    uploadAvatar: function uploadAvatar(path) {
      var that = this;
      uni.showLoading({
        title: '上传中，请稍候...' });

      uni.uploadFile({
        // 这里修改上传地址
        url: _config.config.base_url + '/store/getImageWebUrl',
        filePath: path,
        name: 'file',
        success: function success(res) {
          uni.hideLoading();
          var response = res.data;
          if (typeof response === 'string') {
            response = JSON.parse(response);
          }var _response2 =
          response,code = _response2.code,message = _response2.message,data = _response2.data;
          if (code === '0') {
            uni.showToast({
              title: '上传成功' });

            that.avatarChanged = true;
            that.uploadedAvatar = data.url;
          } else {
            uni.showToast({
              icon: 'none',
              title: message });

          }
        },
        fail: function fail(res) {
          uni.showToast({
            icon: 'none',
            title: '上传失败，请稍候再试' });

        } });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 133:
/*!************************************************************************************************************************!*\
  !*** E:/workspace/employ-miniProgram/pages/user/register-seller/register-seller.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_work_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_work_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./register-seller.vue?vue&type=style&index=0&lang=scss& */ 134);
/* harmony import */ var _D_work_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_work_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_work_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_work_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_work_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_work_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_work_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_work_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_work_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_work_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_work_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_work_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_work_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_register_seller_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 134:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/workspace/employ-miniProgram/pages/user/register-seller/register-seller.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[126,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/register-seller/register-seller.js.map