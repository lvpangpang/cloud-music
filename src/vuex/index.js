import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store( {
    state : {
        isPlay : true,
        playSongId : 185811,
        playSongIndex : 0,
        playSong : {},
        historyList : []
    },
    mutations : {

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
        }

    },
    actions: {
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
        }
    }
});

export default store;