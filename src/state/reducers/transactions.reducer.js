import {createSlice} from '@reduxjs/toolkit';
// import type {User} from '../services/userAuthServices';
// import {RootState} from '../store';
import _ from 'lodash';

const slice = createSlice({
  name: 'transactionreducers',
  initialState: {
    deposits: [],
    withdrawals: [],
    mylisting: [],
    listings: [],
    buylistings: [],
    selllistings: [],
    tradings: [],
    tradeHistory: [],
  },
  reducers: {
    setDeposits: (state, {payload: {deposits}}) => {
      state.deposits = deposits;
    },
    addDeposits: (state, {payload: {transaction}}) => {
      state.transactions = [...state.transactions, transaction];
    },

    setWithdrawals: (state, {payload: {withdrawals}}) => {
      state.withdrawals = withdrawals;
    },
    addWithdrawal: (state, {payload: {withdrawal}}) => {
      state.withdrawals = [...state.withdrawals, withdrawal];
    },
    setListings: (state, {payload: {listings}}) => {
      state.listings = listings;
      state.buylistings = listings.filter(item => item.type === 'buy');
      state.selllistings = listings.filter(item => item.type === 'sell');
    },
    setTrading: (state, {payload: {tradings}}) => {
      state.tradings = tradings;
    },
    addTrading: (state, {payload: {trading}}) => {
      if (_.size(state.tradings) > 0) {
        state.tradings = [...state.tradings, trading];
      } else {
        state.tradings = [trading];
      }
    },
    updateTrading: (state, {payload: {trading}}) => {
      let found = state.tradings.filter(temp => temp.id === trading.id);
      if (found) {
        found = trading;
      }
    },
    addListing: (state, {payload: {listing}}) => {
      if (_.size(state.mylisting) > 0) {
        state.mylisting = [...state.mylisting, listing];
      } else {
        state.mylisting = [listing];
      }
    },
  },
});

export const {
  setDeposits,
  setWithdrawals,
  addWithdrawal,
  setListings,
  addListing,
  setTrading,
  addTrading,
  updateTrading,
  setTradingHistory,
} = slice.actions;

export default slice.reducer;

export const selectDeposits = state => state.transactions.deposits;
export const selectWithdrawals = state => state.transactions.withdrawals;
export const selectListings = state => state.transactions.listings;
export const selectMyListings = state => state.transactions.mylistings;
export const selectBuying = state => state.transactions.buylistings;
export const selectSelling = state => state.transactions.selllistings;
export const selectTrading = state => state.transactions.tradings;
