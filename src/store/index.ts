import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { reducer } from './reducers'
import { AppActions } from './actions'
import { logger } from './middleware/logger'
import { gameLoop } from './middleware/gameLoop'

const rootReducer = combineReducers({
  game: reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(gameLoop, logger)
)

store.dispatch(AppActions['app/started']())

export type AppDispatch = typeof store.dispatch
