import dotenv from 'dotenv'

dotenv.config()

import express from 'express'

const app = express()

app.get('/health', (req, res) => {
  res.sendStatus(200)
})

/**
 * Simple error middleware
 */
app.use((err, req, res, next) => {
  if (!!err.code) {
    res.status(err.code).send(err.toString())
  } else {
    res.status(500).send(err.toString())
  }
})

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server is listening at', process.env.SERVER_PORT)
})
