import express from 'express'
import cors from 'cors'

import { router } from './routes'


const app = express()

app.use(cors({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS, PATCH, PUT, DELETE",
    "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested"
}))

app.use(express.json())

app.use(router)

app.listen(3030, ()=>console.log('server on port 3030'))