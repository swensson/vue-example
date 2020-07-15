import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerDoc from '../swagger.json'

const app = express()

app.get('/health', (req, res) => {
  res.sendStatus(200)
})

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

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
