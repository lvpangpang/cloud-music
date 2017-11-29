import Vue from 'vue';
import Router from 'vue-router';
import recommend from '@/pages/recommend';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
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
        },

        {
            path: '/songListDetails',
            name: 'songListDetails',
            component: resolve => require(['../pages/songListDetails.vue'], resolve)
        },

        {
            path: '/searchResult',
            name: 'searchResult',
            component: resolve => require(['../pages/searchResult.vue'], resolve)
        },

        {
            path: '/play',
            name: 'play',
            component: resolve => require(['../pages/play.vue'], resolve)
        },

        {
            path: '/class',
            name: 'class',
            component: resolve => require(['../pages/class.vue'], resolve)
        }
    ]
});
