/* eslint-disable */
const faker = require('faker')

global.beforeEach(() => {
  global.$pkg = {
    name: faker.random.word(),
  }
})

global.afterEach(() => {
  delete global.$pkg
})

test('Modifies response body with version and response code', () => {
  const versionHandler = require('../../handler')

  const res = {}
  const reqData = {}
  const nextSpy = jest.fn()

  versionHandler.handle(reqData, res, nextSpy)
  global.expect(res.statusCode).toBe(200)
  global.expect(res.body.indexOf(global.$pkg.version)).toBe(-1)
  global.expect(nextSpy.mock.calls.length).toBe(1)
})
