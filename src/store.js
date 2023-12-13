import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

const app = createApp(App)

export default new Vuex.Store({
  state: {
    userIsLoggedIn: localStorage.getItem('userIsLoggedIn') === 'true' || false, // Recuperar desde localStorage
    access_token: localStorage.getItem('access_token') || null,
  },
  mutations: {
    setUserIsLoggedIn(state, value) {
      state.userIsLoggedIn = value
      localStorage.setItem('userIsLoggedIn', value.toString());
    },
    setAccessToken(state, value) {
      state.access_token = value
      localStorage.setItem('access_token', value);
    }

  },
})