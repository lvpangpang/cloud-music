<template>
<div class="play-box">
    <img :src="songDetail.al.picUrl" class="bg" v-if="songDetail.al" />
    <navHeader :name="songDetail.name"></navHeader>
    <loading :isLoading="isLoading"></loading>
    <div class="show-box">
        <div class="pendant"></div>
        <div class="turn-table" @click="setStop">
            <div class="img-box" v-bind:class="{stop : !isPlay}" >
                <img :src="songDetail.al.picUrl"  v-if="songDetail.al" />
            </div>
        </div>
    </div>
    <div class="control-box">
        <div class="time-box">
            <span v-html="currentTime"></span>
            <div class="play-line">
                <span class="move" id="move"></span>
            </div>
            <span v-html="duration"></span>
        </div>
        <div class="operate-box">
            <a href="javascript:;" class="play-type"></a>
            <a href="javascript:;" class="prev-btn"></a>
            <a href="javascript:;" class="go-play" v-bind:class="{playying : isPlay}" @click="setStop"></a>
            <a href="javascript:;" class="next-btn"></a>
            <a href="javascript:;" class="play-list"></a>
        </div>
    </div>
    <audio :src='playSong.url' controls="controls" preload id="music" hidden></audio>
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
            playSong : {},
            songDetail : {}
        }
    },

    computed : {
        ...mapState([
            'isPlay'
        ])
    },

    mounted() {
        this.getData();
        this.getSongDetails();
        let audio = null,
            move = document.getElementById('move');
        setTimeout( () => {
            audio = document.getElementById('music');
            this.duration = this.time(audio.duration);
            if ( this.isPlay ) {
                audio.play();
            }
        }, 1000);

        setInterval( () => {
            this.currentTime = this.time(audio.currentTime);
            move.style.left = (audio.currentTime/audio.duration * 250) + 'px';

        }, 1000);


    },

    components: {
        navHeader,
        loading
    },

    methods : {
        ...mapActions([
            'setIsPlay1',
        ]),

        setStop() {
            let audio = document.getElementById('music');
            this.setIsPlay1(!this.isPlay);
            if ( this.isPlay ) {
                audio.play();
            } else {
                audio.pause();
            }
        },

        getData() {
            this.axios.get(this.API.play +'?id=' + this.$route.query.id).then( ( data ) => {
                this.isLoading = false;
                this.playSong = data.data.data[0];
                console.log(data.data);
            });
        },

        getSongDetails() {
            this.axios.get(this.API.songDetail +'?ids=' + this.$route.query.id).then( ( data ) => {
                console.log(data.data.songs[0]);
                this.songDetail = data.data.songs[0];
            });
        },

        time(secs) {
            let se = parseInt(secs),
                mins = parseInt(se/60),
                sec = parseInt(se%60);
            return (mins < 10 ? ('0' + mins) : mins)   + ':' + (sec < 10 ? ('0' + sec) : sec);

        }

    }
}
</script>

<style scoped>
.play-box {
    height: 45.5rem;
    padding-top: 3rem;
}
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
    width: 18rem;
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
    background: url(../images/seq.png) no-repeat center / 4rem 4rem;
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

</style>
