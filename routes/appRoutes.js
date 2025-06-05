import express from 'express'
import fullAuth from '../middlewares/fullAuth.js'
import validateApp from '../middlewares/validateApp.js'
import { createApp, getAllApps, updateApp, deleteApp } from '../controllers/appRoute.controllers.js'


const router = express.Router()

router
    .post('/', fullAuth, validateApp, createApp)
    .get('/', fullAuth, getAllApps)
    .put('/:id', fullAuth, validateApp, updateApp)
    .delete('/:id', fullAuth, deleteApp)



export default router

