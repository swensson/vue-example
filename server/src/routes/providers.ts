import express from 'express'
import { body, validationResult } from 'express-validator'

import { routeHandler, HttpError } from '../libs/utils'
import providers from '../services/providers'

const router = express.Router()

/**
 * Create a provider
 */
router.post('/', [
  body('name').exists().isString(),
], routeHandler(async (req, res) => {
  /* Handle input data validation errors */
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new HttpError(422, errors.array())
  }

  const provider = await providers.create(req.body.name)

  res.json(provider)
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
router.patch('/:providerId', [
  body('name').exists().isString(),
], routeHandler(async (req, res) => {
  /* Handle input data validation errors */
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new HttpError(422, errors.array())
  }

  const provider = await providers.patch(req.params.providerId, req.body)

  res.json(provider)
}))

/**
 * Delete a provider
 */
router.delete('/:providerId', routeHandler(async (req, res) => {
  /* Check provider existence */
  const provider = providers.get(req.params.providerId)

  if (!provider) {
    throw new HttpError(404)
  }
  
  await providers.delete(req.params.providerId)

  res.sendStatus(200)
}))

export default router