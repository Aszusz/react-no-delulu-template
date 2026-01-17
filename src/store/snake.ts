import type { AppState, Direction, Position } from './state'
import { BOARD_SIZE } from './state'

export const oppositeDirections: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

export function getActualDirection(snake: Position[]): Direction {
  const head = snake[0]
  const neck = snake[1]
  const dx = head.x - neck.x
  const dy = head.y - neck.y
  if (dx > 0) return 'right'
  if (dx < 0) return 'left'
  if (dy > 0) return 'down'
  return 'up'
}

function moveHead(head: Position, direction: Direction): Position {
  switch (direction) {
    case 'up':
      return { x: head.x, y: head.y - 1 }
    case 'down':
      return { x: head.x, y: head.y + 1 }
    case 'left':
      return { x: head.x - 1, y: head.y }
    case 'right':
      return { x: head.x + 1, y: head.y }
  }
}

function checkWallCollision(pos: Position): boolean {
  return pos.x < 0 || pos.x >= BOARD_SIZE || pos.y < 0 || pos.y >= BOARD_SIZE
}

function checkSelfCollision(head: Position, body: Position[]): boolean {
  return body.some((segment) => segment.x === head.x && segment.y === head.y)
}

function checkFoodCollision(head: Position, food: Position): boolean {
  return head.x === food.x && head.y === food.y
}

export function tick(state: AppState, newFood: Position): AppState {
  if (state.gameStatus !== 'running') return state

  const newHead = moveHead(state.snake[0], state.direction)

  if (checkWallCollision(newHead)) {
    return { ...state, gameStatus: 'gameOver' }
  }

  if (checkSelfCollision(newHead, state.snake)) {
    return { ...state, gameStatus: 'gameOver' }
  }

  const ateFood = checkFoodCollision(newHead, state.food)
  const newSnake = ateFood
    ? [newHead, ...state.snake]
    : [newHead, ...state.snake.slice(0, -1)]

  return {
    ...state,
    snake: newSnake,
    score: ateFood ? state.score + 1 : state.score,
    food: ateFood ? newFood : state.food,
  }
}
