import { useCallback, useRef, useLayoutEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { AppActions } from './store/actions'
import {
  selectGameStatus,
  selectSnake,
  selectFood,
  selectScore,
} from './store/selectors'
import { BOARD_SIZE, CELL_SIZE } from './store/state'
import type { Direction } from './store/state'
import { testIds } from '../test/steps/snake.testIds'
import { SnakeCanvas } from './SnakeCanvas'

function App() {
  const dispatch = useAppDispatch()
  const gameStatus = useAppSelector(selectGameStatus)
  const snake = useAppSelector(selectSnake)
  const food = useAppSelector(selectFood)
  const score = useAppSelector(selectScore)
  const boardRef = useRef<HTMLDivElement>(null)

  // Handle keyboard at document level so we don't need focus
  useLayoutEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && gameStatus !== 'running') {
        e.preventDefault()
        dispatch(AppActions['ui/startGame']())
        boardRef.current?.focus()
        return
      }

      const keyToDirection: Record<string, Direction> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      }
      const direction = keyToDirection[e.key]
      if (direction) {
        e.preventDefault()
        dispatch(AppActions['ui/changeDirection'](direction))
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [dispatch, gameStatus])

  const handleBoardKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Also handle on board for accessibility
      const keyToDirection: Record<string, Direction> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      }
      const direction = keyToDirection[e.key]
      if (direction) {
        e.preventDefault()
        dispatch(AppActions['ui/changeDirection'](direction))
      }
    },
    [dispatch]
  )

  const handleStart = () => {
    dispatch(AppActions['ui/startGame']())
    boardRef.current?.focus()
  }

  const boardSize = BOARD_SIZE * CELL_SIZE

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="mb-4 text-3xl font-bold">Snake Game</h1>

      <div className="mb-4">
        Score: <span data-testid={testIds.score}>{score}</span>
      </div>

      <div
        ref={boardRef}
        data-testid={testIds.board}
        tabIndex={0}
        onKeyDown={handleBoardKeyDown}
        className="relative border-2 border-gray-600 outline-none focus:border-green-500"
        style={{ width: boardSize, height: boardSize }}
      >
        <SnakeCanvas snake={snake} food={food} />

        {gameStatus === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <button
              data-testid={testIds.startButton}
              onClick={handleStart}
              className="rounded bg-green-600 px-6 py-3 text-xl font-bold hover:bg-green-500"
            >
              Start Game
            </button>
          </div>
        )}

        {gameStatus === 'gameOver' && (
          <div
            data-testid={testIds.gameOver}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/70"
          >
            <div className="mb-4 text-2xl font-bold text-red-500">
              Game Over!
            </div>
            <div className="mb-4">Final Score: {score}</div>
            <button
              data-testid={testIds.restartButton}
              onClick={handleStart}
              className="rounded bg-green-600 px-6 py-3 text-xl font-bold hover:bg-green-500"
            >
              Restart
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Press Enter to start • Use arrow keys to control
      </div>
    </div>
  )
}

export default App
