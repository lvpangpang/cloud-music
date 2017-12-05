<template>
<div class="com-body-top">
    <loading :isLoading="isLoading"></loading>
    未完待续...



</div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import loading from '@/components/loading';
import '@/js/img-lazy';

export default {
    name : 'index',

    data() {
        return {
            isLoading : true,
            bannerList : [],
            songList : [],
            mvList : []
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

        async getData() {
            // await后面要返回一个promise对象
            await this.getBanner();
            this.isLoading = false;
            this.$nextTick(() => {
                new lazyImg();
            });
        },

        getBanner() {
            return new Promise( (resolve, reject) => {
                this.axios.get(this.API.topList + '?idx=0').then( ( data ) => {
                    resolve();
                    let data1 = data.data;
                    console.log(data1);
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

</style>
