import { useRef, useLayoutEffect } from 'react'
import type { Position } from './store/state'
import { BOARD_SIZE, CELL_SIZE } from './store/state'

type SnakeCanvasProps = {
  snake: Position[]
  food: Position
}

export function SnakeCanvas({ snake, food }: SnakeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const boardSize = BOARD_SIZE * CELL_SIZE

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#1f2937' // gray-800
    ctx.fillRect(0, 0, boardSize, boardSize)

    // Draw snake
    ctx.fillStyle = '#22c55e' // green-500
    for (const segment of snake) {
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE - 1,
        CELL_SIZE - 1
      )
    }

    // Draw food
    ctx.fillStyle = '#ef4444' // red-500
    ctx.fillRect(
      food.x * CELL_SIZE,
      food.y * CELL_SIZE,
      CELL_SIZE - 1,
      CELL_SIZE - 1
    )
  }, [snake, food, boardSize])

  return (
    <canvas
      ref={canvasRef}
      width={boardSize}
      height={boardSize}
      className="block"
    />
  )
}
