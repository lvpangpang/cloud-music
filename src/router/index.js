import Vue from 'vue';
import Router from 'vue-router';
import recommend from '@/pages/recommend';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'recommend',
            component: recommend,
        },

        {
            path: '/recommend',
            name: 'recommend',
            component: recommend,
        },

        {
            path: '/songList',
            name: 'songList',
            component: resolve => require(['../pages/songList.vue'], resolve)
        }
    ]
});
