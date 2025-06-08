import express from 'express'
import {
    getVaultItemsController,
    createVaultItemController,
    updateVaultItemController,
    deleteVaultItemController
} from '../controllers/vaultRoute.controllers.js'

import fullAuth from '../middlewares/fullAuth.js'

const router = express.Router()

router.use(fullAuth)

router
    .post('/', createVaultItemController)
    .get('/', getVaultItemsController)
    .put('/:id', updateVaultItemController)
    .delete('/:id', deleteVaultItemController)

export default router
