import express from 'express'

import { routeHandler } from '../libs/utils'

const router = express.Router()

/**
 * Create a provider
 */
router.post('/', routeHandler(async (req, res) => {

}))

/**
 * Get all providers
 */
router.get('/', routeHandler(async (req, res) => {

}))

/**
 * Get one provider
 */
router.get('/:id', routeHandler(async (req, res) => {

}))

/**
 * Update a provider
 */
router.put('/:id', routeHandler(async (req, res) => {

}))

/**
 * Delete a provider
 */
router.delete('/:id', routeHandler(async (req, res) => {

}))

export default router