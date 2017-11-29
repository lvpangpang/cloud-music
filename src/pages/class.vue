<template>
<div class="com-body-top">
    <navHeader name="选择分类"></navHeader>
    <router-link class="all-songs">全部歌曲</router-link>

</div>
</template>

<script>
import loading from '@/components/loading';
import navHeader from '@/components/nav';

export default {
    name: 'songList',
    data() {
        return {
            isLoading : true
        }
    },
    computed : {},

    mounted() {
    },

    components: {
        loading,
        navHeader
    },

    methods : {

    }
}
</script>

<style scoped>
.all-songs {
    display: block;
    width: 90%;
    line-height: 3rem;
    margin: 0 auto;
    border: 1px solid #dedede;
    border-radius: 3px;
    font-size: 1.5rem;
}

</style>
