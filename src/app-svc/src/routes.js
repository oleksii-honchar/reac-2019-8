import express from 'express'
import Url from 'url'
import path from 'path'

import { handler } from 'routes/root'
import { versionRouter } from 'routes/version'

const mountPoint = process.env.APP_SVC_MOUNT_POINT

const appBinPath = process.env.NODE_ENV === 'production' ? '../' : '../../../dist'
const distPath = path.join(__dirname, appBinPath, 'static')

const router = new express.Router()

router.use(mountPoint, [
  versionRouter,
  (req, res, next) => {
    if (!req.route) res.status(404)

    return next()
  },
])

router.use(/\/(static|favicon\.ico)/, [
  express.static(distPath),
  (req, res, next) => {
    if (!req.route) res.status(404)

    return next()
  },
])

router.use('*', (req, res, next) => {
  if (req.route || res.statusCode === 404 || res.statusCode === 500) {
    return next()
  }

  if (path.extname(Url.parse(req.originalUrl).pathname)) {
    res.statusCode = 404
    return next()
  }

  return handler.all(req, res, next)
})

export default { router }
