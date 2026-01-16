import { discUnion, type DiscUnionOf } from 'disc-union'

export const AppActions = discUnion({
  increment: () => ({}),
  decrement: () => ({}),
  reset: () => ({}),
  incrementBy: (amount: number) => ({ amount }),
  randomIncrement: () => ({}),
  randomDecrement: () => ({}),
})

export type AppAction = DiscUnionOf<typeof AppActions>

export const {
  increment,
  decrement,
  reset,
  incrementBy,
  randomIncrement,
  randomDecrement,
} = AppActions
