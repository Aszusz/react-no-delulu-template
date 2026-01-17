import { match } from 'disc-union'
import type { AppState } from './state'
import { initialState } from './state'
import type { AppAction } from './actions'
import { oppositeDirections, getActualDirection, tick } from './snake'

export function reducer(
  state: AppState = initialState,
  action: AppAction
): AppState {
  return match(
    action,
    {
      'app/started': () => state,

      'ui/startGame': () => ({
        ...initialState,
        gameStatus: 'running' as const,
      }),

      'ui/changeDirection': ({ direction }) =>
        state.gameStatus !== 'running' ||
        direction === oppositeDirections[getActualDirection(state.snake)]
          ? state
          : { ...state, direction },

      'eff/tick': ({ newFood }) => tick(state, newFood),
    },
    () => state
  )
}
