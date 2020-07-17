import express from 'express'

import { routeHandler, HttpError } from '../libs/utils'
import clients from '../services/clients'

const router = express.Router()

/**
 * Get all clients
 */
router.get('/', routeHandler(async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    throw new HttpError(404)
  }

  res.json(await clients.all())
}))

/**
 * Create a client
 */
router.post('/', routeHandler(async (req, res) => {
  const { name, email, phone } = req.body

  res.json(await clients.create(name, email, phone))
}))

/**
 * Get one client
 */
router.get('/:clientId', routeHandler(async (req, res) => {
  const client = await clients.get(req.params.clientId)

  if (!client) {
    throw new HttpError(404)
  }

  res.json(client)
}))

/**
 * Update a client
 */
router.patch('/:clientId', routeHandler(async (req, res) => {
  await clients.patch(req.params.clientId, req.body)

  res.json(await clients.get(req.params.clientId))
}))

/**
 * Delete a client
 */
router.delete('/:clientId', routeHandler(async (req, res) => {
  await clients.delete(req.params.clientId)

  res.sendStatus(200)
}))

/* Client / Provider relationship */

/**
 * Attach provider to the client
 */
router.post('/:clientId/providers/:providerId', routeHandler(async (req, res) => {
  res.json(await clients.attachProvider(req.params.clientId, req.params.providerId))
}))

/**
 * Detach provider off the client
 */
router.delete('/:clientId/providers/:providerId', routeHandler(async (req, res) => {
  res.json(await clients.detachProvider(req.params.clientId, req.params.providerId))
}))

export default router