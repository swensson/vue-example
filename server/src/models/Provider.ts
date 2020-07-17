import mongoose from '../libs/mongoose'

export default mongoose.model('Provider', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
}, { timestamps: true }))