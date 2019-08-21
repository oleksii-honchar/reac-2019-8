import logger from 'libs/logger'
import _ from 'lodash'

const log = logger.get('APP-SVC[err]')

function default404Handler (req, res, next) {
  res.statusCode = res.statusCode || 404

  if (res.statusCode === 404) {
    const errMsg = `[${res.statusCode}] Not found: ${req.method} ${req.originalUrl}`
    res.body = res.body || { error: errMsg }

    const err = new Error(errMsg)
    err.code = res.statusCode
    log.warn({ err })
  }
  next()
}

function assertionErrHandler (err, req, res, next) {
  const isAssertionErr = err.constructor.name === 'AssertionError'
  if (!isAssertionErr) {
    return next(err)
  }

  let error = err

  if (process.env.NODE_ENV === 'production') {
    error = _.omit(error, 'stack')
  }

  error.code = error.code || 500
  res.statusCode = error.code
  res.body = error

  if (err.code === 500) {
    log.error({ error })
  } else {
    log.warn({ error })
  }

  return next()
}

function defaultHandler (err, req, res, next) {
  const error = err
  error.code = err.code || 500
  if (error.code === 500 || error.code === 'ETIMEDOUT') {
    log.error({ error })
    log.error(error.stack)
  } else {
    log.warn({ error })
  }

  res.statusCode = error.code
  res.body = error.message
  next()
}

function tooBusyErrHandler (err, req, res, next) {
  if (err.code === 503) {
    log.error({ err })
    res.statusCode = err.code
    res.body = err.message
    next()
  } else {
    next(err)
  }
}

function useApp (app) {
  app.use(tooBusyErrHandler)
  app.use(assertionErrHandler)
  app.use(defaultHandler)
  app.use(default404Handler)
}

export const errorResponder = {
  use: useApp,
}
