<template>
<transition name="show">
    <div class="com-nav-top" v-if="true">
        <navHeader name="歌单详情"></navHeader>
        <loading :isLoading="isLoading" class="loading"></loading>
        <div class="song-details-box">
            <div class="details-box">
                <div class="text-box">
                    <div class="img-box">
                        <span v-html="songDetails.playCount" class="com-nums"></span>
                        <img :src="songDetails.coverImgUrl" class="img-box" />
                    </div>
                    <div class="author-box">
                        <p v-html="songDetails.name"></p>
                        <p v-if="songDetails.creator">
                            <img :src="songDetails.creator.avatarUrl" class="nick-img" />
                            <span v-html="songDetails.creator.nickname" class="nick-name"></span>
                            >
                        </p>
                    </div>
                </div>
            </div>
            <div>

            </div>
            <div class="search-list">
                <div @click="setIsShowPlay1( {flag : true, playSongId : data.id} )" class="search-item" v-for="data in songList" key={{index}}>
                    <div>
                        <p class="name" v-html="data.name"></p>
                        <p class="details">
                            <span v-html="data.ar[0].name"></span>
                            -
                            <span v-html="data.al.name"></span>
                        </p>
                    </div>
                    <a href="javascript:;" class="play-mark" v-if="data.mv" @click="mvPlay($event, data.mv)"></a>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
        ...mapActions([
            'setIsShowPlay1'
        ]),

        getSongList() {
            this.axios.get( this.API.playlistdetail + '?id=' + this.$route.query.id ).then( ( data ) => {
                console.log(data.data.playlist.tracks);
                this.songList = data.data.playlist.tracks;
                this.songDetails = data.data.playlist;
                this.isLoading = false;
            });
        },
        mvPlay(e, id) {
            e.stopPropagation();
            this.$router.push({path:'mvPlay?id='+ id});
        }

    }
}
</script>

<style scoped>
.show-enter-active {
    transition: all 3s ease;
}
.show-enter {
    transform: translateY(50px);
}
.text-box {
    height: 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
}
.img-box {
    position: relative;
    width: 6rem;
}
.author-box {
    width: 15rem;
}
.nick-img {
    vertical-align: middle;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
}
.nick-name {
    font-size: .8rem;
}
</style>
