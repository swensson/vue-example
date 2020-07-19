import { NotificationProgrammatic as Notification } from 'buefy'
import api from '@/libs/api'

const domain = `clients`

export const FETCH_CLIENTS = `${domain}/FETCH_CLIENTS`
export const FETCH_PROVIDERS = `${domain}/FETCH_PROVIDERS`
export const CREATE_PROVIDER = `${domain}/CREATE_PROVIDER`
export const REMOVE_PROVIDER = `${domain}/REMOVE_PROVIDER`
export const RENAME_PROVIDER = `${domain}/RENAME_PROVIDER`
export const CREATE_CLIENT = `${domain}/CREATE_CLIENT`
export const REMOVE_CLIENT = `${domain}/REMOVE_CLIENT`
export const UPDATE_CLIENT = `${domain}/UPDATE_CLIENT`

export const GET_CLIENTS = `${domain}/GET_CLIENTS`
export const GET_PROVIDERS = `${domain}/GET_PROVIDERS`

export default {
  state: {
    clients: { loading: true, value: [] },
    providers: { loading: true, value: [] },
  },

  getters: {
    [GET_CLIENTS]: (state) => state.clients,
    [GET_PROVIDERS]: (state) => state.providers,
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
    /**
     * Fetch Clients action
     */
    [FETCH_CLIENTS]: ({ commit }, payload) => {
      commit('setClients', { loading: true })
      api.getClients().then((clients) => {
        commit('setClients', { loading: false, value: clients })
      }).catch((err) => {
        Notification.open({
          position: 'is-bottom-right',
          type: 'is-danger',
          message: 'Failed fetching clients.'
        })

        commit('setClients', { loading: false })
      })
    },

    /**
     * Create Client action
     */
    [CREATE_CLIENT]: async ({ commit, dispatch }, { name, phone, email, providers }) => {
      commit('setClients', { loading: true })
      try {
        const clientId = await api.createClient({ name, phone, email })

        await Promise.all(providers.map((providerId) => {
          return api.attachProvider(clientId, providerId)
        }))

        dispatch(FETCH_CLIENTS)

        Notification.open({
          position: 'is-bottom-right',
          message: 'Successfulyl created a client'
        })
      } catch (e) {
        console.error(e)
        Notification.open({
          position: 'is-bottom-right',
          type: 'is-danger',
          message: 'Failed to create a client'
        })

        commit('setClients', { loading: false })
      }
    },

    /**
     *
     */
    [UPDATE_CLIENT]: async ({ commit, dispatch }, { id, body }) => {
      commit('setClients', { loading: true })
      try {
        await api.updateClient(id, body)
        dispatch(FETCH_CLIENTS)

        Notification.open({
          position: 'is-bottom-right',
          message: 'Successfulyl updated a client'
        })
      } catch (e) {
        console.error(e)
        Notification.open({
          position: 'is-bottom-right',
          type: 'is-danger',
          message: 'Failed to update a client'
        })

        commit('setClients', { loading: false })
      }
    },

    /**
     * Remove client action
     */
    [REMOVE_CLIENT]: async ({ commit, dispatch }, id) => {
      commit('setClients', { loading: true })
      try {
        await api.removeClient(id)
        dispatch(FETCH_CLIENTS)

        Notification.open({
          position: 'is-bottom-right',
          message: 'Successfulyl removed a client'
        })
      } catch (e) {
        console.error(e)
        Notification.open({
          position: 'is-bottom-right',
          type: 'is-danger',
          message: 'Failed to remove a client'
        })

        commit('setClients', { loading: false })
      }
    },

    /**
     * Providers fetch action
     */
    [FETCH_PROVIDERS]: ({ commit }, payload) => {
      commit('setProviders', { loading: true })
      return api.getProviders().then((providers) => {
        commit('setProviders', { loading: false, value: providers })
      }).catch((err) => {
        Notification.open({
          position: 'is-bottom-right',
          type: 'is-danger',
          message: 'Failed fetching providers.'
        })

        commit('setProviders', { loading: false })
      })
    },

    /**
     * Providers management actions
     */
    [CREATE_PROVIDER]: ({ commit, dispatch }, payload) => {
      commit('setProviders', { loading: true })
      return api.createProvider(payload).then((data) => {
        dispatch(FETCH_PROVIDERS)

        Notification.open({
          position: 'is-bottom-right',
          message: 'Successfulyl created a provider'
        })
      }).catch((err) => {
        Notification.open({
          position: 'is-bottom-right',
          type: 'is-danger',
          message: 'Failed creating provider'
        })

        commit('setProviders', { loading: false })
      })
    },

    [REMOVE_PROVIDER]: ({ commit, dispatch }, payload) => {
      commit('setProviders', { loading: false })
      api.removeProvider(payload).then((data) => {
        dispatch(FETCH_PROVIDERS)

        Notification.open({
          position: 'is-bottom-right',
          message: 'Successfulyl removed a provider'
        })
      }).catch((err) => {
        Notification.open({
          position: 'is-bottom-right',
          type: 'is-danger',
          message: 'Failed removing provider'
        })

        commit('setProviders', { loading: false })
      })
    },

    [RENAME_PROVIDER]: ({ commit, dispatch }, { id, name }) => {
      commit('setProviders', { loading: false })
      api.renameProvider(id, name).then((data) => {
        dispatch(FETCH_PROVIDERS)

        Notification.open({
          position: 'is-bottom-right',
          message: 'Successfulyl renamed a provider'
        })
      }).catch((err) => {
        Notification.open({
          position: 'is-bottom-right',
          type: 'is-danger',
          message: 'Failed renaming provider'
        })

        commit('setProviders', { loading: false })
      })
    },
  },
}
