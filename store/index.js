import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userName: "",
		tabIndex: 0,
		currentResume: ''
    },
    mutations: {
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
			uni.setStorageSync('userName', userName);
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        },
		switchTab(state, index){
			state.tabIndex = index
		},
		setCurrentResume(state, id){
			state.currentResume = id
		}
    }
})

export default store
