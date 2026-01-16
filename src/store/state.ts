export const BOARD_SIZE = 20
export const CELL_SIZE = 20
export const GAME_TICK_MS = 200

export type Position = { x: number; y: number }

export type Direction = 'up' | 'down' | 'left' | 'right'

export type GameStatus = 'idle' | 'running' | 'gameOver'

export type AppState = {
  gameStatus: GameStatus
  snake: Position[]
  direction: Direction
  food: Position
  score: number
}

const initialSnake: Position[] = [
  { x: 5, y: 10 },
  { x: 4, y: 10 },
  { x: 3, y: 10 },
]

export const initialState: AppState = {
  gameStatus: 'idle',
  snake: initialSnake,
  direction: 'right',
  food: { x: 15, y: 10 },
  score: 0,
}
