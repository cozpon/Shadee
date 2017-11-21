import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../app/reducers/index'; //Import the reducer

// // Connect our store to the reducers
// const store = createStore(
//   reducers,
//   applyMiddleware(thunk)
// );

export default function configureStore(initialState: any = undefined) {
  const enhancer = compose(
    applyMiddleware(thunk)
  )
  return createStore(reducers, initialState, enhancer)
}



//export default createStore(reducers, applyMiddleware(thunk));