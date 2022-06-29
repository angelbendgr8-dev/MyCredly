import {createSlice} from '@reduxjs/toolkit';
// import type {User} from '../services/userAuthServices';
// import {RootState} from '../store';

const slice = createSlice({
  name: 'userauth',
  initialState: {
    user: null,
    token: null,
    guest: false,
    profilePics: null,
    push_token: null,
  },
  reducers: {
    setCredentials: (state, {payload: {user, token}}) => {
      state.user = user;
      state.token = token;
    },
    setToken: (state, {payload: {value}}) => {
      state.token = value;
    },
    updateCredentials: (state, {payload: {user}}) => {
      // console.log(user);
      state.user = user;
    },
    updatePics: (state, {payload: {pics}}) => {
      // console.log(user);
      state.profilePics = pics;
    },
    setPushToken: (state, {payload: {token}}) => {
      // console.log(user);
      state.push_token = token;
    },
    // updateEmail: (
    //   state,
    //   {payload: {user}}
    // ) => {
    //   // console.log(user);
    //   state.user = user;
    // },
    signOut: state => {},
  },
});

export const {
  setCredentials,
  updateCredentials,
  signOut,
  setToken,
  updatePics,
  setPushToken,
} = slice.actions;

export default slice.reducer;

export const selectCurrentUser = state => state.userAuth.user;
export const selectToken = state => state.userAuth.token;
export const selectPics = state => state.userAuth.profilePics;
export const selectPushToken = state => state.userAuth.push_token;
