<template>
<div class="com-body-top">
    <loading :isLoading="isLoading"></loading>
    <h2 class="h2" v-cloak v-if="!isLoading">
        <span>全部歌单</span>
        <a href="javascript:;" class="more-btn">选择分类</a>
    </h2>
    <div class="song-list clearfix">
        <router-link  :to="'songListDetails?id=' + item.id" class="song-items" v-for="(item, index) in songList" key={{index}}>
            <div class="img-box">
                <p class="nums" v-html="item.playCount"></p>
                <img :src="item.coverImgUrl" alt="" />
            </div>
            <p class="songs-der com-two-overflow">{{item.name}}</p>
        </router-link>
    </div>
</div>
</template>

<script>
import loading from '@/components/loading';
export default {
    name: 'songList',
    data() {
        return {
            isLoading : true,
            songList : []
        }
    },
    computed : {},

    mounted() {
        this.getSongList();
    },

    components: {
        loading
    },

    methods : {
        getSongList() {
            this.axios.get(this.API.highquality).then( ( data ) => {
                this.songList = data.data.playlists;
                console.log(data.data.playlists);
                this.isLoading = false;
            });
        }
    }
}
</script>

<style scoped>
.h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    line-height: 2rem;
    font-size: 1.1rem;
    padding: 0 .5rem;
    margin: 1rem 0;
}
.h2:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 2rem;
    background: #d43c33;
}
.more-btn {
    color: #333;
    font-size: .9rem;
}
.song-items {
    float: left;
    width: 48%;
    height: 13rem;
    margin: .5rem 1%;
    color: #333;
}
.song-items .img-box {
    position: relative;
    height: 10rem;
    overflow: hidden;
}
.song-items .nums {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1.5rem;
    background-image: linear-gradient(180deg,rgba(0,0,0,.2),transparent);
    color: #fff;
    text-align: right;
    padding: .2rem .3rem 0 0;
    font-size: .9rem;
}
.song-items .songs-der {
    margin-top: .2rem;
}
</style>
