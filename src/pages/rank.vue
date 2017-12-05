<template>
<div class="com-body-top">
    <loading :isLoading="isLoading"></loading>
    <div>
        <h2 class="h2">云音乐官方榜</h2>
        <router-link :to="'songListDetails?id=' + data0.id" class="rank-item">
            <div class="img-box">
                <img :src="data0.coverImgUrl" alt="">
            </div>
            <div v-if="data0.tracks" class="songs-box">
                <p v-for="(item, index) in data0.tracks">
                    <span v-html="index+1"></span>
                    <span v-html="item.name"></span>
                    -
                    <span v-html="item.artists[0].name"></span>
                </p>
            </div>
        </router-link>
        <router-link :to="'songListDetails?id=' + data1.id" class="rank-item">
            <div class="img-box">
                <img :src="data1.coverImgUrl" alt="">
            </div>
            <div v-if="data1.tracks" class="songs-box">
                <p v-for="(item, index) in data1.tracks">
                    <span v-html="index+1"></span>
                    <span v-html="item.name"></span>
                    -
                    <span v-html="item.artists[0].name"></span>
                </p>
            </div>
        </router-link>
        <router-link :to="'songListDetails?id=' + data2.id" class="rank-item">
            <div class="img-box">
                <img :src="data2.coverImgUrl" alt="">
            </div>
            <div v-if="data2.tracks" class="songs-box">
                <p v-for="(item, index) in data2.tracks">
                    <span v-html="index+1"></span>
                    <span v-html="item.name"></span>
                    -
                    <span v-html="item.artists[0].name"></span>
                </p>
            </div>
        </router-link>
    </div>
</div>
</template>

<script>
import loading from '@/components/loading';
import '@/js/img-lazy';

export default {
    name : 'rank',

    data() {
        return {
            isLoading : true,
            data0 : {},
            data1 : {},
            data2 : {}
        }
    },

    mounted() {
        this.getData();
    },

    methods : {

        async getData() {
            // await后面要返回一个promise对象
            await this.getRank(3);
            await this.getRank(0);
            await this.getRank(2);
            this.isLoading = false;
            this.$nextTick(() => {
                new lazyImg();
            });
        },

        getRank(id, obj) {
            return new Promise( (resolve, reject) => {
                this.axios.get(this.API.topList + '?idx=' + id).then( ( data ) => {
                    resolve();
                    let data1 = data.data.result;
                    if ( id===3 ) {
                        this.data0 = data1;
                    } else if ( id===0 ) {
                        this.data1 = data1;
                    } else {
                        this.data2 = data1;
                    }
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
.h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    line-height: 3rem;
    font-size: 1.1rem;
    padding: 0 .5rem;
    margin-bottom: 1rem;
}
.h2:before {
    content: '';
    position: absolute;
    left: 0;
    top: .5rem;
    width: 2px;
    height: 2rem;
    background: #d43c33;
}
.rank-item {
    display: block;
    height: 10rem;
    padding: 0 1rem;
    color: #333;
}
.rank-item .img-box {
    float: left;
    width: 8rem;
}
.songs-box {
    float: left;
    margin-left: 1rem;
    width: 12rem;
}
</style>
