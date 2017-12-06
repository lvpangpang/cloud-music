<template>
<div class="com-nav-top">
    <navHeader name="登录"></navHeader>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import navHeader from '@/components/nav';

export default {
    name: 'songList',
    data() {
        return {
            isLoading : true
        }
    },
    computed : {
        ...mapState([
            'chooseClass'
        ])
    },

    mounted() {
    },

    components: {
        navHeader
    }
}
</script>

<style scoped>
.com-nav-top {
    margin-top: 4rem;
}
.all-songs {
    position: relative;
    display: block;
    width: 90%;
    line-height: 3rem;
    margin: 0 auto;
    border: 1px solid #dedede;
    border-radius: 3px;
    font-size: 1.3rem;
    background: #fff;
    color: #333;
    text-align: center;
}
.cat-box {
    width: 90%;
    margin: 1rem auto 0;
    border-left: 1px solid #dedede;
    border-top: 1px solid #dedede;
    background: #fff;
}
.cat-header {
    float: left;
    width: 25%;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.2rem;
    color: #d43c33;
    text-align: center;
    border-right: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
}
.cat-item {
    position: relative;
    float: left;
    width: 25%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    color: #333;
    border-right: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
}
.active:after {
    content: '';
    position: absolute;
    left: -1px;
    top: -1px;
    z-index: 1;
    width: 100%;
    height: 100%;
    border: 1px solid #d43c33;
    color: #d43c33;
}
</style>
