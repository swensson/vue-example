import dotenv from 'dotenv'

dotenv.config()

import express from 'express'

const app = express()

app.get('/health', (req, res) => {
  res.sendStatus(200)
})

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server is listening at', process.env.SERVER_PORT)
})
