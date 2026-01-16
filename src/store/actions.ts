import { discUnion, type DiscUnionOf } from 'disc-union'

export const AppActions = discUnion({
  'app/started': () => ({}),
})

export type AppAction = DiscUnionOf<typeof AppActions>
