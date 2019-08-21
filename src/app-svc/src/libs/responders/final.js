import express from 'express'

const router = new express.Router()

/**
 * send res
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @return {function}
 */
function sendResponse (req, res, next) {
  if (res.template) {
    return res.render(res.template, res.opts)
  }

  if (res.response || res.body) {
    if (req.accepts('json') === 'json' && typeof res.body !== 'string') {
      return res.json(res.response || res.body)
    }
    return res.send(res.response || res.body)
  }

  return next()
}

router.use((req, res, next) => {
  sendResponse(req, res, next)
})

export const finalResponder = {
  router,
}
