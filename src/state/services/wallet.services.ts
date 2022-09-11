import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getUrl} from '../../helpers/constants';
console.log(getUrl());
// Define a service using a base URL and expected endpoints
export const WalletApi = createApi({
  reducerPath: 'WalletApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getUrl(),
    prepareHeaders: (headers, {getState}) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().userAuth.token;
      // headers.set('Content-Type', 'multipart/form-data');
      // headers.set('Accept', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getWallets: builder.query({
      query: () => ({
        url: '/users/wallets',
        method: 'get',
      }),
    }),
    getTransactions: builder.query({
      query: () => ({
        url: '/users/get/transactions',
        method: 'get',
      }),
    }),
    getWithdrawals: builder.query({
      query: () => ({
        url: '/users/get/withdrawals',
        method: 'get',
      }),
    }),
    getBalance: builder.query({
      query: id => ({
        url: `/users/get/balance/${id}`,
        method: 'get',
      }),
    }),
    fundWallet: builder.mutation({
      query: credentials => ({
        url: 'users/fund/wallet',
        method: 'post',
        body: credentials,
      }),
    }),
    uploadReciept: builder.mutation({
      query: credentials => ({
        url: 'users/upload/payment/receipt',
        method: 'post',
        body: credentials,
      }),
    }),
    withdrawFund: builder.mutation({
      query: credentials => ({
        url: 'users/withdraw/funds',
        method: 'post',
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetWalletsQuery,
  useGetTransactionsQuery,
  useFundWalletMutation,
  useUploadRecieptMutation,
  useWithdrawFundMutation,
  useGetWithdrawalsQuery,
  useGetBalanceQuery,
} = WalletApi;
