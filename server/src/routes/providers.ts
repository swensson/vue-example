import express from 'express'

import { routeHandler } from '../libs/utils'
import providers from '../services/providers'

const router = express.Router()

/**
 * Create a provider
 */
router.post('/', routeHandler(async (req, res) => {
  const { name } = req.body

  res.json(await providers.create(name))
}))

/**
 * Get all providers
 */
router.get('/', routeHandler(async (req, res) => {
  res.json(await providers.all())
}))

/**
 * Update a provider
 */
router.patch('/:providerId', routeHandler(async (req, res) => {
  res.json(await providers.patch(req.params.providerId, req.body))
}))

/**
 * Delete a provider
 */
router.delete('/:providerId', routeHandler(async (req, res) => {
  res.json(await providers.delete(req.params.providerId))
}))

export default router