import React from 'react';
import ReactDOM from 'react-dom';
import { LoggerService } from '@ciklum/logan';
// import { ApiService, AxiosHttpAdapter } from '@ciklum/waas'

// import { historySvc } from './services'

import { Root } from './modules/Root';

window.pkg = JSON.parse(atob(PKG));
window.name = window.pkg.name;
window.config = window.config || {
  logLevel: 'info',
  isNode: false
};

LoggerService.setGlobalTitle(window.pkg.name);

const logger = new LoggerService();
logger.setTitle('index');


// const axiosHttpAdapter = new AxiosHttpAdapter()
// export const rootApiSvc = new ApiService(axiosHttpAdapter, 'api')

function startApp () {
  logger.info('Starting app...');
  // const render = window.config.ssr ? ReactDOM.hydrate : ReactDOM.render
  //

  ReactDOM.render(<Root/>, document.querySelector('#app-root'));
}

// if (window.config.startApp) startApp();

startApp();
