export class PageParamsFromReqQuery {
  constructor (query) {
    this.ssr = (query.ssr || process.env.SSR) !== 'false'
    this.cacheSsr = (query['cache-ssr'] || query.cacheSsr || process.env.CACHE_SSR || 'false') !== 'false'
    this.startApp = (query['start-app'] || query.startApp || 'true') !== 'false'

    return this
  }

  value () {
    return {
      ssr: this.ssr,
      startApp: this.startApp,
      cacheSsr: this.cacheSsr,
    }
  }
}
