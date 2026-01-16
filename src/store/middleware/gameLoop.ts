import type { Middleware } from 'redux'
import { AppActions, type AppAction } from '../actions'
import { BOARD_SIZE, GAME_TICK_MS } from '../state'
import type { Position } from '../state'

type TimerDeps = {
  setInterval: typeof setInterval
  clearInterval: typeof clearInterval
  randomInt: (max: number) => number
}

const defaultDeps: TimerDeps = {
  setInterval: globalThis.setInterval.bind(globalThis),
  clearInterval: globalThis.clearInterval.bind(globalThis),
  randomInt: (max: number) => Math.floor(Math.random() * max),
}

function spawnFood(
  snake: Position[],
  randomInt: (max: number) => number
): Position {
  const occupied = new Set(snake.map((s) => `${s.x},${s.y}`))
  let pos: Position
  do {
    pos = {
      x: randomInt(BOARD_SIZE),
      y: randomInt(BOARD_SIZE),
    }
  } while (occupied.has(`${pos.x},${pos.y}`))
  return pos
}

export const createGameLoopMiddleware =
  (deps: TimerDeps = defaultDeps): Middleware =>
  (store) => {
    let intervalId: ReturnType<typeof setInterval> | null = null

    return (next) => (action) => {
      const result = next(action)

      if (AppActions['ui/startGame'].is(action as AppAction)) {
        if (intervalId) {
          deps.clearInterval(intervalId)
        }
        intervalId = deps.setInterval(() => {
          const state = store.getState()
          const snake = state.game.snake
          const newFood = spawnFood(snake, deps.randomInt)
          store.dispatch(AppActions['eff/tick'](newFood))
        }, GAME_TICK_MS)
      }

      const state = store.getState()
      if (state.game.gameStatus === 'gameOver' && intervalId) {
        deps.clearInterval(intervalId)
        intervalId = null
      }

      return result
    }
  }

export const gameLoop = createGameLoopMiddleware()
