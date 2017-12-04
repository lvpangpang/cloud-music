<template>
<div class="com-nav-top">

    <navHeader :name="mv.name"></navHeader>
    <loading :isLoading="isLoading"></loading>

    <div class="play-box">
        <video :src="this.API.mvUrl + '?url=' + mv.brs[480]"  v-if="mv.brs" autoplay loop id="video"></video>
        <div class="operate-box" v-if="mv.brs">
            <a href="javascript:;" class="go-play" @click="setStop":class="{'no-playying' : !isPlay}"></a>
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

    <div class="details-nav">
        <a href="javascript:;" class="nav-item active">详情</a>
        <a href="javascript:;" class="nav-item">评论</a>
        <a href="javascript:;" class="nav-item">相关MV</a>
    </div>

    <div class="details-box">
        <div class="detail-box">
            <div class="header-box">
                <div class="name-author">
                    <p v-html="mv.name" class="mv-name"></p>
                    <p>歌手：<span v-html="mv.artistName"></span></p>
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
    name : 'index',

    data() {
        return {
            isLoading : true,
            mv : {},
            currentTime : 0,
            isPlay : true,
            isAllScreen : false
        }
    },

    computed : {

    },

    mounted() {
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
                setInterval( () => {
                    if ( this.isPlay ) {
                        this.currentTime = parseInt(video.currentTime);
                        move.style.webkitTransform = 'translate3d('+ this.currentTime/(this.mv.duration/1000) * 180 +'px, 0px,0px)';
                    }
                }, 1000);
            });
        },

        getMv() {
            return new Promise( (resolve, reject) => {
                this.axios.get(this.API.mv + '?mvid=' + this.$route.query.id).then( ( data ) => {
                    resolve();
                    this.mv = data.data.data;
                    console.log(this.mv);
                });
            });
        },

        // 控制是否播放
        setStop() {
            let video = document.getElementById('video');
            this.isPlay = !this.isPlay;
            if ( this.isPlay ) {
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
.play-box {
    position: relative;
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
    padding: 0 .5rem;
}
.mv-name {
    font-size: 1.2rem;
}
/* 导航结束 */

</style>
