import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getUrl} from '../../helpers/constants';
console.log(getUrl());
// Define a service using a base URL and expected endpoints
export const ConversionApi = createApi({
  reducerPath: 'ConversionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getUrl(),
    prepareHeaders: (headers, {getState}) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
     return headers;
    },
  }),
  endpoints: builder => ({
    getConversionRate: builder.query({
      query: credentials => ({
        url: `/conversion/rate/${credentials.symbol}/${credentials.convert}/${credentials.amount}`,
        method: 'get',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetConversionRateQuery} = ConversionApi;
