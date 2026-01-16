import { discUnion, type DiscUnionOf } from 'disc-union'
import type { Direction, Position } from './state'

export const AppActions = discUnion(
  {
    'app/started': () => ({}),
    'ui/startGame': () => ({}),
    'ui/changeDirection': (direction: Direction) => ({ direction }),
    'eff/tick': (newFood: Position) => ({ newFood }),
  },
  'type'
)

export type AppAction = DiscUnionOf<typeof AppActions>
