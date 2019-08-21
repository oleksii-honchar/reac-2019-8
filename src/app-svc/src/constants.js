export class ValidationError extends Error {
  constructor (message, errors, code = 400) {
    super()

    this.message = message
    this.errors = errors
    this.code = code
  }
}

export class MapperError extends Error {
  constructor (message, error, code = 400) {
    super()

    this.message = message
    this.error = error
    this.code = code
  }
}

export class ApiError extends Error {
  constructor (message, { code, error }) {
    super()

    this.message = message
    this.error = error
    this.code = code
  }
}

export class NotFoundError extends Error {
  constructor (message, error, code = 404) {
    super()

    this.message = message
    this.error = error
    this.code = code
  }
}
