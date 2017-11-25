<template>
<div class="com-nav-top">
    <navHeader name="歌单详情"></navHeader>
    <loading :isLoading="isLoading" class="loading"></loading>
    <div class="song-details-box">
        <div class="details-box">
            <div class="text-box">
                <img :src="songDetails.coverImgUrl" class="img-box" />
                <div class="author-box">
                    <p v-html="songDetails.name"></p>
                </div>

            </div>
            <div>

            </div>
        </div>
        <div>

        </div>
        <div class="search-list">
            <router-link :to="'play?id=' + data.id " class="search-item" v-for="data in songList" key={{index}}>
                <div>
                    <p class="name" v-html="data.name"></p>
                    <p class="details">
                        <span v-html="data.ar[0].name"></span>
                        -
                        <span v-html="data.al.name"></span>
                    </p>
                </div>
                <div class="play-mark"></div>
            </router-link>
        </div>
    </div>

</div>
</template>

<script>
import loading from '@/components/loading';
import navHeader from '@/components/nav';

export default {
    name: 'songListDetails',
    data() {
        return {
            isLoading : true,
            songDetails : {},
            songList : []
        }
    },
    computed : {},

    mounted() {
        this.getSongList();
    },

    components: {
        loading,
        navHeader
    },

    methods : {
        getSongList() {
            this.axios.get( this.API.playlistdetail + '?id=' + this.$route.query.id ).then( ( data ) => {
                console.log(data.data.playlist);
                this.songList = data.data.playlist.tracks;
                this.songDetails = data.data.playlist;
                this.isLoading = false;
            });
        }
    }
}
</script>

<style scoped>
.text-box {
    height: 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
}
.img-box {
    width: 6rem;
}
.author-box {
    width: 15rem;
}
</style>
