window.process = {
  "env": {
    "NODE_ENV": "development"
  }
};

console.log('test')

import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger';

import configureStore from './store/configureStore';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);



// function counter(state = 0, action) {
//   switch (action.type) {
//   case 'INCREMENT':
//     return state + 1
//   case 'DECREMENT':
//     return state - 1
//   default:
//     return state
//   }
// }
// let store = createStore(counter)
//
// store.subscribe(() =>
//   console.log(store.getState())
// )
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'DECREMENT' })
