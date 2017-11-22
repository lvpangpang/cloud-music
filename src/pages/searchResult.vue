<template>
<div class="search-result-box">
    <navHeader name="搜索结果"></navHeader>
    <loading :isLoading="isLoading"></loading>
    <div class="search-list">
        <router-link to="" class="search-item" v-for="data in ">
            <div>
                <p class="name">和风一样</p>
                <p class="details">
                    <span>周杰伦</span>
                    -
                    <span>和风一样</span>
                </p>
            </div>
            <div class="play-mark">
            </div>
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
            });
        }

    }
}
</script>

<style scoped>
.search-result-box {
    padding-top: 3rem;
}
.search-item {
    display: block;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    color: #333;
    border-bottom: 1px solid #efefef;
}
.name {
    font-size: 1.2rem;
}
.details {
    font-size: .8rem;
    color: #808080;
}
.play-mark {
    width: 1.5rem;
    height: 1.5rem;
    background: url(../images/play.png) no-repeat center / 1.5rem 1.5rem;
}
</style>
