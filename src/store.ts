import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {appReducer} from './modules/app/reducer';
import {authReducer} from './modules/auth/reducer';

/*
 *--------------------------------------------------*
 * Persist config documentation
 * https://github.com/rt2zz/redux-persist/blob/master/src/types.js#L13-L27
 *--------------------------------------------------*
 */

const appPersistConfig = {
  storage: AsyncStorage,
  key: 'app',
};

const authPersistConfig = {
  storage: AsyncStorage,
  key: 'auth',
};

export const reducers = {
  app: persistReducer(appPersistConfig, appReducer),
  auth: persistReducer(authPersistConfig, authReducer),
};

export const rootReducer = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

/*
 *--------------------------------------------------*
 * Reset persist store: persistor.purge()
 *--------------------------------------------------*
 */
