<template>
<div class="com-nav-top">
    <navHeader name="选择分类"></navHeader>
    <router-link to="songList" class="all-songs" :class="{active : chooseClass==='' || chooseClass==='全部' }">全部歌曲</router-link>

    <div class="cat-box clearfix">
        <div class="cat-header">风格</div>
        <router-link to="songList?cat=流行" class="cat-item" :class="{active : chooseClass==='流行' }">流行</router-link>
        <router-link to="songList?cat=摇滚" class="cat-item" :class="{active : chooseClass==='摇滚' }">摇滚</router-link>
        <router-link to="songList?cat=民谣" class="cat-item" :class="{active : chooseClass==='民谣' }">民谣</router-link>
        <router-link to="songList?cat=电子" class="cat-item" :class="{active : chooseClass==='电子' }">电子</router-link>
        <router-link to="songList?cat=舞曲" class="cat-item" :class="{active : chooseClass==='舞曲' }">舞曲</router-link>
        <router-link to="songList?cat=说唱" class="cat-item" :class="{active : chooseClass==='说唱' }">说唱</router-link>
        <router-link to="songList?cat=轻音乐" class="cat-item" :class="{active : chooseClass==='轻音乐' }">轻音乐</router-link>
        <router-link to="songList?cat=爵士" class="cat-item" :class="{active : chooseClass==='爵士' }">爵士</router-link>
        <router-link to="songList?cat=乡村" class="cat-item" :class="{active : chooseClass==='乡村' }">乡村</router-link>
        <router-link to="songList?cat=古风" class="cat-item" :class="{active : chooseClass==='古风' }">古风</router-link>
    </div>

    <div class="cat-box clearfix">
        <div class="cat-header">感情</div>
        <router-link to="songList?cat=怀旧" class="cat-item" :class="{active : chooseClass==='怀旧' }">怀旧</router-link>
        <router-link to="songList?cat=清新" class="cat-item" :class="{active : chooseClass==='清新' }">清新</router-link>
        <router-link to="songList?cat=浪漫" class="cat-item" :class="{active : chooseClass==='浪漫' }">浪漫</router-link>
        <router-link to="songList?cat=性感" class="cat-item" :class="{active : chooseClass==='性感' }">性感</router-link>
        <router-link to="songList?cat=伤感" class="cat-item" :class="{active : chooseClass==='伤感' }">伤感</router-link>
        <router-link to="songList?cat=治愈" class="cat-item" :class="{active : chooseClass==='治愈' }">治愈</router-link>
        <router-link to="songList?cat=放松" class="cat-item" :class="{active : chooseClass==='放松' }">放松</router-link>
        <router-link to="songList?cat=感动" class="cat-item" :class="{active : chooseClass==='感动' }">感动</router-link>
        <router-link to="songList?cat=快乐" class="cat-item" :class="{active : chooseClass==='快乐' }">快乐</router-link>
        <router-link to="songList?cat=安静" class="cat-item" :class="{active : chooseClass==='安静' }">安静</router-link>
        <router-link to="songList?cat=兴奋" class="cat-item" :class="{active : chooseClass==='兴奋' }">兴奋</router-link>
        <router-link to="songList?cat=孤独" class="cat-item" :class="{active : chooseClass==='孤独' }">孤独</router-link>
        <router-link to="songList?cat=思念" class="cat-item" :class="{active : chooseClass==='思念' }">思念</router-link>
        <router-link to="songList?cat=" class="cat-item"></router-link>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import loading from '@/components/loading';
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
        console.log( this.chooseClass );
    },

    components: {
        loading,
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
