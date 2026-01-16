import type { RootState } from '.'

export const selectCount = (state: RootState) => state.counter.count
