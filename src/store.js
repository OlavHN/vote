import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';

import reducers from './reducers';

let persistor;

// Combines the store with persistence and async handling
export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk),
    autoRehydrate(),
  );

  const store = createStore(combineReducers(reducers), initialState, enhancer);
  persistor = persistStore(store, { storage: AsyncStorage });

  return store;
}

// Utility for cleaning cached storage
export function clean(keys) {
  if (!persistor)
    return false;

  if (keys)
    persistor.purge(keys);
  persistor.purgeAll();

  return true;
}
