import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {appReducer} from './modules/app/reducer';
import createSagaMiddleware from 'redux-saga';
import {authReducer} from './modules/auth/reducers';
import rootSaga from 'src/sagas/rootSaga';
import categoryReducer from 'src/modules/category/reducers';
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

const categoryPersistConfig = {
  storage: AsyncStorage,
  key: 'category',
};

export const reducers = {
  app: persistReducer(appPersistConfig, appReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  category: persistReducer(categoryPersistConfig, categoryReducer),
};

export const rootReducer = combineReducers(reducers);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [sagaMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

/*
 *--------------------------------------------------*
 * Reset persist store: persistor.purge()
 *--------------------------------------------------*
 */
