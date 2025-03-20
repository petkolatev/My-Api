
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { logMiddleware } from './middlewares/logMiddleware.js'
import routes from './routes.js'
import config from './services/dbConfig.js'

mongoose.connect(config.dbURL)
    .then(() => console.log('DB connected!'))
    .catch((err) => console.log(`DB fail to connected: ${err}`))

const app = express()
app.use(cors({
    origin: config.origin,
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(logMiddleware)
app.use('/api', routes)


app.listen(config.port, () => console.log(`Server is running on http:/localhost:${config.port}`))
