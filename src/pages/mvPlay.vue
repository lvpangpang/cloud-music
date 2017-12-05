<template>
<div class="mv-play-top">
    <navHeader :name="mv.name"></navHeader>
    <loading :isLoading="isLoading"></loading>

    <div class="play-box" v-if="mv.brs">
        <video :src="this.API.mvUrl + '?url=' + (mv.brs[1080] || mv.brs[720] || mv.brs[480] || mv.brs[240])"  v-if="mv.brs" autoplay loop id="video"></video>
        <div class="operate-box">
            <a href="javascript:;" class="go-play" @click="setStop":class="{'no-playying' : !isPlayMv}"></a>
            <div class="time-box">
                <span v-html="calTime(currentTime, 1)"></span>
                <div class="play-line">
                    <span class="move" id="move"></span>
                </div>
                <span v-html="calTime(mv.duration, 1000)"></span>
            </div>
            <a href="javascript:;" class="full-screen" @click="setAllScreen()">Full</a>
        </div>
    </div>

    <div class="details-nav" v-if="mv.brs">
        <a href="javascript:;" class="nav-item" @click="showDetails1" :class="{active : showDetails}">详情</a>
        <a href="javascript:;" class="nav-item" @click="showCommit1" :class="{active : showCommit}">评论</a>
        <a href="javascript:;" class="nav-item" @click="showSimiMv1" :class="{active : showSimiMv}">相关MV</a>
    </div>

    <div class="details-box" v-if="mv.brs">
        <loading :isLoading="isLoading1"></loading>

        <!-- 详情 -->
        <div class="detail-box" v-show="showDetails">
            <div class="header-box">
                <div class="name-author">
                    <p v-html="mv.name" class="mv-name"></p>
                    <p>歌手：<span v-html="mv.artistName"></span></p>
                </div>
                <div class="sub-count">
                    收藏数 <span v-html="mv.subCount"></span>
                </div>
            </div>
            <div class="nums-box">
                <p>播放数：<span v-html="mv.playCount"></span></p>
                <p>发行：<span v-html="mv.publishTime"></span></p>
                <p v-html="mv.briefDesc"></p>
                <p v-html="mv.desc"></p>
            </div>
        </div>

        <!-- 评论 -->
        <div v-show="showCommit" class="commit-box">
            <p class="wonderful-comments">精彩评论</p>
            <div class="commit-item clearfix" v-for="(item, index) in commentList" key={{index}}>
                <div class="header-img-box">
                    <img :src="item.user&&item.user.avatarUrl" alt="" />
                </div>
                <div class="commit-main-box">
                    <div class="time-nick">
                        <p v-html="item.user&&item.user.nickname"></p>
                        <p v-html="setTime(item.time)"></p>
                    </div>
                    <div v-html="item.content"></div>
                </div>
            </div>
        </div>


         <!-- 相似mv -->
        <div v-show="showSimiMv" class="commit-box">
            <div class="simi-item clearfix" v-for="(item, index) in simiMvList" key={{index}} @click="cutMv(item.id)">
                <div class="mv-img-box">
                    <img :src="item.cover" alt="">
                </div>
                <div class="mv-details-box">
                    <p v-html="item.name"></p>
                    <p v-html="item.artistName"></p>
                </div>
            </div>
        </div>

    </div>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import loading from '@/components/loading';
import navHeader from '@/components/nav';

export default {
    name : 'mvPlay',

    data() {
        return {
            isLoading : true,
            isLoading1 : false,//控制下面tab切换
            mvId : this.$route.query.id,
            mv : {},
            currentTime : 0,
            isPlayMv : true,
            isAllScreen : false,
            commentList : [],
            simiMvList : [],
            showDetails : true,
            showCommit : false,
            showSimiMv : false
        }
    },

    computed : {
    },

    mounted() {
        // 暂停正在播放歌曲（如果有的话）
        let audio = document.getElementById('music');
        audio.pause();
        this.getData();
    },

    methods : {

        async getData() {
            // await后面要返回一个promise对象
            await this.getMv();
            this.isLoading = false;
            this.$nextTick( () => {
                let video = document.getElementById('video'),
                    move = document.getElementById('move');
                this.showDetails1();
                setInterval( () => {
                    if ( this.isPlayMv ) {
                        this.currentTime = parseInt(video.currentTime);
                        move.style.webkitTransform = 'translate3d('+ this.currentTime/(this.mv.duration/1000) * 180 +'px, 0px,0px)';
                    }
                }, 1000);
            });
        },

        // 获取MV信息
        getMv() {
            return new Promise( (resolve, reject) => {
                this.axios.get(this.API.mv + '?mvid=' + this.mvId).then( ( data ) => {
                    resolve();
                    this.mv = data.data.data;
                    console.log(this.mv);
                });
            });
        },

        // 获取评论信息
        getMvCommit() {
            this.axios.get(this.API.commentMv + '?id=' + this.mvId).then( ( data ) => {
                this.isLoading1 = false;
                this.commentList = data.data.hotComments;
                console.log(data.data.hotComments);
            });
        },

        // 获取相似mv
        getSimiMv() {
            this.axios.get(this.API.simiMv + '?mvid=' + this.mvId).then( ( data ) => {
                this.isLoading1 = false;
                this.simiMvList = data.data.mvs;
                console.log(data.data);
            });
        },

        // 显示详情
        showDetails1() {
            this.showDetails = true;
            this.showCommit = false;
            this.showSimiMv = false;
        },

        // 显示评论
        showCommit1() {
            this.showDetails = false;
            this.showCommit = true;
            this.showSimiMv = false;
            if ( this.commentList.length === 0 ) {
                this.isLoading1 = true;
                this.getMvCommit();
            }
        },

        // 显示相似mv
        showSimiMv1() {
            this.showDetails = false;
            this.showCommit = false;
            this.showSimiMv = true;
            if ( this.simiMvList.length === 0 ) {
                this.isLoading1 = true;
                this.getSimiMv();
            }
        },

        // 切换mv
        cutMv(id) {
            this.mvId = id;
            this.commentList = this.simiMvList = [];
            this.getData();
        },

        // 控制是否播放
        setStop() {
            let video = document.getElementById('video');
            this.isPlayMv = !this.isPlayMv;
            if ( this.isPlayMv ) {
                video.play();
            } else {
                video.pause();
            }
        },

        // 设置时间格式
        calTime(secs, num) {
            let se = parseInt(secs/num),
                mins = parseInt(se/60),
                sec = parseInt(se%60);
            return (mins < 10 ? ('0' + mins) : mins)   + ':' + (sec < 10 ? ('0' + sec) : sec);
        },

        // 设置YY-MM-DD时间格式
        setTime(secs) {
            var secs = new Date(secs);
            return secs.getFullYear() + '年' + (secs.getMonth() + 1) + '月' + secs.getDate() + '日';
        },

        // 是否全屏
        setAllScreen() {
            let video = document.getElementById('video');
            this.isAllScreen = !this.isAllScreen;
            if ( this.isAllScreen ) {
                video.webkitRequestFullScreen();
            }
        }

    },

    components : {
        loading,
        navHeader
    }
}
</script>

<style scoped>
.wonderful-comments {
    padding: 1rem;
}
.mv-play-top {
    margin-top: 25rem;
}
.play-box {
    position: fixed;
    left: 0;
    top: 3rem;
    width: 100%;
    height: 19rem;
    background: #000;
}
.operate-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 3rem;
    color: #fff;
    padding: 0 1rem;
}
video {
    width: 100%;
}
.go-play {
    width: 2.5rem;
    height: 2.5rem;
    background: url(../images/pause.png) no-repeat center / 2.5rem 2.5rem;
}
.no-playying {
    background: url(../images/play.png) no-repeat center / 2.5rem 2.5rem;
}

.time-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    height: 2rem;
    font-size: .8rem;
    width: 320px;
    padding: 0 .5rem;
}
.time-box .play-line {
    position: relative;
    width: 200px;
    height: 2px;
    background: #dedede;
    border-radius: 1px;
}
.time-box .move {
    position: absolute;
    left: 0;
    top: -8px;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
}
.move:after {
    content: '';
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 4px;
    height: 4px;
    background: #d43c33;
    border-radius: 50%;
}
.full-screen {
    color: #fff;
}

/* 导航开始 */
.details-nav {
    position: fixed;
    left: 0;
    top: 22rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    height: 3rem;
    border-bottom: 1px solid #dedede;
}
.details-nav .nav-item {
    height: 3rem;
    line-height: 3rem;
    color: #333;
}
.details-nav .active {
    border-bottom: 1px solid #d43c33;
}
.header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
    padding: 0 1rem;
    border-bottom: 1px solid #dedede;
}
.mv-name {
    font-size: 1.2rem;
}
.nums-box {
    padding: 1rem;
}
/* 导航结束 */

/* 评论开始 */
.commit-box {
    height: 20rem;
    overflow-y: auto;
}
.commit-box .commit-item {

}
.commit-box .commit-item .header-img-box {
    float: left;
    width: 2rem;
    height: 2rem;
    margin: .5rem;
    border-radius: 50%;
    overflow: hidden;
}
.commit-box .commit-main-box {
    float: left;
    margin: 0 0 1rem 1rem;
    width: 20rem;
}
.commit-box .time-nick {
    color: #808080;
    font-size: .9rem;
}
/* 评论结束 */

/* 相似mv开始 */
.simi-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8rem;
    border-bottom: 1px solid #dedede;
}
.simi-item .mv-img-box {
    width: 10rem;
    height: 5rem;
}
.simi-item .mv-img-box img {
    width: 100%;
}
.simi-item .mv-details-box {
    margin-left: 1rem;
    width: 13rem;
    text-align: left;
}
/* 相似mv结束 */



</style>
