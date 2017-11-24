<template>
<router-link :to="'play?id=' + song.id " class="search-item"  key={{index}}>
        <div>
            <p class="name" v-html="data.name"></p>
            <p class="details">
                <span v-html="data.artists[0].name"></span>
                -
                <span v-html="data.album.name"></span>
            </p>
        </div>
        <div class="play-mark">
        </div>
    </router-link>
</div>
</template>

<script>
export default {
    name: 'loading',
    props: {
        song : {
            type : Object
        }
    },
    data() {
        return {}
    }
}
</script>

<style scoped>
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
