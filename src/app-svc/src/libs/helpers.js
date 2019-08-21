import { DEFAULT_LANG, NotFoundError } from 'constants'

/**
 * Extract language from HTTP request
 * @param req - HTTP request
 * @returns {string} - language
 */
export function getLang (req) {
  try {
    return req.query.lang || DEFAULT_LANG
  } catch (err) {
    return DEFAULT_LANG
  }
}

/**
 * Form language string (empty for default language)
 * @param lang
 * @returns {string}
 */
export function addLanguage (lang) {
  if (lang === DEFAULT_LANG) return ''
  return ` (${lang})`
}

/**
 * Returns mock according to the requested language
 * @param req - HTTP request
 * @param accessor - function that returns mock by language
 * @param rest - additional params
 * @returns {*}
 */
export function getMockedData (req, accessor, ...rest) {
  const lang = getLang(req)
  try {
    return accessor(lang, ...rest)
  } catch (err) {
    return null
  }
}

/**
 * Generate random number between min and max values (including)
 * @param min
 * @param max
 * @returns {number}
 */
export function generateNumber (min = 0, max = 10) {
  return min + Math.ceil(Math.random() * (max - min))
}

/**
 * Returns function for comparing two objects by the key
 * @param accessor - key to sort by
 * @returns {function({a?: *}, {b?: *}): number}
 */
export const sortByOrder = (accessor = 'section_order') => (a, b) => parseInt(a[accessor], 10) - parseInt(b[accessor], 10)


export const handleRoute = (handler, logError = () => null) => async (req, res, next) => {
  try {
    res.body = await handler(req)
    res.statusCode = 200
  } catch (error) {
    logError(error)
    res.body = error
    res.statusCode = error.code || 500
  }

  next()
}

/**
 * Returns function for comparing two objects by the key
 * @param ms - milliseconds
 * @returns Promise
 */
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Safely gets prop from object, example: getPropSafe(o, 'a.b.c')
 * @param obj {object}
 * @param prop {string}
 * @returns {*}
 */
export const getPropSafe = (obj, prop) => {
  try {
    return prop.split('.').reduce((o, key) => o[key], obj)
  } catch (e) {
    return undefined
  }
}

/**
 * Express route handler wrapper
 * @param resolve {function}
 * @param logError {function}
 * @returns {function}
 */
export const routeHandler = (resolve, logError) => async (req, res, next) => {
  try {
    res.body = await resolve(req)
    res.statusCode = 200
  } catch (error) {
    logError(error)
    res.body = error
    res.statusCode = error instanceof NotFoundError ? error.code : 500
  }

  next()
}


function deg2rad (deg) {
  return deg * (Math.PI / 180)
}

export function getDistanceFromLatLonInKm (lat1, lon1, lat2, lon2) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // Distance in km
}
