import express from 'express'
import fullAuth from '../middlewares/fullAuth.js'
import { createBreachApp, getAllBreaches, updateBreach, deleteBreach } from '../controllers/breachRoute.controller.js'
const router = express.Router()


router
    .post('/', fullAuth, createBreachApp)
    .get('/', fullAuth, getAllBreaches)
    .put('/:id', fullAuth, updateBreach)
    .delete('/:id', fullAuth, deleteBreach)





export default router