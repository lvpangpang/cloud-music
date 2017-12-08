<template>
<div class="com-body-top">
    <loading :isLoading="isLoading"></loading>
    <mt-swipe :auto="40000">
        <mt-swipe-item v-for="(item, index) in bannerList" key={{index}}>
            <a :href="item.url" class="swipe-item">
                <img :src='item.pic'>
            </a>
        </mt-swipe-item>
    </mt-swipe>

    <nav class="index-nav" v-if="!isLoading">
        <router-link :to="'/hot?theme'" class="nav-item">
            <img src="../images/fm.png" class="nav-top" />
            <p>私人FM</p>
        </router-link>
        <router-link :to="'dailySongs?date='+ date" class="nav-item">
            <div class="nav-top nav-text" v-html="date"></div>
            <p>每日歌曲推荐</p>
        </router-link>
        <a href="javascript:;" class="nav-item" @click="setIsShowPlay1({flag: true, id:playSongId})">
            <img src="../images/hot.gif" class="nav-top" />
            <p>正在播放</p>
        </a>
    </nav>

    <div class="recommend-box" v-if="!isLoading">
        <h2 class="h2">
            <span>推荐歌单</span>
            <a href="javascript:;" class="more-btn">更多></a>
        </h2>
        <div class="song-list clearfix">
            <router-link :to="'songListDetails?id=' + item.id" class="song-items" v-for="(item, index) in songList" key="{{index}}">
                <div class="img-box">
                    <img :data-src="item.picUrl" alt="" />
                </div>
                <p class="songs-der com-two-overflow">{{item.name}}</p>
            </router-link>
        </div>
    </div>

    <div class="recommend-box" v-if="!isLoading">
        <h2 class="h2">
            <span>推荐MV</span>
            <a href="javascript:;" class="more-btn">更多></a>
        </h2>
        <div class="song-list clearfix">
            <router-link :to="'mvPlay?id=' + item.id" class="song-items song-items1" v-for="(item, index) in mvList" key={{index}}>
                <div class="img-box">
                    <img :data-src="item.picUrl" alt="" />
                </div>
                <p class="songs-der com-two-overflow">{{item.name}}</p>
                <p v-html="item.artistName" class="art-name"></p>
            </router-link>
        </div>
    </div>

</div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { Swipe, SwipeItem } from 'mint-ui';
import loading from '@/components/loading';
import '@/js/img-lazy';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
    name : 'index',

    data() {
        return {
            isLoading : true,
            bannerList : [],
            songList : [],
            mvList : [],
            date : null,
        }
    },

    computed : {
        ...mapState([
            'isPlay',
            'historyList',
            'playSongId',
            'playSongIndex'
        ])
    },

    mounted() {
        this.getData();
    },

    methods : {
        ...mapActions([
            'setIsShowPlay1'
        ]),

        getData() {
            // await后面要返回一个promise对象

            // 方法1
            /*await this.getBanner();
            await this.getSongList();
            await this.getMvList();*/

            // 方法二
            Promise.all( [this.getBanner(), this.getSongList(), this.getMvList()]).then( () => {
                this.isLoading = false;
                this.date = (new Date(this.date)).getDate();
                this.$nextTick(() => {
                    new lazyImg();
                });
            });

        },

        getBanner() {
            return new Promise( (resolve, reject) => {
                this.axios.get(this.API.banner).then( ( data ) => {
                    resolve();
                    let data1 = data.data;
                    this.date = data.headers.date;
                    this.bannerList = data1.banners;
                });
            });
        },

        getSongList() {
            return new Promise( (resolve, reject) => {
                this.axios.get(this.API.personalized).then( ( data ) => {
                    resolve();
                    this.songList = data.data.result;
                });
            });
        },

        getMvList() {
            return new Promise( (resolve, reject) => {
                this.axios.get(this.API.personalizedMv).then( ( data ) => {
                    resolve();
                    this.mvList = data.data.result;
                });
            });
        }
    },

    components : {
        loading
    }
}
</script>

<style scoped>
.mint-swipe {
    height: 10rem;
}
.mint-swipe .swipe-item {
    display: block;
    height: 100%;
    text-align: center;
}
.mint-swipe .swipe-item img {
    height: 100%;
}

.index-nav {
    height: 7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}
.index-nav .nav-item {
    width: 5rem;
    color: #333;
    text-align: center;
    font-size:.8rem;
}
.index-nav .nav-top {
    display: block;
    margin: 0 auto .3rem;
    width: 60%;
}
.index-nav .nav-text {
    width: 3.1rem;
    line-height: 3.1rem;
    border: 1px solid #d43c33;
    border-radius: 50%;
    font-size: 1.4rem;
    color: #d43c33;
}

.recommend-box .h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    line-height: 2rem;
    font-size: 1.1rem;
    padding: 0 .5rem;
    margin-bottom: 1rem;
}
.recommend-box .h2:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 2rem;
    background: #d43c33;
}
.recommend-box .more-btn {
    color: #333;
    font-size: .9rem;
}

.recommend-box .song-items {
    float: left;
    margin: 0 0 .5rem 1%;
    width: 32%;
    color: #333;
    overflow: hidden;
}
.recommend-box .song-items1 {
    width: 48%;
}
.recommend-box .img-box {
    position: relative;
    height: 8rem;
}
.recommend-box .img-box img {
    height: 100%;
}
.recommend-box .songs-der {
    margin-top: .2rem;
    height: 2.5rem;
    padding: 0 .3rem;
}
.recommend-box .art-name {
    color: #808080;
    font-size: .8rem;
}

</style>
