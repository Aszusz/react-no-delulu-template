import { isAction, type Middleware, type Dispatch } from 'redux'
import { match } from 'disc-union'
import { AppActions, type AppAction } from '../actions'

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

    return match(
      action as AppAction,
      {
        [AppActions['ui/random-increment'].key]: () => {
          const amount = randomInt(5, 10)
          delay(amount * 200).then(() =>
            dispatch(AppActions['rnd/random-increment-done'](amount))
          )
        },
        [AppActions['ui/random-decrement'].key]: () => {
          const amount = randomInt(5, 10)
          delay(amount * 200).then(() =>
            dispatch(AppActions['rnd/random-decrement-done'](amount))
          )
        },
      },
      () => next(action)
    )
  }

export const randomCounter = createRandomCounter()
