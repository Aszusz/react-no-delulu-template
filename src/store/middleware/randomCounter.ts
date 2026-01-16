import { isAction, type Middleware, type Dispatch } from 'redux'
import { incrementBy } from '../actions'

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
      action.type === 'randomIncrement' ||
      action.type === 'randomDecrement'
    ) {
      const sign = action.type === 'randomIncrement' ? 1 : -1
      const amount = randomInt(5, 10)
      const delayMs = amount * 200

      delay(delayMs).then(() => {
        dispatch(incrementBy(sign * amount))
      })

      return
    }

    return next(action)
  }

export const randomCounter = createRandomCounter()
