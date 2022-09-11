import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getUrl} from '../../helpers/constants';
console.log(getUrl());
// Define a service using a base URL and expected endpoints
export const SettingApi = createApi({
  reducerPath: 'SettingApi',
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
    updateProfilePics: builder.mutation({
      query: credentials => ({
        url: '/users/update/picture',
        method: 'POST',
        body: credentials,
      }),
    }),
    updateProfileInfo: builder.mutation({
      query: credentials => ({
        url: '/users/update/info',
        method: 'POST',
        body: credentials,
      }),
    }),
    changePassword: builder.mutation({
      query: credentials => ({
        url: '/users/change/password',
        method: 'POST',
        body: credentials,
      }),
    }),
    createPin: builder.mutation({
      query: credentials => ({
        url: '/users/create/pin',
        method: 'POST',
        body: credentials,
      }),
    }),
    updatePin: builder.mutation({
      query: credentials => ({
        url: '/users/update/pin',
        method: 'POST',
        body: credentials,
      }),
    }),
    update2faSecurity: builder.mutation({
      query: credentials => ({
        url: '/users/update/security',
        method: 'POST',
        body: credentials,
      }),
    }),
    addAccount: builder.mutation({
      query: credentials => ({
        url: '/users/add/bank',
        method: 'POST',
        body: credentials,
      }),
    }),
    getBanks: builder.query({
      query: () => ({
        url: '/users/get/banks',
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUpdateProfilePicsMutation,
  useUpdateProfileInfoMutation,
  useChangePasswordMutation,
  useCreatePinMutation,
  useUpdatePinMutation,
  useUpdate2faSecurityMutation,
  useAddAccountMutation,
  useGetBanksQuery,
} = SettingApi;
