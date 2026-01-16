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
      [AppActions['app/started'].key]: () => state,
    },
    () => state
  )
}
