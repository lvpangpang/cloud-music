<template>
<div class="com-body-top">
    <loading :isLoading="isLoading"></loading>
    <div class="clearfix">
        <router-link :to="'/play?id=478446370'" v-for="(item, index) in radioList" class="radio-item">
            <div class="img-box">
                <img :src="item.picUrl" alt="" />
            </div>
            <p v-html="item.name" class="name"></p>
        </router-link>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import loading from '@/components/loading';

export default {
    name : 'index',

    data() {
        return {
            isLoading : true,
            radioList : []
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
            this.getRadio().then( (data) => {
                console.log(data);
                this.isLoading = false;
                this.$nextTick(() => {
                    new lazyImg();
                });
            });
        },

        getRadio() {
            return new Promise( (resolve, reject) => {
                this.axios.get(this.API.djprogram).then( ( data ) => {
                    resolve(data.data.result);
                    this.radioList = data.data.result;
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
.radio-item {
    float: left;
    width: 48%;
    height: 16rem;
    color: #333;
    margin: 0 0 1rem 1.33%;
}
.radio-item .img-box {
    width: 100%;
}
.radio-item .name {
    height: 5rem;
    line-height: 2rem;
    overflow: hidden;
}

</style>
