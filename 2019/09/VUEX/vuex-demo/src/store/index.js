import Vue from 'vue';
import vuex from 'vuex'

Vue.use(vuex)

const store = new vuex.Store({
  state: {
    name: 'value'
  },
  mutations: {
    valueChange (state, n) {
      if (n) {
        state.name = `new Value: ${n}`
      } else {
        state.name = 'new Value'
      }
    }
  },
  getters: {
    getLength: (state) => (key) => {
      if (key) {
        return state.name.length + key
      } else {
        return state.name.length
      }
    }
  },
  actions: {
    getChangeValue (context) {
      context.commit('valueChange', 'actions getChangeValue')
    }
  }
})
export default store;
