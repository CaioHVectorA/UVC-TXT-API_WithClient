import express, { Request, Response } from 'express'
import Config from './config/middleware'
import 'express-async-errors'
import { info, Config as _Config } from 'veclog'
const app = express()
Config(app)
app.listen(6220, () => {
    info("SERVER RUNNING", false)
})