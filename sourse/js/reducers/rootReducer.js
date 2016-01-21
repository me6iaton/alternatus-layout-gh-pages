import { combineReducers } from 'redux';
import { SHOW_TAB } from '../actions/tab'

// todo-me hidden others tabs
function showTabs (state = {}, action) {
  switch (action.type) {
  case SHOW_TAB:
    return Object.assign({}, state, {[action.name] : action.index})
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  showTabs
});

export default rootReducer;
