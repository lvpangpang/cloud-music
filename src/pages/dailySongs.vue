<template>
<transition name="show">
    <div class="com-nav-top" v-if="true">
        <navHeader name="每日歌曲推荐"></navHeader>
        <loading :isLoading="isLoading" class="loading"></loading>
        <div class="song-details-box">
            <div class="details-box">
                <div v-html="$route.query.date" class="date"></div>
                <div>根据你的音乐口味，每天6:00更新哦</div>
            </div>
            <div class="search-list">
                <router-link :to="'play?id=' + data.id " class="search-item" v-for="data in songList" key={{index}}>
                    <div>
                        <p class="name" v-html="data.name"></p>
                        <p class="details">
                            <span v-html="data.artists[0].name"></span>
                            -
                            <span v-html="data.album.name"></span>
                        </p>
                    </div>
                    <router-link :to="'mvPlay?id=' + data.mvid" class="play-mark" v-if="data.mvid"></router-link>
                </router-link>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import loading from '@/components/loading';
import navHeader from '@/components/nav';

export default {
    name: 'songListDetails',
    data() {
        return {
            isLoading : true,
            songList : []
        }
    },

    mounted() {
        this.getSongList();
    },

    components: {
        loading,
        navHeader
    },

    methods : {
        getSongList() {
            this.axios.get( this.API.recommendSongs ).then( ( data ) => {
                console.log(data);
                this.songList = data.data.recommend;
                this.isLoading = false;
            });
        }
    }
}
</script>

<style scoped>
.details-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 8rem;
    background: #333;
    color: #fff;
}
.details-box .date {
    width: 6rem;
    line-height: 6rem;
    background: #fff;
    text-align: center;
    color: #d43c33;
    font-size: 4rem;
}
</style>
