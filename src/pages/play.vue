<template>
<div class="com-nav-top">
    <img :src="songDetail.al.picUrl" class="bg" v-if="songDetail.al" />
    <navHeader :name="songDetail.name"></navHeader>
    <loading :isLoading="isLoading"></loading>
    <div class="show-box">
        <div class="pendant" v-if="!showWords"></div>
        <div class="turn-table" @click="showSongWords" v-if="!showWords">
            <div class="img-box" v-bind:class="{stop : !isPlay}" >
                <img :src="songDetail.al.picUrl"  v-if="songDetail.al" />
            </div>
        </div>
        <div @click="showSongWords" class="song-words" id="songWords" v-if="songWords.lrc" :class="{top : showWords}">
            <div class="song-words-inner" id="songInner">
                <p v-for="(data, index) in songWords.lrc.lyric" key="{{index}}" v-html="data.slice(data.indexOf(']')+1)" :class="{active: currentTime >= songTimeList[index] && currentTime < songTimeList[index+1] }" :data-time="songTimeList[index]"></p>
            </div>
        </div>
    </div>
    <div class="control-box">
        <div class="time-box">
            <span v-html="time(currentTime)"></span>
            <div class="play-line">
                <span class="move" id="move"></span>
            </div>
            <span v-html="duration"></span>
        </div>
        <div class="operate-box">
            <a href="javascript:;" class="play-type" @click="setIsBelong1" :class="{'one-play' : isBelong}"></a>
            <a href="javascript:;" class="prev-btn" @click="perv"></a>
            <a href="javascript:;" class="go-play" @click="setStop" :class="{playying : isPlay}"></a>
            <a href="javascript:;" class="next-btn" @click="next"></a>
            <a href="javascript:;" class="play-list" @click="showHistory"></a>
        </div>
    </div>

    <transition name="top">
        <div class="history-box" v-if="showHistoryFlag">
            <div class="history-bg" @click="showHistory"></div>
            <div class="history-main">
                <h3 class="h3">播放列表</h3>
                <div class="list-box">
                    <a href="javascript:;" class="history-item" v-for="(data , index) in historyList" key={{index}} :data-id="data.id" @click="goPlay(data.id)" :class="{active : playSongId == data.id}">
                        <span v-html="data.songName"></span>
                        <span class="play-mark"></span>
                    </a>
                </div>
            </div>
        </div>
    </transition>
    <!-- <audio :src='playSong.url' controls="controls" preload id="music" hidden></audio> -->

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
            duration : '',
            currentTime : '00:00',
            songWords : {},
            playSong : {},
            showHistoryFlag : false,
            songDetail : {},
            showWords: false,
            songTimeList : []
        }
    },

    computed : {
        ...mapState([
            'isPlay',
            'historyList',
            'playSongId',
            'playSongIndex',
            'isBelong'
        ])
    },

    mounted() {
        this.getData(this.$route.query.id);
        this.getSongDetails(this.$route.query.id);
        this.getSongWords(this.$route.query.id);
    },

    components: {
        navHeader,
        loading
    },

    methods : {
        ...mapActions([
            'setIsPlay1',
            'addHistoryList1',
            'setPlaySongId1',
            'setPlaySongIndex1',
            'setPlaySong1',
            'setIsBelong1'
        ]),

        showSongWords() {
            let songWordsDom = document.getElementById('songWords');
            this.showWords = !this.showWords;
            if ( this.showWords ) {
                songWordsDom.style.visibility = 'visible';
            } else {
                songWordsDom.style.visibility = 'hidden';
            }
        },

        setStop() {
            let audio = document.getElementById('music');
            this.setIsPlay1(!this.isPlay);
            if ( this.isPlay ) {
                audio.play();
            } else {
                audio.pause();
            }
        },

        getData(songId) {
            this.axios.get(this.API.play +'?id=' + songId).then( ( data ) => {
                this.isLoading = false;
                this.setPlaySong1(data.data.data[0]);
            });
        },

        getSongDetails(songId) {
            this.axios.get(this.API.songDetail +'?ids=' + songId).then( ( data ) => {
                this.songDetail = data.data.songs[0];
                this.setPlaySongId1(this.songDetail.id);
                this.addHistoryList1({
                    id : songId,
                    songName : this.songDetail.name
                });
                this.fn();
            });
        },

        getSongWords(songId) {
            this.axios.get(this.API.lyric +'?id=' + songId).then( ( data ) => {
                this.songWords = data.data;
                console.log(data.data);
                this.songWords.lrc.lyric = this.songWords.lrc.lyric.replace(/\n/g,"<br/>").split("<br/>");

                this.songWords.lrc.lyric.forEach( ( item, index, arr) => {
                    let time = this.calSeconds(item.slice(item.indexOf('[')+1, item.indexOf(']')));
                    this.songTimeList.push( time );
                });

                console.log(this.songTimeList);
            });
        },

        time(secs) {
            let se = parseInt(secs),
                mins = parseInt(se/60),
                sec = parseInt(se%60);
            return (mins < 10 ? ('0' + mins) : mins)   + ':' + (sec < 10 ? ('0' + sec) : sec);
        },

        // 计算秒
        calSeconds(time) {
            let min = parseInt(time.slice(0, time.indexOf(':'))),
                sec = parseInt(time.slice(time.indexOf(':')+1));
            return min * 60 + sec;
        },

        showHistory() {
            this.showHistoryFlag = !this.showHistoryFlag;
        },

        goPlay(songId) {
            this.getData(songId);
            this.getSongDetails(songId);
        },

        fn() {
            let move = document.getElementById('move'),
                audio = document.getElementById('audio'),
                startLeft = 0,
                startX = 0,
                startY = 0,
                moveX = 0,
                moveY = 0,
                swipeX = true,
                swipeY = false,
                x = 0,
                oThis = this,
                k = 100,
                songWordsDom = null;

            // 手动控制播放进度
            move.addEventListener('touchstart', function(event) {
                startX = event.targetTouches[0].pageX;
                startY = event.targetTouches[0].pageY;
            }, false);
            move.addEventListener('touchmove', function(event) {
                moveX = event.targetTouches[0].pageX;
                moveY = event.targetTouches[0].pageY;
                if ( swipeX  && Math.abs(moveX - startX) >= Math.abs(moveY - startY) ) {
                    event.preventDefault();
                    swipeY = false;
                    x = parseFloat(move.style.left) + event.targetTouches[0].pageX - startX;
                    startX = event.targetTouches[0].pageX;
                    x = Math.min(Math.max(0 , x), 250);
                    move.style.left =  x + 'px';
                } else if ( swipeY && Math.abs(moveX - startX) < Math.abs(moveY - startY) ) {
                    swipeX = false;
                }
            }, false);
            move.addEventListener('touchend', function(event) {
                move.style.left =  x + 'px';
                audio.currentTime = x/250 * audio.duration;
            }, false);

            setTimeout( () => {
                audio = document.getElementById('music');
                songWordsDom = document.getElementById('songInner');
                this.duration = this.time(audio.duration);
                if ( this.isPlay ) {
                    audio.play();
                }
            }, 1000);
            setInterval( () => {
                this.currentTime = parseInt(audio.currentTime);
                move.style.left = (audio.currentTime/audio.duration * 250) + 'px';
                this.songTimeList.forEach( (item, index, arr) => {
                    if ( this.currentTime>item && item<arr[index+1] ) {
                        k = 24 * index;
                        if ( songWordsDom != null ) {
                            songWordsDom.style.WebkitTransform = `translateY(${100-k}px)`;
                        }
                    }
                });
                if ( audio.currentTime >= audio.duration ) {
                    this.next();
                }
            }, 1000);
        },

        perv() {
            if ( this.playSongIndex===0 ) {
                this.setPlaySongIndex1(this.historyList.length-1);
            } else {
                this.setPlaySongIndex1(this.playSongIndex-1);
            }
            this.goPlay(this.historyList[this.playSongIndex].id);
        },

        next() {
            // 单曲循环
            if ( this.isBelong ) {
                this.goPlay(this.historyList[this.playSongIndex].id);
                return;
            }
            if ( this.playSongIndex===this.historyList.length-1 ) {
                this.setPlaySongIndex1(0);
            } else {
                this.setPlaySongIndex1(this.playSongIndex+1);
            }
            this.goPlay(this.historyList[this.playSongIndex].id);
        }

    }
}
</script>

<style scoped>
.bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter:blur(6px);
}

.show-box {
    position: relative;
}
.pendant {
    position: absolute;
    z-index: 2;
    left: 12rem;
    top: -0.3rem;
    width: 6rem;
    height: 10rem;
    background: url(../images/stick-bg.png) no-repeat center / 6rem 10rem;
}
.turn-table {
    position: absolute;
    z-index: 1;
    left: 4rem;
    top: 7rem;
    width: 18rem;
    height: 18rem;
    border: 40px solid #000;
    border-radius: 50%;
}
.turn-table:after {
    content:'';
    position: absolute;
    z-index: -1;
    left: 50%;
    top:50%;
    transform: translateX(-50%) translateY(-50%);
    width: 20rem;
    height: 20rem;
    background: rgba( 244, 244, 244, .2);
    border-radius: 50%;
}
@keyframes circling {
    0%{
        transform:rotate(0);
    }
    50%{
        transform:rotate(180deg);
    }
    100%{
        transform:rotate(360deg);
    }
}
.img-box {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    -webkit-animation: circling 20s infinite linear;
    animation: circling 20s infinite linear;
}
.stop {
    animation-play-state:paused;
}
.img-box img {
    width: 100%;
    height: 100%;
}

.control-box {
    position:absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 8rem;
}
.time-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    height: 2rem;
    font-size: .8rem;
    padding: 0 1rem;
}
.play-line {
    position: relative;
    width: 250px;
    height: 2px;
    background: #dedede;
}
.move {
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

.operate-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 1rem;
    height: 4rem;
}
.operate-box a {
    width: 4rem;
    height: 4rem;
}
.play-type {
    background: url(../images/nobelong.png) no-repeat center / 4rem 4rem;
}
.prev-btn,
.next-btn {

    background: url(../images/next.png) no-repeat center / 4rem 4rem;
}
.prev-btn {
    transform: rotate(180deg);
}
.go-play {
    background: url(../images/play.png) no-repeat center / 4rem 4rem;
}
.playying {
    background: url(../images/pause.png) no-repeat center / 4rem 4rem;
}
.play-list {
    background: url(../images/list.png) no-repeat center / 4rem 4rem;
}
.one-play {
    background: url(../images/belong.png) no-repeat center / 4rem 4rem;
}

.history-box {

}
.history-box .h3 {
    line-height: 3rem;
    text-align: center;
    font-size: 1.2rem;
    border-bottom: 1px solid #dedede;
}
.history-box .list-box {
    height: 22rem;
    overflow-y: auto;
}
.history-box .history-item {
    display: block;
    line-height: 2.5rem;
    margin-left: 1rem;
    padding-right: 1rem;
    border-bottom: 1px solid #dedede;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.history-box .active {
    color: #d43c33;
}
.history-box .history-bg {
    content:'';
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(233, 245, 255, .4);
}
.history-box .history-main {
    position: fixed;
    z-index:3;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 25rem;
    background: #fff;
}

/* 歌词开始 */
.song-words {
    visibility:hidden;
    height: 20rem;
    padding: 1rem 2rem;
    margin: 0 auto;
    word-break: break-all;
    overflow-y: auto;
    color: #efefef;
    text-align:center;
}
.top {
    margin: 10rem auto 0;
}
.song-words p {
    opacity: .5;
    line-height: 2;
}
.song-words .active {
    color: #fff;
    opacity: 1;
}
.song-words .song-words-inner {
    transform: translateY(100px);
    transition: all .6s;
}
/* 歌词结束 */

</style>

