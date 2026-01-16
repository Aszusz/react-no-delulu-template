import { match } from 'disc-union'
import type { AppState } from './state'
import { initialState } from './state'
import type { AppAction } from './actions'

export function reducer(
  state: AppState = initialState,
  action: AppAction
): AppState {
  return match(
    action,
    {
      increment: () => ({ ...state, count: state.count + 1 }),
      decrement: () => ({ ...state, count: state.count - 1 }),
      reset: () => ({ ...state, count: 0 }),
    },
    () => state
  )
}
