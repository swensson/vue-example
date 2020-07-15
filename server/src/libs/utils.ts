/**
 * HTTP and express utils
 */

export class HttpError extends Error {
  code: number
  constructor (code, ...args) {
    super(...args)

    this.code = code
  }
}

export const routeHandler = (f) => (req, res, next) => {
  try {
    f(req, res).catch((err) => {
      next(err)
    })
  } catch (e) {
    next(e)
  }
}
