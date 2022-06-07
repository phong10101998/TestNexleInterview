import {AnyAction, CombinedState, combineReducers} from 'redux';
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

import user from './signup';
import categories from './categories';

export type RootState = ReturnType<typeof reducers>;

const reducers = combineReducers({
  user,
  categories,
});

const rootReducer = (
  state:
    | CombinedState<{
        user: {
          userItem: object;
          status: {
            loading: boolean;
            error: any;
          };
        };
        categories: {
          categoryItem: object;
          status: {
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
  whitelist: [],
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
