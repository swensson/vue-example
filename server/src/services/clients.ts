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
    const clients = await Client.find({}).populate('providers').exec()

    return clients
  },

  /**
   * Get client by id
   */
  get: async (id: string) => {
    return await Client.findById(id).populate('providers')
  },

  /**
   * Update a client
   */
  patch: async (id: string, patch: any) => {
    return await Client.findOneAndUpdate({ _id: id }, patch, { new: true })
  },

  /**
   * Delete a client
   */
  delete: async (id: string) => {
    await Client.deleteOne({ _id: id })
  },

  /**
   * Attach provider to the client
   */
  attachProvider: async (clientId: string, providerId: string) => {
    return await Client.findOneAndUpdate({ _id: clientId }, { $push: { providers: providerId } }, { new: true })
  },

  /**
   * Detach provider from the client
   */
  detachProvider: async (clientId: string, providerId: string) => {
    return await Client.findOneAndUpdate({ _id: clientId }, { $pull: { providers: providerId } }, { new: true })
  },

  /**
   * Check whether an email is taken
   */
  emailBusy: async (email: string) => {
    return Client.find({ email }).exec().then((clients) => clients.length > 0)
  },
}