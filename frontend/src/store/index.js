import { createStore } from 'vuex'

export default createStore({
  state: {
    mode: 'connection'
  },
  mutations: {
    modifyMode(state, newMode){
      this.state.mode = newMode
    }
  },
  actions: {
  },
  modules: {
  }
})
