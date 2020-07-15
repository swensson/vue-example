import mongoose from '../libs/mongoose'

export default mongoose.model('Client', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  providers: [
    mongoose.Schema.Types.ObjectId
  ],
}, { timestamps: true }))