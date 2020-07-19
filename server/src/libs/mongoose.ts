import mongoose from 'mongoose'

const URL =
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export default mongoose