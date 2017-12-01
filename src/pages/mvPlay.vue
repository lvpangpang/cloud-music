<template>
<div class="com-body-top">
    <loading :isLoading="isLoading"></loading>

    <video :src="this.API.mvUrl + '?url=' + this.mv.brs[1080]"  v-if="mv.brs" autoplay></video>



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
            mv : {}

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
            await this.getMv();
        },

        getMv() {
            return new Promise( (resolve, reject) => {
                this.axios.get(this.API.mv + '?mvid=' + this.$route.query.id).then( ( data ) => {
                    resolve();
                    this.mv = data.data.data;
                    this.isLoading = false;
                    console.log(this.mv);
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
video {
    width: 100%;
    height: 10rem;
}

</style>
