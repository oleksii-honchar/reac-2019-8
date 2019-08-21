import bunyan from 'bunyan'
import bunyanFormat from 'bunyan-format'
import _ from 'lodash'

import $pkg from '../../package.json'

const loggers = {}

/**
 * req processing
 * @param {object} req
 * @return {{method, url, headers}}
 */
function reqSerializer (req) {
  const headers = _.pick(req.headers, ['host', 'user-agent', 'x-real-ip'])

  const res = {
    method: req.method,
    url: req.url,
    headers,
  }

  if (!_.isEmpty(req.query)) {
    res.query = req.query
  }
  if (!_.isEmpty(req.params)) {
    res.params = req.params
  }
  if (!_.isEmpty(req.body)) {
    res.body = req.body
  }

  return res
}

/**
 * res processing
 * @param {object} res
 * @return {{statusCode: (*|number|Number), headers, body: *}}
 */
function resSerializer (res) {
  /* eslint-disable-next-line no-underscore-dangle */
  const headers = _.pick(res._headers, ['content-length', 'content-type'])

  return {
    statusCode: res.statusCode,
    headers,
    body: res.body,
  }
}

/**
 * err preprocessing
 * @param {object} err
 * @return {*}
 */
function errSerializer (err) {
  if (!_.isObject(err)) {
    return err
  }

  let resErr = err.name || 'Error'
  resErr += ': '
  if (_.has(err, 'message') && err.message) {
    resErr += err.message
  }
  if (_.has(err, 'body.errors.base') && _.isArray(err.body.errors.base)) {
    resErr += err.body.errors.base.join(', ')
  }

  resErr = {
    code: err.code,
    message: resErr,
  }

  if (_.has(err, 'stack') && err.code > 404) {
    resErr.stack = err.stack
  }

  return resErr
}

const defaultOpts = {
  name: $pkg.name,
  level: 'error',
  serializers: {
    req: reqSerializer,
    res: resSerializer,
  },
}

/**
 * Apply format to logger
 * @param {object} opts
 * @return {Object|*}
 */
function applyFormat (opts) {
  if (!['development', 'test', 'production'].includes(process.env.NODE_ENV)) return {}

  const formatOut = bunyanFormat({ outputMode: 'short' })
  const logLevel = opts.ignoreLogLevel ? 'info' : process.env.LOG_LEVEL
  const streams = []

  streams.push({ stream: formatOut })

  return _.extend(opts, {
    streams,
    level: logLevel,
    serializers: _.extend(defaultOpts.serializers, {
      err: errSerializer,
    }),
  })
}

/**
 * Create logger instance
 * @param {string} name
 * @param {object} paramOpts
 * @return {*}
 */
function createLogger (name, paramOpts) {
  let options = paramOpts
  options = _.defaults(options, defaultOpts)
  options.name = name
  applyFormat(options)
  return bunyan.createLogger(_.omit(options, ['ignoreLogLevel', 'client']))
}

/**
 * get existed logger instance
 * @param {string} paramName
 * @param {object} [paramOpts] - { ignoreEnv }
 * @return {*}
 */
function getLogger (paramName, paramOpts) {
  const name = paramName || $pkg.name
  const options = _.defaults(paramOpts, {
    ignoreLogLevel: false,
  })

  if (loggers[name]) {
    return loggers[name]
  }

  const newLogger = createLogger(name, options)
  loggers[name] = newLogger
  return newLogger
}

export default { get: getLogger }
