<template>
<div>
   <!--  <header class="nav-header">
        <a href="javascript:history.back()" class="back-btn"></a>
        <h1 class="h1">歌单</h1>
        <span class="run"></span>
    </header> -->
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
        loading
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
.loading {
    margin-top: 4rem;
}
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
.search-item {
    display: block;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    color: #333;
    border-bottom: 1px solid #efefef;
}
.name {
    font-size: 1.2rem;
    width: 10rem;
    height: 1.8rem;
    overflow:hidden;
}
.details {
    font-size: .8rem;
    color: #808080;
}

</style>
