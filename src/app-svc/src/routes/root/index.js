import express from 'express'
import { handler } from './handler'

export * from './handler'

export const rootRouter = new express.Router()

rootRouter.use('*', handler.all)
