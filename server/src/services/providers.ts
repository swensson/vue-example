import Client from '../models/Client'
import Provider from '../models/Provider'

export default {
  /**
   * Create a provider
   */
  create: async (name: string) => {
    return Provider.create({ name }).then(({ _id }) => _id)
  },

  /**
   * Just retrieve all providers
   */
  all: async () => {
    return await Provider.find({}).exec()
  },

  /**
   * Get provider by id
   */
  get: async (id: string) => {
    return await Provider.findById(id)
  },

  /**
   * Update a provider
   */
  patch: async (id: string, patch: any) => {
    return await Provider.findOneAndUpdate({ _id: id }, patch, { new: true })
  },

  /**
   * Delete a provider
   */
  delete: async (id: string) => {
    await Client.updateMany({ providers: { $elemMatch: { $eq: id } } }, { $pull: { providers: id } })
    await Provider.deleteOne({ _id: id })
  },
}