import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

const app = createApp(App)

export default new Vuex.Store({
  state: {
    userIsLoggedIn: false,
  },
  mutations: {
    setUserIsLoggedIn(state, value) {
      state.userIsLoggedIn = value
    },
  },
})