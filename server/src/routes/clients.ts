import express from 'express'
import { body, validationResult } from 'express-validator'

import { routeHandler, HttpError } from '../libs/utils'
import clients from '../services/clients'

const router = express.Router()

const emailInUseValidator = async (email) => (await clients.emailBusy(email) ? Promise.reject('Email in use') : Promise.resolve())

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
router.post('/', [
  body('name').exists().isString(),
  body('phone').exists().isString().isLength({ min: 5}),
  body('email').exists().isEmail().custom(emailInUseValidator),
], routeHandler(async (req, res) => {
  const { name, email, phone } = req.body

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

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
router.patch('/:clientId', [
  body('name').optional().isString().isLength({ min: 5 }),
  body('phone').optional().isString().isLength({ min: 5}),
  body('email').optional().isEmail().custom(emailInUseValidator),
], routeHandler(async (req, res) => {
  await clients.patch(req.params.clientId, req.body)

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

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