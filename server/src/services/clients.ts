import Client from '../models/Client'

export default {
  /**
   * Just retrieve all clients
   */
  all: async () => {
    const clients = await Client.find({}).exec()

    return clients
  },

  /**
   * Create a client
   */
  create: async (name: string, email: string, phone: string) => {
    const client = await Client.create({
      name, email, phone, providers: []
    })

    return client._id
  },
}