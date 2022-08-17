import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getUrl} from '../../helpers/constants';
console.log(getUrl());
// Define a service using a base URL and expected endpoints
export const MiscApi = createApi({
  reducerPath: 'MiscApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pro-api.coinmarketcap.com',
    prepareHeaders: (headers, {getState}) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = 'c5c5a3fe-a7bb-4240-86c6-6cf3cb77aeb5';
      // headers.set('Content-Type', 'multipart/form-data');
      // headers.set('Accept', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set(
          'X-CMC_PRO_API_KEY',
          'c5c5a3fe-a7bb-4240-86c6-6cf3cb77aeb5',
        );
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getAdminAccount: builder.query({
      query: () => ({
        url: '/users/wallets',
        method: 'get',
      }),
    }),
    getConversionRate: builder.query({
      query: credentials => ({
        url: `/v2/tools/price-conversion?symbol=${credentials.symbol}&convert=${credentials.convert}&amount=${credentials.amount}`,
        method: 'get',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetAdminAccountQuery, useGetConversionRateQuery} = MiscApi;
