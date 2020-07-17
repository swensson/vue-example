import api from '@/libs/api'

const domain = `clients`

export const FETCH_CLIENTS = `${domain}/FETCH_CLIENTS`
export const GET_CLIENTS = `${domain}/GET_CLIENTS`

export default {
  state: {
    clients: {
      loading: true,
      value: []
    },
  },

  getters: {
    [GET_CLIENTS]: (state) => state.clients,
  },

  mutations: {
    setClients: (state, payload) => {
      state.clients = { ...state.clients, ...payload }
    },
  },

  actions: {
    [FETCH_CLIENTS]: ({ commit }, payload) => {
      api.getClients().then((clients) => {
        const mappedClients = clients.map((client) => ({
          ...client, providers: client.providers.map(({ name }) => name).join(', ') || '(none)'
        }))

        commit('setClients', { value: mappedClients })
      }).catch((err) => {

      })
    },
  },
}
