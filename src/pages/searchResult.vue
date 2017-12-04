<template>
<div class="com-nav-top">
    <navHeader name="搜索结果"></navHeader>
    <loading :isLoading="isLoading"></loading>
    <div class="search-list">
        <router-link :to="'play?id=' + data.id " class="search-item" v-for="data in searchList" key={{index}}>
            <div>
                <p class="name" v-html="data.name"></p>
                <p class="details">
                    <span v-html="data.artists[0].name"></span>
                    -
                    <span v-html="data.album.name"></span>
                </p>
            </div>
            <router-link :to="'mvPlay?id=' + data.mvid" class="play-mark" v-if="data.mvid"></router-link>
        </router-link>
    </div>
</div>
</template>

<script>
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
        getData() {
            this.axios.get(this.API.search +'?keywords=' + this.$route.query.keywords).then( ( data ) => {
                this.isLoading = false;
                this.searchList = data.data.result.songs;
                console.log(data.data);
            });
        }

    }
}
</script>

<!-- github https://github.com/lvpangpang
博客 http://www.qdfuns.com/house/15098/note（目前正在往掘金迁移）
掘金 https://juejin.im/user/57f4f6b9128fe1005444e434 -->