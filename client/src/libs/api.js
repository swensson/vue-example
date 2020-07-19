import axios from 'axios'

const instance = axios.create({
  baseURL: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
  headers: { 'Accept': 'application/json', 'Content-type': 'application/json' },
})

instance.interceptors.response.use((response) => response.data)

export default {
  getClients: () => instance.get('/clients'),
  createClient: (body) => instance.post('/clients', body),
  updateClient: (id, body) => instance.patch(`/clients/${id}`, body),
  removeClient: (id) => instance.delete(`/clients/${id}`),
  attachProvider: (clientId, providerId) => instance.post(`/clients/${clientId}/providers/${providerId}`),
  emailBusy: (email, id) => instance.post(`/clients/emails/check`, { email, id }),

  getProviders: () => instance.get('/providers'),
  createProvider: (body) => instance.post('/providers', body),
  removeProvider: (id) => instance.delete(`/providers/${id}`),
  renameProvider: (id, name) => instance.patch(`/providers/${id}`, { name }),
}