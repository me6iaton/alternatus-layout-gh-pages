import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';

import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState) {
  const createStoreWithMiddleware = compose(
    applyMiddleware(createLogger())
  )(createStore);
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}
