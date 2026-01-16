import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { reducer } from './reducers'
import { logger } from './middleware/logger'

const rootReducer = combineReducers({
  counter: reducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(logger)
)
