(function () {
  'use strict';

  var babelHelpers_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  var babelHelpers_classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var babelHelpers_createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var babelHelpers_defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var babelHelpers_extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var babelHelpers_inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var babelHelpers_possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var babelHelpers_toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };


  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

  /**
   * Applies a function to every key-value pair inside an object.
   *
   * @param {Object} obj The source object.
   * @param {Function} fn The mapper function that receives the value and the key.
   * @returns {Object} A new object that contains the mapped values for the keys.
   */
  function mapValues(obj, fn) {
    return Object.keys(obj).reduce(function (result, key) {
      result[key] = fn(obj[key], key);
      return result;
    }, {});
  }

  var fnToString = function fnToString(fn) {
    return Function.prototype.toString.call(fn);
  };
  var objStringValue = fnToString(Object);

  /**
   * @param {any} obj The object to inspect.
   * @returns {boolean} True if the argument appears to be a plain object.
   */
  function isPlainObject(obj) {
    if (!obj || (typeof obj === 'undefined' ? 'undefined' : babelHelpers_typeof(obj)) !== 'object') {
      return false;
    }

    var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

    if (proto === null) {
      return true;
    }

    var constructor = proto.constructor;

    return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === objStringValue;
  }

  /**
   * These are private action types reserved by Redux.
   * For any unknown actions, you must return the current state.
   * If the current state is undefined, you must return the initial state.
   * Do not reference these action types directly in your code.
   */
  var ActionTypes = {
    INIT: '@@redux/INIT'
  };

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [initialState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
  function createStore(reducer, initialState) {
    if (typeof reducer !== 'function') {
      throw new Error('Expected the reducer to be a function.');
    }

    var currentReducer = reducer;
    var currentState = initialState;
    var listeners = [];
    var isDispatching = false;

    /**
     * Reads the state tree managed by the store.
     *
     * @returns {any} The current state tree of your application.
     */
    function getState() {
      return currentState;
    }

    /**
     * Adds a change listener. It will be called any time an action is dispatched,
     * and some part of the state tree may potentially have changed. You may then
     * call `getState()` to read the current state tree inside the callback.
     *
     * @param {Function} listener A callback to be invoked on every dispatch.
     * @returns {Function} A function to remove this change listener.
     */
    function subscribe(listener) {
      listeners.push(listener);
      var isSubscribed = true;

      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }

        isSubscribed = false;
        var index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    }

    /**
     * Dispatches an action. It is the only way to trigger a state change.
     *
     * The `reducer` function, used to create the store, will be called with the
     * current state tree and the given `action`. Its return value will
     * be considered the **next** state of the tree, and the change listeners
     * will be notified.
     *
     * The base implementation only supports plain object actions. If you want to
     * dispatch a Promise, an Observable, a thunk, or something else, you need to
     * wrap your store creating function into the corresponding middleware. For
     * example, see the documentation for the `redux-thunk` package. Even the
     * middleware will eventually dispatch plain object actions using this method.
     *
     * @param {Object} action A plain object representing “what changed”. It is
     * a good idea to keep actions serializable so you can record and replay user
     * sessions, or use the time travelling `redux-devtools`. An action must have
     * a `type` property which may not be `undefined`. It is a good idea to use
     * string constants for action types.
     *
     * @returns {Object} For convenience, the same action object you dispatched.
     *
     * Note that, if you use a custom middleware, it may wrap `dispatch()` to
     * return something else (for example, a Promise you can await).
     */
    function dispatch(action) {
      if (!isPlainObject(action)) {
        throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
      }

      if (typeof action.type === 'undefined') {
        throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
      }

      if (isDispatching) {
        throw new Error('Reducers may not dispatch actions.');
      }

      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }

      listeners.slice().forEach(function (listener) {
        return listener();
      });
      return action;
    }

    /**
     * Replaces the reducer currently used by the store to calculate the state.
     *
     * You might need this if your app implements code splitting and you want to
     * load some of the reducers dynamically. You might also need this if you
     * implement a hot reloading mechanism for Redux.
     *
     * @param {Function} nextReducer The reducer for the store to use instead.
     * @returns {void}
     */
    function replaceReducer(nextReducer) {
      currentReducer = nextReducer;
      dispatch({ type: ActionTypes.INIT });
    }

    // When a store is created, an "INIT" action is dispatched so that every
    // reducer returns their initial state. This effectively populates
    // the initial state tree.
    dispatch({ type: ActionTypes.INIT });

    return {
      dispatch: dispatch,
      subscribe: subscribe,
      getState: getState,
      replaceReducer: replaceReducer
    };
  }

  /**
   * Picks key-value pairs from an object where values satisfy a predicate.
   *
   * @param {Object} obj The object to pick from.
   * @param {Function} fn The predicate the values must satisfy to be copied.
   * @returns {Object} The object with the values that satisfied the predicate.
   */
  function pick(obj, fn) {
    return Object.keys(obj).reduce(function (result, key) {
      if (fn(obj[key])) {
        result[key] = obj[key];
      }
      return result;
    }, {});
  }

  /* eslint-disable no-console */

  function getUndefinedStateErrorMessage(key, action) {
    var actionType = action && action.type;
    var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

    return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
  }

  function getUnexpectedStateKeyWarningMessage(inputState, outputState, action) {
    var reducerKeys = Object.keys(outputState);
    var argumentName = action && action.type === ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

    if (reducerKeys.length === 0) {
      return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
    }

    if (!isPlainObject(inputState)) {
      return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
    }

    var unexpectedKeys = Object.keys(inputState).filter(function (key) {
      return reducerKeys.indexOf(key) < 0;
    });

    if (unexpectedKeys.length > 0) {
      return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
    }
  }

  function assertReducerSanity(reducers) {
    Object.keys(reducers).forEach(function (key) {
      var reducer = reducers[key];
      var initialState = reducer(undefined, { type: ActionTypes.INIT });

      if (typeof initialState === 'undefined') {
        throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
      }

      var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
      if (typeof reducer(undefined, { type: type }) === 'undefined') {
        throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
      }
    });
  }

  /**
   * Turns an object whose values are different reducer functions, into a single
   * reducer function. It will call every child reducer, and gather their results
   * into a single state object, whose keys correspond to the keys of the passed
   * reducer functions.
   *
   * @param {Object} reducers An object whose values correspond to different
   * reducer functions that need to be combined into one. One handy way to obtain
   * it is to use ES6 `import * as reducers` syntax. The reducers may never return
   * undefined for any action. Instead, they should return their initial state
   * if the state passed to them was undefined, and the current state for any
   * unrecognized action.
   *
   * @returns {Function} A reducer function that invokes every reducer inside the
   * passed object, and builds a state object with the same shape.
   */

  function combineReducers(reducers) {
    var finalReducers = pick(reducers, function (val) {
      return typeof val === 'function';
    });
    var sanityError;

    try {
      assertReducerSanity(finalReducers);
    } catch (e) {
      sanityError = e;
    }

    var defaultState = mapValues(finalReducers, function () {
      return undefined;
    });

    return function combination() {
      var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
      var action = arguments[1];

      if (sanityError) {
        throw sanityError;
      }

      var hasChanged = false;
      var finalState = mapValues(finalReducers, function (reducer, key) {
        var previousStateForKey = state[key];
        var nextStateForKey = reducer(previousStateForKey, action);
        if (typeof nextStateForKey === 'undefined') {
          var errorMessage = getUndefinedStateErrorMessage(key, action);
          throw new Error(errorMessage);
        }
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        return nextStateForKey;
      });

      if (process.env.NODE_ENV !== 'production') {
        var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
        if (warningMessage) {
          console.error(warningMessage);
        }
      }

      return hasChanged ? finalState : state;
    };
  }

  /**
   * Composes single-argument functions from right to left.
   *
   * @param {...Function} funcs The functions to compose.
   * @returns {Function} A function obtained by composing functions from right to
   * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
   */
  function compose() {
    for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }

    return function (arg) {
      return funcs.reduceRight(function (composed, f) {
        return f(composed);
      }, arg);
    };
  }

  /**
   * Creates a store enhancer that applies middleware to the dispatch method
   * of the Redux store. This is handy for a variety of tasks, such as expressing
   * asynchronous actions in a concise manner, or logging every action payload.
   *
   * See `redux-thunk` package as an example of the Redux middleware.
   *
   * Because middleware is potentially asynchronous, this should be the first
   * store enhancer in the composition chain.
   *
   * Note that each middleware will be given the `dispatch` and `getState` functions
   * as named arguments.
   *
   * @param {...Function} middlewares The middleware chain to be applied.
   * @returns {Function} A store enhancer applying the middleware.
   */
  function applyMiddleware() {
    for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
      middlewares[_key] = arguments[_key];
    }

    return function (next) {
      return function (reducer, initialState) {
        var store = next(reducer, initialState);
        var _dispatch = store.dispatch;
        var chain = [];

        var middlewareAPI = {
          getState: store.getState,
          dispatch: function dispatch(action) {
            return _dispatch(action);
          }
        };
        chain = middlewares.map(function (middleware) {
          return middleware(middlewareAPI);
        });
        _dispatch = compose.apply(undefined, babelHelpers_toConsumableArray(chain))(store.dispatch);

        return babelHelpers_extends({}, store, {
          dispatch: _dispatch
        });
      };
    };
  }

  /*
   * action types
   */

  var SHOW_TAB = 'SHOW_TAB';

  // todo-me hidden others tabs
  function showTabs() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    switch (action.type) {
      case SHOW_TAB:
        return Object.assign({}, state, babelHelpers_defineProperty({}, action.name, action.index));
      default:
        return state;
    }
  }

  var rootReducer = combineReducers({
    showTabs: showTabs
  });

  var index = __commonjs(function (module) {
  "use strict";

  var repeat = function repeat(str, times) {
    return new Array(times + 1).join(str);
  };
  var pad = function pad(num, maxLength) {
    return repeat("0", maxLength - num.toString().length) + num;
  };
  var formatTime = function formatTime(time) {
    return " @ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
  };

  // Use the new performance api to get better precision if available
  var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;

  /**
   * Creates logger with followed options
   *
   * @namespace
   * @property {object} options - options for logger
   * @property {string} options.level - console[level]
   * @property {boolean} options.duration - print duration of each action?
   * @property {boolean} options.timestamp - print timestamp with each action?
   * @property {object} options.colors - custom colors
   * @property {object} options.logger - implementation of the `console` API
   * @property {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
   * @property {boolean} options.collapsed - is group collapsed?
   * @property {boolean} options.predicate - condition which resolves logger behavior
   * @property {function} options.stateTransformer - transform state before print
   * @property {function} options.actionTransformer - transform action before print
   * @property {function} options.errorTransformer - transform error before print
   */

  function createLogger() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return function (_ref) {
      var getState = _ref.getState;
      return function (next) {
        return function (action) {
          var _options$level = options.level;
          var level = _options$level === undefined ? "log" : _options$level;
          var _options$logger = options.logger;
          var logger = _options$logger === undefined ? window.console : _options$logger;
          var _options$logErrors = options.logErrors;
          var logErrors = _options$logErrors === undefined ? true : _options$logErrors;
          var collapsed = options.collapsed;
          var predicate = options.predicate;
          var _options$duration = options.duration;
          var duration = _options$duration === undefined ? false : _options$duration;
          var _options$timestamp = options.timestamp;
          var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
          var transformer = options.transformer;
          var _options$stateTransfo = options.stateTransformer;
          var // deprecated
          stateTransformer = _options$stateTransfo === undefined ? function (state) {
            return state;
          } : _options$stateTransfo;
          var _options$actionTransf = options.actionTransformer;
          var actionTransformer = _options$actionTransf === undefined ? function (actn) {
            return actn;
          } : _options$actionTransf;
          var _options$errorTransfo = options.errorTransformer;
          var errorTransformer = _options$errorTransfo === undefined ? function (error) {
            return error;
          } : _options$errorTransfo;
          var _options$colors = options.colors;
          var colors = _options$colors === undefined ? {
            title: function title() {
              return "#000000";
            },
            prevState: function prevState() {
              return "#9E9E9E";
            },
            action: function action() {
              return "#03A9F4";
            },
            nextState: function nextState() {
              return "#4CAF50";
            },
            error: function error() {
              return "#F20404";
            }
          } : _options$colors;

          // exit if console undefined

          if (typeof logger === "undefined") {
            return next(action);
          }

          // exit early if predicate function returns false
          if (typeof predicate === "function" && !predicate(getState, action)) {
            return next(action);
          }

          if (transformer) {
            console.error("Option 'transformer' is deprecated, use stateTransformer instead");
          }

          var started = timer.now();
          var prevState = stateTransformer(getState());

          var formattedAction = actionTransformer(action);
          var returnedValue = undefined;
          var error = undefined;
          if (logErrors) {
            try {
              returnedValue = next(action);
            } catch (e) {
              error = errorTransformer(e);
            }
          } else {
            returnedValue = next(action);
          }

          var took = timer.now() - started;
          var nextState = stateTransformer(getState());

          // message
          var time = new Date();
          var isCollapsed = typeof collapsed === "function" ? collapsed(getState, action) : collapsed;

          var formattedTime = formatTime(time);
          var titleCSS = colors.title ? "color: " + colors.title(formattedAction) + ";" : null;
          var title = "action " + formattedAction.type + (timestamp ? formattedTime : "") + (duration ? " in " + took.toFixed(2) + " ms" : "");

          // render
          try {
            if (isCollapsed) {
              if (colors.title) logger.groupCollapsed("%c " + title, titleCSS);else logger.groupCollapsed(title);
            } else {
              if (colors.title) logger.group("%c " + title, titleCSS);else logger.group(title);
            }
          } catch (e) {
            logger.log(title);
          }

          if (colors.prevState) logger[level]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState);else logger[level]("prev state", prevState);

          if (colors.action) logger[level]("%c action", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction);else logger[level]("action", formattedAction);

          if (error) {
            if (colors.error) logger[level]("%c error", "color: " + colors.error(error, prevState) + "; font-weight: bold", error);else logger[level]("error", error);
          } else {
            if (colors.nextState) logger[level]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState);else logger[level]("next state", nextState);
          }

          try {
            logger.groupEnd();
          } catch (e) {
            logger.log("—— log end ——");
          }

          if (error) throw error;
          return returnedValue;
        };
      };
    };
  }

  module.exports = createLogger;
  });

  var createLogger = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);

  function configureStore(initialState) {
    var createStoreWithMiddleware = compose(applyMiddleware(createLogger()))(createStore);
    var store = createStoreWithMiddleware(rootReducer, initialState);
    return store;
  }

  function defaultEqualityCheck(a, b) {
    return a === b;
  }

  function defaultMemoize(func) {
    var equalityCheck = arguments.length <= 1 || arguments[1] === undefined ? defaultEqualityCheck : arguments[1];

    var lastArgs = null;
    var lastResult = null;
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (lastArgs !== null && args.every(function (value, index) {
        return equalityCheck(value, lastArgs[index]);
      })) {
        return lastResult;
      }
      lastArgs = args;
      lastResult = func.apply(undefined, args);
      return lastResult;
    };
  }

  function getDependencies(funcs) {
    var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

    if (!dependencies.every(function (dep) {
      return typeof dep === 'function';
    })) {
      var dependencyTypes = dependencies.map(function (dep) {
        return typeof dep === 'undefined' ? 'undefined' : babelHelpers_typeof(dep);
      }).join(', ');
      throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
    }

    return dependencies;
  }

  function createSelectorCreator(memoize) {
    for (var _len2 = arguments.length, memoizeOptions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      memoizeOptions[_key2 - 1] = arguments[_key2];
    }

    return function () {
      for (var _len3 = arguments.length, funcs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        funcs[_key3] = arguments[_key3];
      }

      var recomputations = 0;
      var resultFunc = funcs.pop();
      var dependencies = getDependencies(funcs);

      var memoizedResultFunc = memoize.apply(undefined, [function () {
        recomputations++;
        return resultFunc.apply(undefined, arguments);
      }].concat(memoizeOptions));

      var selector = function selector(state, props) {
        for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
          args[_key4 - 2] = arguments[_key4];
        }

        var params = dependencies.map(function (dependency) {
          return dependency.apply(undefined, [state, props].concat(args));
        });
        return memoizedResultFunc.apply(undefined, babelHelpers_toConsumableArray(params));
      };

      selector.recomputations = function () {
        return recomputations;
      };
      return selector;
    };
  }

  function createSelector() {
    return createSelectorCreator(defaultMemoize).apply(undefined, arguments);
  }

  function observeStore(store, storeSelector, onChange) {
    var currentState = undefined;

    function handleChange() {
      var nextState = storeSelector(store.getState());
      if (nextState !== currentState) {
        currentState = nextState;
        onChange(currentState);
      }
    }

    var unsubscribe = store.subscribe(handleChange);
    return { unsubscribe: unsubscribe, handleChange: handleChange };
  }

  // TODO  Class specification must implement a `render` method
  // TODO  Class specification must implement a `selector` method

  var Component = function () {
    function Component(store) {
      babelHelpers_classCallCheck(this, Component);

      this.store = store;
      this.dispatch = store.dispatch;
      this.storeObserver = observeStore(store, this.selector.bind(this), this.render.bind(this));
    }

    babelHelpers_createClass(Component, [{
      key: "init",
      value: function init() {
        this.storeObserver.handleChange();
      }
    }]);
    return Component;
  }();

  var $ = function $(selector) {
    return Array.from(document.querySelectorAll(selector));
  };
  // $.bind(document);

  var Tab = function (_Component) {
    babelHelpers_inherits(Tab, _Component);

    function Tab(_ref) {
      var store = _ref.store;
      var name = _ref.name;
      var _ref$selectors = _ref.selectors;
      var selectors = _ref$selectors === undefined ? {
        navItem: '.tabs__nav .tabs__title',
        panel: '.tabs__content .tabs__panel'
      } : _ref$selectors;
      var _ref$activeClass = _ref.activeClass;
      var activeClass = _ref$activeClass === undefined ? 'tabs__title--active' : _ref$activeClass;
      babelHelpers_classCallCheck(this, Tab);

      var _this = babelHelpers_possibleConstructorReturn(this, Object.getPrototypeOf(Tab).call(this, store));

      _this.name = name;
      _this.activeClass = activeClass;
      _this.selectors = selectors;
      _this.navNodeList = $(selectors.navItem);
      _this.panelNodeList = $(selectors.panel);

      // events
      _this.navNodeList.forEach(function (el, index) {
        el.addEventListener('click', function (event) {
          var index = _this.navNodeList.indexOf(event.currentTarget);
          _this.store.dispatch({ type: "SHOW_TAB", name: name, index: index });
        });
      });

      // init component
      _this.storeObserver.handleChange();
      // this.init();
      return _this;
    }

    babelHelpers_createClass(Tab, [{
      key: 'selector',
      value: function selector(state) {
        var _this2 = this;

        if (!this._selector) {
          this._selector = createSelector(function (state) {
            return state.showTabs[_this2.name];
          }, function (index) {
            return index;
          });
        }
        return this._selector(state);
      }
    }, {
      key: 'render',
      value: function render(index) {
        var _this3 = this;

        this.navNodeList.forEach(function (el, i) {
          if (index === i) {
            el.classList.add(_this3.activeClass);
          } else {
            el.classList.remove(_this3.activeClass);
          }
        });
        this.panelNodeList.forEach(function (el, i) {
          if (index === i) {
            el.style.display = '';
          } else {
            el.style.display = 'none';
          }
        });
      }
    }]);
    return Tab;
  }(Component);

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
  var initialState = window.__INITIAL_STATE__;
  var store = configureStore(initialState);
  // DEBUG
  window.store = store;

  // components
  new Tab({ store: store, name: 'filter' });
  new Tab({
    store: store,
    name: 'apps',
    selectors: {
      navItem: '.tabs-altr__nav .altr-head',
      panel: '.tabs-altr__content .tabs-altr__panel'
    },
    activeClass: 'altr-head--active'
  });

}());
//# sourceMappingURL=app.js.map
