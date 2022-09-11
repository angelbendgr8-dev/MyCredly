import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
// import { PersistGate } from 'redux-persist/integration/react'
import {UserAuthApi} from './services/userAuth';
import userAuth from './reducers/userAuth';
import wallets from './reducers/wallet.reducer';
import transactions from './reducers/transactions.reducer';
import miscs from './reducers/misc.reducer';
import {SettingApi} from './services/SettingsService';
import {WalletApi} from './services/wallet.services';
import {MiscApi} from './services/misc.services';
import { ConversionApi } from './services/conversion.services';
import { TransactionApi } from './services/transactions.services';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: 'userAuth,wallets',
};

const reducers = combineReducers({
  userAuth,
  wallets,
  transactions,
  miscs,

  [UserAuthApi.reducerPath]: UserAuthApi.reducer,
  [SettingApi.reducerPath]: SettingApi.reducer,
  [WalletApi.reducerPath]: WalletApi.reducer,
  [MiscApi.reducerPath]: MiscApi.reducer,
  [ConversionApi.reducerPath]: ConversionApi.reducer,
  [TransactionApi.reducerPath]: TransactionApi.reducer,
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
    }).concat([
      UserAuthApi.middleware,
      SettingApi.middleware,
      WalletApi.middleware,
      MiscApi.middleware,
      ConversionApi.middleware,
      TransactionApi.middleware,
    ]),
});
