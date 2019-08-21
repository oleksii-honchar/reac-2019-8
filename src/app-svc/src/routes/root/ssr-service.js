import CleanCSS from 'clean-css'
import { LoggerService } from '@ciklum/logan'

// eslint-disable-next-line
import { bootstrapApp } from '../../../../../dist/static/bundle.ssr'

const logger = new LoggerService()
logger.setTitle('ssr-service')

function cleanCss (rawCss) {
  if (!rawCss) return rawCss

  const regex = />([^<]*)<\/style>/
  const m = regex.exec(rawCss)
  if (!m[1]) return rawCss

  const cleanedCss = new CleanCSS({}).minify(m[1]).styles
  return rawCss.replace(m[1], cleanedCss)
}

/**
 * render cmp
 * @param {*} pageParams
 * @return {promise}
 */
function render (pageParams, headers) {
  logger.info('start render')

  return bootstrapApp(pageParams, headers)
    .then(({
      html, store, styledSheet, css, context, helmet,
    }) => {
      logger.info('prepare props for handlebar tmpl')
      global.window.config.initialState = null

      const state = store.getState()

      return ({
        helmet,
        context,
        state,
        html,
        css,
        styledTags: cleanCss(styledSheet.getStyleTags()),
      })
    })
}

export const ssrSvc = { render }
