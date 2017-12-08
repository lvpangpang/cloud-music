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
            path: '/radio',
            name: 'radio',
            component: resolve => require(['../pages/radio.vue'], resolve)
        },

        {
            path: '/rank',
            name: 'rank',
            component: resolve => require(['../pages/rank.vue'], resolve)
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
            path: '/class',
            name: 'class',
            component: resolve => require(['../pages/class.vue'], resolve)
        },

        {
            path: '/mvPlay',
            name: 'mvPlay',
            component: resolve => require(['../pages/mvPlay.vue'], resolve)
        },

        {
            path: '/dailySongs',
            name: 'dailySongs',
            component: resolve => require(['../pages/dailySongs.vue'], resolve)
        }
    ]
});
