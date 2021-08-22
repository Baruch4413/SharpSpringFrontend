import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState({
      key: 'sharp_spring',
  })],
  state: {
      access_token: '',
      user: {
      },
  },
  mutations: {
      setAccessToken: function(state, token) {
          state.access_token = token;
      }
  },
  actions: {
  },
  modules: {
  }
})
