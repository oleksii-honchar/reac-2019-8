import { LoggerService } from '@ciklum/logan'
import isEmpty from 'lodash/isEmpty'

const logger = new LoggerService()
logger.setTitle('execWaasReqSeries')

/**
 * When ssr need pre fetch data we collect all data action and exec them. Inside waas req is bounded
 * @param waasReqs - array of waas reqs
 */
export function execWaasReqSeries(waasReqs) {
  return new Promise(resolve => {
    if (!waasReqs || !Array.isArray(waasReqs) || isEmpty(waasReqs))
      return resolve(null)

    const success = []
    const error = []
    const failure = []

    logger.info('start execution')
    return waasReqs.forEach(getDataFn => {
      getDataFn()
        .on('success', res => success.push(res))
        .on('error', res => error.push(res))
        .on('failure', res => failure.push(res))
        .on('after', () => {
          const resPayloadLength =
            success.length + error.length + failure.length

          if (resPayloadLength === waasReqs.length) {
            logger.info('finish execution')
            return resolve({ success, error, failure })
          }
          return null
        })
    })
  })
}
