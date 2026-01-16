import { match } from 'disc-union'
import type { AppState } from './state'
import { initialState } from './state'
import type { AppAction } from './actions'
import { AppActions } from './actions'

export function reducer(
  state: AppState = initialState,
  action: AppAction
): AppState {
  return match(
    action,
    {
      [AppActions['ui/increment'].key]: () => ({
        ...state,
        count: state.count + 1,
      }),
      [AppActions['ui/decrement'].key]: () => ({
        ...state,
        count: state.count - 1,
      }),
      [AppActions['ui/reset'].key]: () => ({ ...state, count: 0 }),
      [AppActions['rnd/random-increment-done'].key]: ({ amount }) => ({
        ...state,
        count: state.count + amount,
      }),
      [AppActions['rnd/random-decrement-done'].key]: ({ amount }) => ({
        ...state,
        count: state.count - amount,
      }),
    },
    () => state
  )
}
