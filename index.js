import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

const app = express()
const PORT = process.env.PORT || 3000


app.use(cors())
app.use(helmet())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('CipherSafe API is running 🚀')
})



app.listen(PORT, () => {
    console.log(`Server Started on ${PORT}.`);
})
