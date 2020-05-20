//引入Vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'

Vue.use(Vuex)


import actions from './actions'
import mutations from './mutations'
import state from './state'
import getters from './getters'

export default new Vuex.Store({
actions,
mutations,
state,
getters
})