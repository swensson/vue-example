import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import swaggerUI from 'swagger-ui-express'
import swaggerDoc from '../swagger.json'
import mongoose from './libs/mongoose'

import clients from './routes/clients'
import providers from './routes/providers'

const app = express()

/* Parse body */
app.use(bodyParser.json())

/**
 * Just disable CORS for everything (no whitelist for now).
 * As soon as we deploy to prod and know domain this can be
 * updated.
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept')

  next()
})

/**
 * Do a simple healthcheck for database
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    /* State 1 means that mongoose is connected */
    mongoose: mongoose.connection.readyState === 1
  })
})

/**
 * Use docs in development mode
 */
if (process.env.NODE_ENV === 'devleopment') {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
}

/**
 * Connect API routes. Use /api/v1 for future
 * possible migrations flexibility.
 */
app.use('/api/v1/clients', clients)
app.use('/api/v1/providers', providers)

/**
 * Simple error middleware
 */
app.use((err, req, res, next) => {
  if (!!err.statusCode) {
    res.status(err.statusCode).json(err.body || null)
  } else {
    res.status(500).send(err.toString())
  }
})

/**
 * Startup! Disable this code when running in test env
 * and export app for supertest or whatever
 */
app.listen(process.env.SERVER_PORT, () => {
  console.log('Server is listening at', process.env.SERVER_PORT)
})
