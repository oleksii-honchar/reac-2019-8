import React from 'react'
import ReactDOM from 'react-dom'
import { LoggerService } from '@ciklum/logan'
// import { ApiService, AxiosHttpAdapter } from '@ciklum/waas'

// import { historySvc } from './services'

import { Root } from './modules/Root'

window.pkg = JSON.parse(atob(PKG))
window.name = window.pkg.name
LoggerService.setGlobalTitle(window.pkg.name)

const logger = new LoggerService()
logger.setTitle('index')

window.config = window.config || {}
window.config.isNode = false

// const axiosHttpAdapter = new AxiosHttpAdapter()
// export const rootApiSvc = new ApiService(axiosHttpAdapter, 'api')

function startApp() {
  logger.info('Starting app...')

  // const render = window.config.ssr ? ReactDOM.hydrate : ReactDOM.render
  //

  ReactDOM.render(
    <Root title="Hello world!" />,
    document.querySelector('#app-root'),
  )
}

// if (window.config.startApp) startApp();

startApp()
