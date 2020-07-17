import api from '@/libs/api'

const domain = `clients`

export const FETCH_CLIENTS = `${domain}/FETCH_CLIENTS`
export const FETCH_PROVIDERS = `${domain}/FETCH_PROVIDERS`
export const CREATE_PROVIDER = `${domain}/CREATE_PROVIDER`
export const REMOVE_PROVIDER = `${domain}/REMOVE_PROVIDER`

export const GET_CLIENTS = `${domain}/GET_CLIENTS`
export const GET_PROVIDERS = `${domain}/GET_PROVIDERS`

export default {
  state: {
    clients: { loading: true, value: [] },
    providers: { loading: true, value: [] },
  },

  getters: {
    [GET_CLIENTS]: (state) =>
      state.clients,
    [GET_PROVIDERS]: (state) =>
      state.providers,
  },

  mutations: {
    setClients: (state, payload) => {
      state.clients = { ...state.clients, ...payload }
    },
    setProviders: (state, payload) => {
      state.providers = { ...state.providers, ...payload }
    },
  },

  actions: {
    [FETCH_CLIENTS]: ({ commit }, payload) => {
      commit('setClients', { loading: true })
      api.getClients().then((clients) => {
        const mappedClients = clients.map((client) => ({
          ...client, providers: client.providers.map(({ name }) => name).join(', ') || '(none)'
        }))

        commit('setClients', { loading: false, value: mappedClients })
      }).catch((err) => {
        commit('setClients', { loading: false })
      })
    },

    [FETCH_PROVIDERS]: ({ commit }, payload) => {
      commit('setProviders', { loading: true })
      api.getProviders().then((providers) => {
        commit('setProviders', { loading: false, value: providers })
      }).catch((err) => {
        commit('setProviders', { loading: false })
      })
    },

    [CREATE_PROVIDER]: ({ commit, dispatch }, payload) => {
      api.createProvider(payload).then((data) => {
        dispatch(FETCH_PROVIDERS)
      }).catch((err) => {

      })
    },

    [REMOVE_PROVIDER]: ({ commit, dispatch }, payload) => {
      api.removeProvider(payload).then((data) => {
        dispatch(FETCH_PROVIDERS)
      }).catch((err) => {

      })
    },
  },
}
