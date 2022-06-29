import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
// import { PersistGate } from 'redux-persist/integration/react'
import {UserAuthApi} from './services/userAuth';
import userAuth from './reducers/userAuth';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const reducers = combineReducers({
  userAuth,

  [UserAuthApi.reducerPath]: UserAuthApi.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'userauth/signOut') {
    // this applies to all keys defined in persistConfig(s)
    // store.removeItem('persist:root');

    state = {};
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([UserAuthApi.middleware]),
});
