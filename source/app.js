import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger';

import configureStore from './store/configureStore';
import Tab from './components/Tab';

// TODO NODE_ENV env in front
window.process = {
  "env": {
    "NODE_ENV": "development"
  }
};
window.__INITIAL_STATE__ = {
  showTabs: {
    "filter": 0,
    "apps": 1
  }
};

// store
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
// DEBUG 
window.store = store;

// components
new Tab({store, name: 'filter'});
new Tab({
  store,
  name: 'apps',
  selectors: {
    navItem: '.tabs-altr__nav .altr-head',
    panel: '.tabs-altr__content .tabs-altr__panel'
  },
  activeClass: 'altr-head--active'
});
