import {createSlice} from '@reduxjs/toolkit';
// import type {User} from '../services/userAuthServices';
// import {RootState} from '../store';

const slice = createSlice({
  name: 'walletreducer',
  initialState: {
    wallets: null,
    fiats: null,
    cryptos: null,
  },
  reducers: {
    setWallets: (state, {payload: {wallets}}) => {
      state.wallets = wallets;
      state.fiats = wallets.filter(item => item.category.name === 'Fiat');
      state.cryptos = wallets.filter(item => item.category.name === 'Crypto');
    },
  },
});

export const {setWallets, updateWallet} = slice.actions;

export default slice.reducer;

export const selectWallets = state => state.wallets.wallets;
export const selectFiats = state => state.wallets.fiats;
export const selectCrypto = state => state.wallets.cryptos;
