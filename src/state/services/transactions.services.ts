import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getUrl} from '../../helpers/constants';
console.log(getUrl());
// Define a service using a base URL and expected endpoints
export const TransactionApi = createApi({
  reducerPath: 'TransactionApi',
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
    createListing: builder.mutation({
      query: credentials => ({
        url: 'users/create/listing',
        method: 'post',
        body: credentials,
      }),
    }),
    createTrading: builder.mutation({
      query: credentials => ({
        url: 'users/create/trading',
        method: 'post',
        body: credentials,
      }),
    }),
    cancelTrading: builder.mutation({
      query: credentials => ({
        url: 'users/cancel/trading',
        method: 'post',
        body: credentials,
      }),
    }),
    confirmTradingPayment: builder.mutation({
      query: credentials => ({
        url: 'users/confirm/trading/payment',
        method: 'post',
        body: credentials,
      }),
    }),
    appealTrading: builder.mutation({
      query: credentials => ({
        url: 'users/apeal/trading',
        method: 'post',
        body: credentials,
      }),
    }),
    completeTrading: builder.mutation({
      query: credentials => ({
        url: 'users/complete/trading/',
        method: 'post',
        body: credentials,
      }),
    }),
    disputeTrading: builder.mutation({
      query: credentials => ({
        url: 'users/dispute/trading',
        method: 'post',
        body: credentials,
      }),
    }),
    getListings: builder.query({
      query: () => ({
        url: 'users/get/available/listing',
      }),
    }),
    getTradingHistory: builder.query({
      query: () => ({
        url: 'users/get/trading/history',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateListingMutation,
  useGetListingsQuery,
  useCreateTradingMutation,
  useConfirmTradingPaymentMutation,
  useCancelTradingMutation,
  useGetTradingHistoryQuery,
  useAppealTradingMutation,
  useCompleteTradingMutation,
  useDisputeTradingMutation,
} = TransactionApi;
