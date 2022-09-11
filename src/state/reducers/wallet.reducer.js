import {createSlice} from '@reduxjs/toolkit';
// import type {User} from '../services/userAuthServices';
// import {RootState} from '../store';

const slice = createSlice({
  name: 'walletreducer',
  initialState: {
    wallets: null,
    fiats: null,
    cryptos: null,
    banks: [],
  },
  reducers: {
    setWallets: (state, {payload: {wallets}}) => {
      state.wallets = wallets;
      state.fiats = wallets.filter(item => item.category.name === 'Fiat');
      state.cryptos = wallets.filter(item => item.category.name === 'Crypto');
    },
    updateWallet: (state, {payload: {wallet}}) => {
      let found = state.wallets.find(cwall => cwall.id === wallet.id);
      if (found) {
        found = wallet;
      }
      state.fiats = state.wallets.filter(item => item.category.name === 'Fiat');
      state.cryptos = state.wallets.filter(
        item => item.category.name === 'Crypto',
      );
    },

    setBanks: (state, {payload: {banks}}) => {
      state.banks = banks;
    },
    addBank: (state, {payload: {bank}}) => {
      state.banks = [...state.banks, bank];
    },
  },
});

export const {setWallets, updateWallet, addBank, setBanks} = slice.actions;

export default slice.reducer;

export const selectWallets = state => state.wallets.wallets;
export const selectFiats = state => state.wallets.fiats;
export const selectCrypto = state => state.wallets.cryptos;
export const selectBank = state => state.wallets.banks;
