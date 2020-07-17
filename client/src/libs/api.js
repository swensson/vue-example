import axios from 'axios'

const instance = axios.create({
  baseURL: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
  headers: { 'Accept': 'application/json', 'Content-type': 'application/json' },
})

instance.interceptors.response.use((response) => response.data)

export default {
  getClients: () => instance.get('/clients'),
  getProviders: () => instance.get('/providers'),
  createProvider: (body) => instance.post('/providers', body),
  removeProvider: (id) => instance.delete(`/providers/${id}`),
}