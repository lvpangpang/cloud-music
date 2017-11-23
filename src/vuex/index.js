import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store( {
    state : {
        isPlay : true,
    },
    mutations : {
        setIsPlay( state, flag ) {
            state.isPlay = flag;
        },

    },
    actions: {
        setIsPlay1( context, flag ) {
            context.commit('setIsPlay', flag);
        }
    }
});

export default store;