import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { reducer } from './reducers'
import { logger } from './middleware/logger'
import { randomCounter } from './middleware/randomCounter'

const rootReducer = combineReducers({
  counter: reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(randomCounter, logger)
)

export type AppDispatch = typeof store.dispatch
