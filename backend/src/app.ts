import express, { Application } from 'express'
import cors from 'cors'
import compression from 'compression'
import 'express-async-errors'
import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import { httpLogger } from './middleware/logger'
import { systemRouter } from './modules/system'
import articleRouter from './modules/article'
import tagRouter from './modules/tag'
import authorRouter from './modules/author'

export const createApp = (): Application => {
  const app = express()

  // HTTP request logging
  app.use(httpLogger)

  app.use(
    cors({
      origin: env.CORS_ORIGIN === '*' ? '*' : env.CORS_ORIGIN,
      credentials: env.CORS_ORIGIN !== '*',
    })
  )

  // Body parsing and compression
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(compression())

  // API routes - System & Health
  app.use(env.API_PREFIX, systemRouter)

  // Domain routes
  app.use(`${env.API_PREFIX}/article`, articleRouter)
  app.use(`${env.API_PREFIX}/tag`, tagRouter)
  app.use(`${env.API_PREFIX}/author`, authorRouter)

  // Error handling
  app.use(errorHandler)

  return app
}
