import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store( {
    state : {
        isPlay : true,
        historyList : []
    },
    mutations : {
        setIsPlay( state, flag ) {
            state.isPlay = flag;
        },
        addHistoryList( state, song ) {
            // 判断是非同一首
            let songIndex = null;
            state.historyList.forEach(( item, index, arr) => {
                if ( item.id === song.id ) {
                    songIndex = index;
                }
            });
            if ( songIndex!==null ) {
                state.historyList.splice(songIndex, 1);
            }
            state.historyList.unshift(song);
        },

    },
    actions: {
        setIsPlay1( context, flag ) {
            context.commit('setIsPlay', flag);
        },
        addHistoryList( context, song ) {
            context.commit('addHistoryList', song);
        }
    }
});

export default store;