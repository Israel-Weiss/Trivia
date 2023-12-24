import express from 'express'
import cors from 'cors'

import { questRoutes } from './api'

const app = express()
import * as HTTP from "http"
const http = HTTP.createServer(app)

app.use(express.json())

const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
}

app.use(cors(corsOptions))

const port = process.env.PORT || 3030

app.use('/api/quest', questRoutes)

http.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
