<template>
<div>
    <header class="nav-header">
        <a href="javascript:history.back()" class="back-btn"></a>
        <h1 class="h1">歌单</h1>
        <span class="run"></span>
    </header>
    <loading :isLoading="isLoading" class="loading"></loading>
    <div class="song-details-box">
        <div class="details-box">
            <div>

            </div>
            <div>

            </div>
        </div>
        <div>

        </div>
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
            console.log( this.$route );
            this.axios.get( this.API.playlistdetail + '?id=' +this.$route.query.id ).then( ( data ) => {
                console.log(data.data);
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
.nav-header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .5rem;
    color: #333;
    background: #fff;
}
.nav-header .h1 {
    font-weight: 400;
    font-size: 1.2rem;
}
.nav-header .back-btn {
    width: 2rem;
    height: 2rem;
    background: url(../images/back.png) no-repeat center / 2rem 2rem;
}
.nav-header .run {
    width: 2rem;
    height: 2rem;
    background: url(../images/hot.gif) no-repeat center / 2rem 2rem;
}

.song-details-box {
    height: 8rem;
}
.details-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    height: 6rem;
}

</style>
