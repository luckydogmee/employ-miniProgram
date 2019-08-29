<template>
 <view class="search-container">
  <view class="search">
   <input type="text" v-model="keyword" placeholder="请输入姓名或手机号搜索" @input="handleInput" />
   <button @click="handleSearch">搜索</button>
  </view>
 </view>
</template>

<script>
 export default {
  data(){
   return {
    keyword:''
   }
  },
  methods:{
   handleSearch(){
    // 此处做防抖
    this.$emit('on-search', this.keyword)
   },
   handleInput(){
    this.$emit('on-input', this.keyword)
   }
  }
 }
</script>

<style lang="scss">
 .search-container{
  background: #efeff4;
  height: 150upx;
  width: 750upx;
  display: flex;
  justify-content: center;
  align-items: center;
  .search{
   height: 62upx;
   width: 628upx;
   background: url(../../static/icon/resume-search.png) no-repeat;
   background-size: 100% 100%;
   display: flex;
   justify-content: center;
   align-items: center;
  }
  input{
   background: rgba(0,0,0,0);
   width: 400upx;
   height: 60upx;
   margin-left: 100upx;
   font-size: 26upx;
   color: #595959;
  }
  button{
   background: rgba(0,0,0,0);
   width: 90upx;
   height: 50upx;
   line-height: 50upx;
   margin-left: 38upx;
   font-size: 30upx;
   padding: unset;
   color: #fff;
   &:after{
    border:none;
   }
  }
 }
</style>