import express from 'express'

import { routeHandler } from '../libs/utils'
import clients from '../services/clients'

const router = express.Router()

/**
 * Get all clients
 */
router.get('/', routeHandler(async (req, res) => {
  res.json(clients.all())
}))

/**
 * Create a client
 */
router.post('/', routeHandler(async (req, res) => {
  const { name, email, phone } = req.body

  res.json(clients.create(name, email, phone))
}))

/**
 * Get one client
 */
router.get('/:clientId', routeHandler(async (req, res) => {

}))

/**
 * Update a client
 */
router.put('/:clientId', routeHandler(async (req, res) => {

}))

/**
 * Delete a client
 */
router.delete('/:clientId', routeHandler(async (req, res) => {

}))

/* Client / Provider relationship */

/**
 * Attach provider to the client
 */
router.post('/:clientId/providers/:providerId', routeHandler(async (req, res) => {

}))

/**
 * Detach provider off the client
 */
router.delete('/:clientId/providers/:providerId', routeHandler(async (req, res) => {

}))

export default router