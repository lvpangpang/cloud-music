<template>
<div class="com-nav-top">
    <navHeader name="搜索结果"></navHeader>
    <loading :isLoading="isLoading"></loading>
    <div class="search-list">
        <div @click="setIsShowPlay1( {flag : true, playSongId : data.id} )" class="search-item" v-for="data in searchList" key={{index}}>
            <div>
                <p class="name" v-html="data.name"></p>
                <p class="details">
                    <span v-html="data.artists[0].name"></span>
                    -
                    <span v-html="data.album.name"></span>
                </p>
            </div>
            <a href="javascript:;" class="play-mark" v-if="data.mvid" @click="mvPlay($event, data.mvid)"></a>
        </div>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import loading from '@/components/loading';
import navHeader from '@/components/nav';
export default {
    name: 'app',
    data() {
        return {
            isLoading : true,
            searchList : []
        }
    },
    computed : {},

    mounted() {
        this.getData();

    },

    components: {
        navHeader,
        loading
    },

    methods : {
        ...mapActions([
            'setIsShowPlay1'
        ]),

        getData() {
            this.axios.get(this.API.search +'?keywords=' + this.$route.query.keywords).then( ( data ) => {
                this.isLoading = false;
                this.searchList = data.data.result.songs;
                console.log(data.data);
            });
        },

        mvPlay(e, id) {
            e.stopPropagation();
            this.$router.push({path:'mvPlay?id='+ id});
        }

    }
}
</script>
