import {AnyAction, CombinedState, combineReducers} from 'redux';
import storageSession from 'redux-persist/es/storage/session'
import storage from 'redux-persist/lib/storage';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';

import signup from './signup';

export type RootState = ReturnType<typeof reducers>;

const reducers = combineReducers({
  signup,
});

const rootReducer = (
  state:
    | CombinedState<{
        signup: {
          item: object;
          signUp: {
            loading: boolean;
            error: any;
          };
        };
      }>
    | undefined,
  action: AnyAction,
) => {
  return reducers(state, action);
};

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['signup'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    return middlewares;
  },
});

const persistor = persistStore(store);

export {store, persistor};
