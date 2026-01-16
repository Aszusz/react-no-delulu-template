import { testIds } from '../test/steps/counter.testIds'
import { useAppDispatch, useAppSelector } from './hooks'
import { AppActions } from './store/actions'
import { selectCount } from './store/selectors'

function App() {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  return (
    <div className="text-center">
      <h1 className="py-8 text-5xl font-bold">Delulu is the Solulu</h1>
      <div className="py-4">
        <span data-testid={testIds.value} className="font-mono text-4xl">
          {count}
        </span>
      </div>
      <div className="flex justify-center gap-2">
        <button
          data-testid={testIds.randomDecrementButton}
          onClick={() => dispatch(AppActions['ui/random-decrement']())}
          className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          Random -
        </button>
        <button
          data-testid={testIds.decrementButton}
          onClick={() => dispatch(AppActions['ui/decrement']())}
          className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          -
        </button>
        <button
          data-testid={testIds.resetButton}
          onClick={() => dispatch(AppActions['ui/reset']())}
          className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          Reset
        </button>
        <button
          data-testid={testIds.incrementButton}
          onClick={() => dispatch(AppActions['ui/increment']())}
          className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          +
        </button>
        <button
          data-testid={testIds.randomIncrementButton}
          onClick={() => dispatch(AppActions['ui/random-increment']())}
          className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          Random +
        </button>
      </div>
    </div>
  )
}

export default App
