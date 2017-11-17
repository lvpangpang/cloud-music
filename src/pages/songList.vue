<template>
<div class="com-body-top">
    <Loading :isLoading="isLoading"></Loading>
    <h2 class="h2" v-cloak v-if="!isLoading">
        <span>全部歌单</span>
        <a href="javascript:;" class="more-btn">选择分类</a>
    </h2>
    <div class="song-list clearfix">
        <a href="javascript:;" class="song-items" v-for="(item, index) in songList">
            <div class="img-box">
                <img :data-src="item.picUrl" alt="" />
            </div>
            <p class="songs-der com-two-overflow">{{item.name}}</p>
        </a>
    </div>
</div>
</template>

<script>
import Loading from '@/components/Loading';
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
        Loading
    },

    methods : {
        getSongList() {
            this.axios.get(this.API.highquality).then( ( data ) => {
                console.log(data.data);
                this.songList = data.data.playlists;
                this.isLoading = false;
            });
        }
    }
}
</script>

<style scoped>
</style>
