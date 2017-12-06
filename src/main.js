import Vue from 'vue';
import App from './App';
import router from './router';
import store from '@/vuex';
import axios from 'axios';
import '@/css/common.css';
import commonMethods from '@/js/common.js';
import API from '@/js/API';

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.API = API;
Vue.prototype.commonMethods = commonMethods;

// 先获取用户登录状态
axios.get(API.loginRefresh).then( ( data ) => {

    store.dispatch('setLogin1', data.data.msg);

    // 需要登录权限的组件权限控制
    router.beforeEach((to, from, next) => {
        console.log(to.name);
        let loginArr = ['dailySongs', 'shopCar', 'order'];
        if ( loginArr.join(",").indexOf(to.name) !==-1 && store.state.isLogin === null  ) {
            store.dispatch('setShowLogin1', true);
        } else {
            next();
        }
    });

    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: {
            App
        }
    });

});
