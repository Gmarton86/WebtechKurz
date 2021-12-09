import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import levelReducer from './reducers'

const rootReducer = combineReducers({ levelReducer })

export const Store = createStore(rootReducer, applyMiddleware(thunk))
