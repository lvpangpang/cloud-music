<template>
<div class="search-box">
    <!-- 搜索框 -->
    <div class="search-wrap">
        <input type="search" name="search" class="search-input" placeholder="" v-model="searchKey" autocomplete="off" autofocus="true">
        <a href="javascript:;" class="close-btn" @click="close"></a>
    </div>

    <!-- 搜索建议 -->
    <div class="suggest-box">
        <router-link :to="'searchResult?keywords=' + data.name" class="suggest-item" v-for="data in suggestList" v-html="data.name" key={{index}}></router-link>
    </div>

    <!-- 热门搜索 -->
    <div class="hot-box">
        <h2 class="h2">热门搜索</h2>
        <div class="hot-list clearfix">
            <router-link to="searchResult?keywords=青花瓷" class="hot-item">青花瓷</router-link>
            <router-link to="searchResult?keywords=老鼠爱大米" class="hot-item">老鼠爱大米</router-link>
            <router-link to="searchResult?keywords=两只蝴蝶" class="hot-item">两只蝴蝶</router-link>
            <router-link to="searchResult?keywords=本草纲目" class="hot-item">本草纲目</router-link>
            <router-link to="searchResult?keywords=烟花易冷" class="hot-item">烟花易冷</router-link>
            <router-link to="searchResult?keywords=七里香" class="hot-item">七里香</router-link>
        </div>

    </div>
</div>
</template>

<script>
export default {
    name: 'search',
    data() {
        return {
            searchKey : '',
            suggestList : []
        }
    },
    computed : {},

    watch: {
        // 请求控制
        searchKey() {
            let timeout = null;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.suggest();
            },200);
        }

    },

    mounted() {

    },

    components: {

    },

    methods : {
        suggest() {
            this.suggestList = [];
            this.axios.get(this.API.suggest + '?keywords=' + encodeURI((this.searchKey))).then( (data) => {
                let data1 = data.data;
                if ( data1.result ) {
                    this.suggestList = data1.result.songs;
                }
            } );
        },
        close() {
            this.$emit('setSearch');
        }
    }
}
</script>

<style scoped>
.search-box {
    position: fixed;
    z-index: 1001;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
}
.search-wrap {
    position: relative;
    padding: 1rem;
}
.search-input {
    width: 90%;
    height: 30px;
    line-height: 18px;
    background: transparent;
    font-size: 14px;
    color: #333;
    border: none;
    background: #ebecec;
    padding: 1rem;
    border-radius: 30px;
}
.close-btn {
    float: right;
    margin-top: .2rem;
    width: 1.5rem;
    height: 1.5rem;
    background: url('../images/close.png') no-repeat center / 1.5rem 1.5rem;
}
.hot-box {
    padding: .5rem 1rem;
    border-top: 1px solid #efefef;
}
.hot-box .h2 {
    font-size: 1rem;
    padding-bottom: .5rem;
}
.hot-item {
    float: left;
    height: 32px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 0 14px;
    font-size: 14px;
    line-height: 32px;
    color: #333;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 100px;
}
.suggest-box {
    position: absolute;
    top: 4rem;
    left: 0;
    width: 100%;
    background: #fff;
}
.suggest-item {
    display: block;
    line-height: 3rem;
    padding-left: 1rem;
    border-bottom: 1px solid #efefef;
    color: #333;
}
.suggest-item:last-child {
    border-bottom: none;
}
</style>
