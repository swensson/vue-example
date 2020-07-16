const domain = `counter`

export const INCREMENT_COUNTER = `${domain}/INCREMENT_COUNTER`
export const GET_COUNTER = `${domain}/GET_COUNTER`

export default {
  state: {
    counter: 0,
  },
  
  getters: {
    [GET_COUNTER]: (state) => state.counter,
  },

  mutations: {
    test: (state) => {
      state.counter += 1
    },
  },

  actions: {
    [INCREMENT_COUNTER]: ({ commit }) => {
      commit('test')
    },
  },
}