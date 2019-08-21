import axios from 'axios'
import isString from 'lodash/isString'
import isObject from 'lodash/isObject'

import logger from 'libs/logger'
import { ApiError } from 'constants'
import { CacheApiService } from './CacheApiService'

const MAX_CONTENT_LENGTH = 25 * 1024 * 1024 // 25 Mb

// https://github.com/axios/axios#handling-errors
function errorHandler (error) {
  let normalizedError

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const defaultMessage = 'The request was made and the server responded with a status code'
      + ' that falls out of the range of 2xx'

    normalizedError = new ApiError(
      error.message || error.response.data || defaultMessage,
      { code: error.response.status },
    )
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    normalizedError = new ApiError(
      'The request was made but no response was received',
      { code: 500 },
    )
  } else {
    // Something happened in setting up the request that triggered an Error
    const defaultMessage = 'Something happened in setting up the request that triggered an Error'

    normalizedError = new ApiError(error.message || defaultMessage, { code: 500 })
  }

  throw normalizedError
}

export class HttpService {
  constructor (baseUrl) {
    this.log = logger.get('app-svc | HttpService')
    this.client = axios.create({ baseURL: baseUrl }) // axios has custom prop name

    if (process.env.LOG_LEVEL === 'debug') {
      this.client.interceptors.request.use((request) => {
        this.log.debug('> '.repeat(15), 'REQUEST:', ' >'.repeat(15))
        const {
          baseURL, url, method, params, headers: { common, ...specificHeaders },
        } = request

        this.log.debug('    URL:', `${baseUrl}${baseURL && '/'}${url}`)
        this.log.debug(' METHOD:', method)
        this.log.debug(' PARAMS:', params)
        this.log.debug('HEADERS:', {
          common,
          [method.toLowerCase()]: specificHeaders[method.toLowerCase()],
        })

        return request
      })

      this.client.interceptors.response.use((response) => {
        this.log.debug('< '.repeat(15), 'RESPONSE:', ' <'.repeat(15))
        const { config = {}, status, data } = response
        this.log.debug('   URL:', config.url)
        this.log.debug('STATUS:', status)
        let logData
        try {
          logData = JSON.stringify(data).substring(0, 1000)
        } catch (e) {
          logData = data
        }
        this.log.debug('  DATA:', logData)
        return response
      })
    }
  }

  // toSkipCacheApi (path) {
  // if (pathNoApiCache.includes(path)) {
  //   this.log.info('[API CACHE] Skip cache for:', path)
  //   return true
  // }
  // return false
  // }

  get (path, config = {}) {
    // if (process.env.CACHE_API && !this.toSkipCacheApi(path)) {
    if (process.env.CACHE_API) {
      const cacheKeyData = { path, params: config.params }
      const cacheKey = Buffer.from(JSON.stringify(cacheKeyData)).toString('base64')

      const cache = CacheApiService.get(cacheKey)
      if (isObject(cache)) {
        if (isString(cache.data)) {
          this.log.error('[API CACHE] Clearing cache for:', cacheKeyData)
          this.log.error('[API CACHE] Clearing cache data:', cache.data.substring(0, 200))
          CacheApiService.del(cacheKey)
        } else {
          this.log.info('[API CACHE] Using cache for:', cacheKeyData)
          const logCache = (() => {
            try {
              return JSON.stringify(cache.data).substring(0, 750)
            } catch (e) {
              return cache
            }
          })()
          this.log.info('[API CACHE] cache:', logCache)
          return Promise.resolve(cache)
        }
      }

      return this.client.get(path, config)
        .then((r) => {
          this.log.info('[API CACHE] response type:', typeof r)
          if (!isString(r)) {
            this.log.info('[API CACHE] Set cache for:', cacheKeyData)
            CacheApiService.set(cacheKey, r)
          } else {
            this.log.error('[API CACHE] Error for:', cacheKeyData)
            this.log.error('[API CACHE] Can\'t set cache for response of type', typeof r)
          }
          return r
        })
        .catch(errorHandler)
    }

    return this.client.get(path, config)
      .catch(errorHandler)
  }

  post (path, data, config = {}) {
    return this.client.post(
      path,
      data,
      {
        ...config,
        // https://github.com/axios/axios/issues/1286
        // https://github.com/yakovkhalinsky/backblaze-b2/issues/45
        maxContentLength: MAX_CONTENT_LENGTH,
      },
    )
      .catch(errorHandler)
  }
}
