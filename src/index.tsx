import React from 'react';
import ReactDOM from 'react-dom';

import { LoggerService } from '@ciklum/logan';
// import { historySvc } from './services'

import { Root } from './modules/Root';

const pkg = JSON.parse(atob(PKG));
window.app = {
  name: pkg.name,
  package: pkg,
  config: {
    logLevel: 'info',
    isNode: false,
    startApp: true,
  },
};

LoggerService.setGlobalTitle(window.app.name);

const logger = new LoggerService();
logger.setTitle('index');

// const axiosHttpAdapter = new AxiosHttpAdapter()
// export const rootApiSvc = new ApiService(axiosHttpAdapter, 'api')

function startApp () {
  logger.info('Starting app...');
  // const render = window.config.ssr ? ReactDOM.hydrate : ReactDOM.render
  const { render } = ReactDOM;

  render(
    <Root />,
    document.querySelector('#app-root'),
  );
}

if (window.app.config.startApp) startApp();
