import pkg from '../package.json';

global.window = {
  name: pkg.name,
  config: {
    logLevel: process.env.LOG_LEVEL,
    isNode: true,
  },
  location: {
    search: '',
  },
  parent: {
    window: {},
  },
  pkg,
  atob: (data) => Buffer.from(data, 'base64').toString(),
  addEventListener: () => null,
};

const { LoggerService } = require('@ciklum/logan');

LoggerService.setGlobalTitle(pkg.name);
const logger = new LoggerService();
logger.setTitle('index.js.ssr');

logger.info('Preparation start');
logger.info('Import "app" parts for ssr use in "api-gw"..');

// const { ApiService, AxiosHttpAdapter, mergeConfig } = require('@ciklum/waas')
// const { execWaasReqSeries } = require('./libs/exec-waas-req-series')

logger.info('Parts imported...');

logger.info('Compose bootstrapApp() function...');

/**
 * @param params {object} - path to parse
 * @param params.initialState {object} - store initial state
 * @param params.originalUrl {string}
 * @param headers {object} - req headers
 * @returns Promise
 */

logger.info('Preparation finish');
