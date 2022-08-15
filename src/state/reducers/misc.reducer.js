import {createSlice} from '@reduxjs/toolkit';
// import type {User} from '../services/userAuthServices';
// import {RootState} from '../store';

const slice = createSlice({
  name: 'miscreducer',
  initialState: {
    adminaccount: null,
  },
  reducers: {
    addAccount: (state, {payload: {account}}) => {
      state.adminaccount = account;
    },
  },
});

export const {addAccount} = slice.actions;

export default slice.reducer;

export const selectAdminAccount = state => state.misc.adminaccount;
