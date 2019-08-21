import NodeCache from 'node-cache'

const ttl = 60 * 60 * 0.5 // in seconds, half an hour;

export const CacheApiService = new NodeCache({
  stdTTL: ttl,
  checkperiod: ttl * 0.2,
  useClones: false,
})
