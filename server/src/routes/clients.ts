import express from 'express'

import { routeHandler } from '../libs/utils'

const router = express.Router()

/**
 * Create a client
 */
router.post('/', routeHandler(async (req, res) => {

}))

/**
 * Get all clients
 */
router.get('/', routeHandler(async (req, res) => {

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