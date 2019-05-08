
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import home from './store/modules/home'

Vue.use(Vuex)

const store = new Vuex.Store({
	plugins: [createPersistedState()],
    modules: {
        home
    }
})

export default store
