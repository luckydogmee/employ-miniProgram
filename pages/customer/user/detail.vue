<template>
	<view class="detail-container">
		<view class="content">
			<view class="form">
				<view class="add-avatar">
					<view class="avatar old-avatar">
						<image :src="userInfo.avatar" mode="" @click="chooseImage"></image>
					</view>
				</view>
				<view class="form-item form-input">
					<view class="sy-label">
						您的姓名
					</view>
					<input class="sy-input" v-model="userInfo.name" maxlength="6" />	
				</view>
				<view class="form-item form-input">
					<view class="sy-label">
						您的年龄
					</view>
					<input class="sy-input" type="number" v-model="userInfo.age" maxlength="3"  />
				</view>
				<view class="form-item form-input">
					<view class="sy-label">
						您的性别
					</view>
					<view class="gender">
						<radio-group @change="radioChange">
							<label class="radio"><radio value="0" :checked="userInfo.gender == 0" color="#ff8352" style="transform:scale(0.7)" />男</label>
							<label class="radio"><radio value="1" :checked="userInfo.gender == 1" color="#ff8352" style="transform:scale(0.7)" />女</label>
						</radio-group>	
					</view>
				</view>
				<view class="form-item form-input">
					<view class="sy-label">
						手机号
					</view>
					<input class="sy-input" disabled="true" type="number" v-model="userInfo.phone" maxlength="15" />
				</view>	
				<view class="form-item">
					<button class="default-btn submit-btn" @click="submit" >修改</button>
				</view>
			</view>
		</view>	
	</view>
</template>
<script>
	import UserModel from '@/models/user.js'
	import { config } from '../../../config.js'
	const _ = require('@/utils/lodash.js')
	const userModel = new UserModel() 
	export default {
		data(){
			return {
				userInfo:{}
			}
		},
		onLoad(){
			this.getUserInfo()
		},
		methods:{
			getUserInfo(){
				uni.showLoading({
					mask: true
				})
				userModel.getUserDetail().then(res=>{
					uni.hideLoading()
					const {data, code, message} = res.data
					if(code == '0'){
						this.userInfo = _.pick(data,['age', 'name', 'gender', 'avatar'])
						this.userInfo.phone = data.empowerPhone
					}else{
						uni.showToast({
							icon: 'none',
							title: message
						})
					}
				}).catch(err=>{
					uni.showToast({
						icon: 'none',
						title: '获取用户信息失败'
					})
				})
			},
			chooseImage(){
				const that = this
				uni.chooseImage({
					count:1,
					sizeType: 'compressed',
					sourceType: ['album', 'camera'],
					success: (res) => {
						that.userInfo.avatar = res.tempFilePaths[0]
						that.getImageWebUrl(res.tempFilePaths[0],'avatar')
					}
				})
			},
			getImageWebUrl(path,name){
				const that = this
				uni.showLoading({
					title: '上传中，请稍候...'
				})
				uni.uploadFile({
					// 这里修改上传地址
					url: config.base_url + '/user/uploadAvatar',
					filePath: path,
					name: 'file',
					success(res){
						uni.hideLoading()
						let response = res.data
						if(typeof response === 'string'){
							response = JSON.parse(response)
						}
						const { code, message, data } = response
						if(code === '0'){
							uni.showToast({
								title: '上传成功'
							})
							that.userInfo.avatar = data.url
						}else{
							uni.showToast({
								icon:'none',
								title: message
							})
						}
					},
					fail: res=>{
						uni.showToast({
							icon:'none',
							title: '上传失败，请稍候再试'
						})
					}
				})
			},
			radioChange(e){
				this.userInfo.gender = e.detail.value
			},
			submit(){
				uni.showLoading({
					mask: true
				})
				const array = Object.values(this.userInfo)
				userModel.updateUser(...array).then(res=>{
					uni.hideLoading()
					const {data, code, message} = res.data
					if(code == '0'){
						uni.showToast({
							title: '修改成功'
						})						
					}else{
						uni.showToast({
							icon: 'none',
							title: message
						})
					}
				}).catch(err=>{
					uni.showToast({
						icon: 'none',
						title: '获取用户信息失败'
					})
				})
			}
		}
	}
</script>
<style src="../../user/register/register.scss" lang="scss" scoped ></style>