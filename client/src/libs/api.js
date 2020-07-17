import axios from 'axios'

const instance = axios.create({ baseURL: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}` })

export default {
  getClients: () =>
    instance.get('/clients').then(({ data }) => data),
}