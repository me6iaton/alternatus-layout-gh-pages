export function observeStore(store, storeSelector, onChange) {
  let currentState;

  function handleChange() {
    let nextState = storeSelector(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  return {unsubscribe, handleChange}
}

// TODO  Class specification must implement a `render` method
// TODO  Class specification must implement a `selector` method
export default class Component {
    constructor(store) {
      this.store = store;
      this.dispatch = store.dispatch;
      this.storeObserver = observeStore(store, this.selector.bind(this), this.render.bind(this));
    }
    init() {
      this.storeObserver.handleChange();
    }
}
