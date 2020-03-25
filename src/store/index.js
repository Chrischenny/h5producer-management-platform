import Vue from 'vue';
import vuex from 'vuex'

Vue.use(vuex);

const state = {
    movieuploadVisible:false,
    gameuploadVisible:false,
    moviemanagerVisible:false
}

var mutations = {
    initAuthorization(state,Authorization){
        state.moviemanagerVisible = Authorization.moviemanagerVisible;
        state.gameuploadVisible = Authorization.gameuploadVisible;
        state.movieuploadVisible = Authorization.movieuploadVisible;
    }
}

export default new vuex.Store({
    state,
    mutations
})