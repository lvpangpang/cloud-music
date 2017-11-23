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

new Vue({
    el:'#app',
    store,
    router,
    template: '<App/>',
    components: { App }
});