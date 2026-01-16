import { discUnion, type DiscUnionOf } from 'disc-union'

export const AppActions = discUnion({
  'ui/increment': () => ({}),
  'ui/decrement': () => ({}),
  'ui/reset': () => ({}),
  // 'core/increment-by': (amount: number) => ({ amount }),
  'ui/random-increment': () => ({}),
  'ui/random-decrement': () => ({}),
  'rnd/random-increment-done': (amount: number) => ({ amount }),
  'rnd/random-decrement-done': (amount: number) => ({ amount }),
})

export type AppAction = DiscUnionOf<typeof AppActions>
