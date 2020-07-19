import express from 'express'
import { body, validationResult } from 'express-validator'

import { routeHandler, HttpError } from '../libs/utils'
import clients from '../services/clients'
import providers from '../services/providers'

const router = express.Router()

const emailInUseValidator = async (email) => ((await clients.getIdByEmail(email)) !== null ? Promise.reject('Email in use') : Promise.resolve())

/**
 * Get all clients
 */
router.get('/', routeHandler(async (req, res) => {
  res.json(await clients.all())
}))

/**
 * "Create a client" endpoint. Accepts name, phone and email in body.
 * The email should not be in use to proceed.
 */
router.post('/', [
  body('name').exists().isString(),
  body('phone').exists().isString().isLength({ min: 5}),
  body('email').exists().isEmail(),
], routeHandler(async (req, res) => {
  /* Handle input data validation errors */
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new HttpError(422, errors.array())
  }

  const { name, email, phone } = req.body

  /* Check if email is in use */
  const idOfTheClientWithSameEmail = await clients.getIdByEmail(email)

  if (idOfTheClientWithSameEmail !== null) {
    throw new HttpError(422, ['Email in use'])
  }

  res.json(await clients.create(name, email, phone))
}))

/**
 * Get one client by ID
 */
router.get('/:clientId', routeHandler(async (req, res) => {
  const client = await clients.get(req.params.clientId)

  if (!client) {
    throw new HttpError(404)
  }

  res.json(client)
}))

/**
 * Update a client by id.
 */
router.patch('/:clientId', [
  body('name').optional().isString().isLength({ min: 5 }),
  body('phone').optional().isString().isLength({ min: 5}),
  body('email').optional().isEmail(),
], routeHandler(async (req, res) => {
  /* Validate input */
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new HttpError(422, errors.array())
  }

  /* Validate the email */
  if (req.body.email) {
    const id = await clients.getIdByEmail(req.body.email)

    if (id !== null && id !== req.params.clientId) {
      throw new HttpError(422, ['Email in use'])
    }
  }

  /* Update the client */
  const client = await clients.patch(req.params.clientId, req.body)

  res.json(client)
}))

/**
 * Delete a client by ID
 */
router.delete('/:clientId', routeHandler(async (req, res) => {
  /* Retreive the client to check existence */
  const client = await clients.get(req.params.clientId)

  if (!client) {
    throw new HttpError(404)
  }

  await clients.delete(req.params.clientId)

  res.sendStatus(200)
}))

/**
 * The code section below handle client / provider relationships
 */

/**
 * Attach provider to the client
 */
router.post('/:clientId/providers/:providerId', routeHandler(async (req, res) => {
  /* Retreive client and provider to check existence */
  const client = await clients.get(req.params.clientId)
  const provider = await providers.get(req.params.providerId)

  if (!client || !provider) {
    throw new HttpError(404)
  }

  await clients.attachProvider(req.params.clientId, req.params.providerId)

  res.sendStatus(200)
}))

/**
 * Detach provider off the client
 */
router.delete('/:clientId/providers/:providerId', routeHandler(async (req, res) => {
  /* Retreive client and provider to check existence */
  const client = await clients.get(req.params.clientId)
  const provider = await providers.get(req.params.providerId)

  if (!client || !provider) {
    throw new HttpError(404)
  }

  await clients.detachProvider(req.params.clientId, req.params.providerId)

  res.sendStatus(200)
}))

/**
 * An endpont to check email in use. Accepts an email and ID
 * of the entity we should skip when performing the check.
 * (e.g. when we want to update exactly that entity).
 */
router.post(`/emails/check`, routeHandler(async (req, res) => {
  const { email, id } = req.body

  if (!email) {
    return res.status(422).json({ errors: ['Email is required'] })
  }

  const clientWithThatEmail = await clients.getIdByEmail(email)

  res.json(clientWithThatEmail !== null && clientWithThatEmail !== id)
}))

export default router