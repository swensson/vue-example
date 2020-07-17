import Client from '../models/Client'

export default {
  /**
   * Create a client
   */
  create: async (name: string, email: string, phone: string) => {
    const client = await Client.create({
      name, email, phone, providers: []
    })

    return client._id
  },

  /**
   * Just retrieve all clients
   */
  all: async () => {
    const clients = await Client.find({}).exec()

    return clients
  },

  /**
   * Get client by id
   */
  get: async (id: string) => {
    return await Client.findById(id)
  },

  /**
   * Update a client
   */
  patch: async (id: string, patch: any) => {
    await Client.updateOne({ _id: id }, patch).exec()
  },

  /**
   * Delete a client
   */
  delete: async (id: string) => {
    await Client.remove({ _id: id })
  },
}