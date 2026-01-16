import type { Middleware } from 'redux'

const defaultLog = (message: string) => console.log(message)
const defaultNow = () => new Date()

export const createLogger =
  (log = defaultLog, now = defaultNow): Middleware =>
  () =>
  (next) =>
  (action) => {
    log(`[${now().toISOString()}] ${JSON.stringify(action)}`)
    return next(action)
  }

export const logger = createLogger()
