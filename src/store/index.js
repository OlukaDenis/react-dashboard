import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import reducer from './reducers/index';

const persistConfig = {
  key: 'shuppa',
  storage,
  whitelist: ['authReducer']
};
const rootReducer = persistReducer(persistConfig, reducer);

const store = createStore(rootReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export {
  store,
  persistor,
};
