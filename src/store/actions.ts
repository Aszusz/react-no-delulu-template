import { discUnion, type DiscUnionOf } from 'disc-union'

export const AppActions = discUnion({
  increment: () => ({}),
  decrement: () => ({}),
  reset: () => ({}),
})

export type AppAction = DiscUnionOf<typeof AppActions>

export const { increment, decrement, reset } = AppActions
