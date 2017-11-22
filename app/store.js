import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import reducers from '../app/reducers/index'; //Import the reducer


export default function configureStore(initialState: any = undefined) {
  const logger = createLogger()
  const enhancer = compose(
    applyMiddleware(thunk, promise, logger)
  )
  return createStore(reducers, initialState, enhancer)
}
