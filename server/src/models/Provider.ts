import mongoose from '../libs/mongoose'

export default mongoose.model('Provider', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  providers: [
    mongoose.Schema.Types.ObjectId
  ],
}, { timestamps: true }))