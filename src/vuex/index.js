import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state : {

        // 是否登录
        isLogin : false,

        // 是否显示登录组件
        isShowLogin : false,

        // 是否显示播放音乐组件
        isShowPlay : false,

        // 是否正在播放
        isPlay : true,

        // 当前播放歌曲id
        playSongId : 185811,

        // 当前播放歌曲index
        playSongIndex : 0,

        // 是否单曲循环
        isBelong : false,

        // 播放歌曲对象
        playSong : {},

        // 历史播放记录
        historyList : [],

        // 选择歌单分类
        chooseClass : ''
    },
    mutations : {

        setIsShowPlay ( state, obj ) {
            state.isShowPlay = obj.flag;
            state.playSongId = obj.playSongId;
            if ( state.isShowPlay ) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        },

        setLogin(state, flag) {
            state.isLogin = flag;
        },

        setCurrentTime( state, time ) {
            state.currentTime1 = time;
        },

        setIsBelong( state, flag ) {
            state.isBelong = !state.isBelong;
        },

        setIsPlay( state, flag ) {
            state.isPlay = flag;
        },

        addHistoryList( state, song ) {
            // 判断是非同一首
            let songIndex = null,
                flag  = true;
            state.historyList.forEach(( item, index, arr) => {
                if ( item.id == song.id ) {
                    songIndex = index;
                    flag = false;
                }
            });
            if ( flag ) {
                state.historyList.unshift(song);
            }

            state.historyList.forEach(( item, index, arr) => {
                if ( item.id == state.playSongId ) {
                    state.playSongIndex = index;
                }
            });
        },

        setPlaySongId( state, playSongId  ) {
            state.playSongId = playSongId;
        },

        setPlaySong( state, song ) {
            state.playSong = song;
        },

        setPlaySongIndex( state, playSongIndex )   {
            state.playSongIndex = playSongIndex;
        },

        setChooseClass( state, className ) {
            state.chooseClass = className;
        }

    },
    actions: {

        setIsShowPlay1( context, obj ) {
            context.commit('setIsShowPlay', obj);
        },

        setLogin1( context, flag ) {
            context.commit('setLogin', flag);
        },

        setShowLogin1( context, flag ) {
            context.commit('setShowLogin', flag);
        },

        setIsBelong1( context, flag ) {
            context.commit('setIsBelong', flag);
        },

        setIsPlay1( context, flag ) {
            context.commit('setIsPlay', flag);
        },
        addHistoryList1( context, song ) {
            context.commit('addHistoryList', song);
        },
        setPlaySongId1( context, playSongId  ) {
            context.commit('setPlaySongId', playSongId );
        },
        setPlaySongIndex1( context, playSongIndex  ) {
            context.commit('setPlaySongIndex', playSongIndex );
        },
        setPlaySong1( context, song  ) {
            context.commit('setPlaySong', song );
        },
        setChooseClass1( context, className  ) {
            context.commit('setChooseClass', className );
        }
    }
});

export default store;