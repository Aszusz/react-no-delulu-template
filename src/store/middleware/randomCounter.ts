import { isAction, type Middleware, type Dispatch } from 'redux'
import { AppActions } from '../actions'

const defaultRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const defaultDelay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const createRandomCounter =
  (
    randomInt = defaultRandomInt,
    delay = defaultDelay
  ): Middleware<object, unknown, Dispatch> =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (!isAction(action)) {
      return next(action)
    }

    if (
      action.type === AppActions['ui/random-increment'].key ||
      action.type === AppActions['ui/random-decrement'].key
    ) {
      const isIncrement = action.type === AppActions['ui/random-increment'].key
      const amount = randomInt(5, 10)
      const delayMs = amount * 200

      delay(delayMs).then(() => {
        if (isIncrement) {
          dispatch(AppActions['rnd/random-increment-done'](amount))
        } else {
          dispatch(AppActions['rnd/random-decrement-done'](amount))
        }
      })

      return
    }

    return next(action)
  }

export const randomCounter = createRandomCounter()
