import logger from 'libs/logger'
import { PageParamsFromReqQuery } from './PageParamsFromReqQuery'

let ssrSvc = null
const log = logger.get('/routes/root/all')

// const ttl = 60 * 60
// const cacheSvc = new NodeCache({
//   stdTTL: ttl,
//   checkperiod: ttl * 0.2,
//   useClones: false,
// })


async function all (req, res, next) {
  if (res.body && res.statusCode === 200) {
    return next()
  }

  let pageOpts = {
    originalUrl: req.originalUrl,
    appName: 'Ciklum',
    logLevel: process.env.LOG_LEVEL,
    appId: 'root',
  }

  const queryParams = new PageParamsFromReqQuery(req.query).value()

  pageOpts = {
    ...pageOpts,
    startApp: queryParams.startApp,
    ssr: queryParams.ssr,
    appBundleSrc: `static/bundle.js?v=${global.pkg.version}`,
  }

  if (!queryParams.ssr) {
    log.info(`ssr=${queryParams.ssr} skipping ssr...`)

    res.opts = pageOpts
    res.statusCode = 200
    res.template = 'component'
    return next()
  }

  // eslint-disable-next-line
  ssrSvc = require('./ssr-service').ssrSvc

  const pageParams = {
    ...queryParams,
    originalUrl: req.originalUrl,
  }

  return ssrSvc.render(pageParams, req.headers)
    .then((payload) => {
      const {
        context,
      } = payload

      if (context.url) {
        // react router redirect all
        const { status = 301 } = context
        log.warn('App redirected to ->', context.url, ', with status =', status)
        res.redirect(status, context.url)
        return next()
      }

      res.statusCode = context.status || 200
      pageOpts = {
        ...pageOpts,
        html: payload.html,
        css: payload.css,
      }
      res.opts = pageOpts
      res.template = 'component'

      return next()
    })
    .catch((err) => {
      log.error('ERROR', err)

      res.statusCode = 500
      res.opts = pageOpts
      res.template = '500'
      return next()
    })
}

export const handler = { all }
