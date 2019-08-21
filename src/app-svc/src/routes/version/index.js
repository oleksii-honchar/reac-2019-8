import express from 'express'
import handler from './handler'

export const versionRouter = new express.Router()

versionRouter.get('/version', handler.get)
