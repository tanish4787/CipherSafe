import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import connectDB from './db/db.js'
connectDB()
import './cron.js'
import { clerkMiddleware } from '@clerk/express'

import cors from 'cors'
import helmet from 'helmet'
import appRoutes from './routes/appRoutes.js'
import breachRoutes from './routes/breachRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000


app.use(cors())
app.use(helmet())
app.use(clerkMiddleware())
app.use(express.json())

app.use('/app', appRoutes)
app.use('/breach', breachRoutes)


app.listen(PORT, () => {
    console.log(`Server Started on ${PORT}.`);
})
