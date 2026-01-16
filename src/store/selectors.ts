import type { RootState } from './index'

export const selectGameStatus = (state: RootState) => state.game.gameStatus
export const selectSnake = (state: RootState) => state.game.snake
export const selectFood = (state: RootState) => state.game.food
export const selectScore = (state: RootState) => state.game.score
export const selectDirection = (state: RootState) => state.game.direction
