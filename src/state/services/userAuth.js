import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getUrl} from '../../helpers/constants';

// Define a service using a base URL and expected endpoints
export const UserAuthApi = createApi({
  reducerPath: 'UserAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getUrl(),
    prepareHeaders: (headers, {getState}) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().userAuth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: credentials => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    checkEmail: builder.mutation({
      query: credentials => ({
        url: 'check/email',
        method: 'POST',
        body: credentials,
      }),
    }),
    confirmEmail: builder.mutation({
      query: credentials => ({
        url: 'confirm/email',
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyEmail: builder.mutation({
      query: credentials => ({
        url: 'verify/email',
        method: 'POST',
        body: credentials,
      }),
    }),
    confirmMobile: builder.mutation({
      query: credentials => ({
        url: 'confirm/mobile',
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyMobile: builder.mutation({
      query: credentials => ({
        url: 'verify/mobile',
        method: 'POST',
        body: credentials,
      }),
    }),
    checkUsername: builder.mutation({
      query: credentials => ({
        url: 'check/username',
        method: 'POST',
        body: credentials,
      }),
    }),

    forgotPassword: builder.mutation({
      query: credentials => ({
        url: '/password/email',
        method: 'POST',
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: credentials => ({
        url: 'auth/reset/password',
        method: 'POST',
        body: credentials,
      }),
    }),
    updatePushToken: builder.mutation({
      query: credentials => ({
        url: 'user/updatePNToken',
        method: 'POST',
        body: credentials,
      }),
    }),
    socialAuth: builder.mutation({
      query: credentials => ({
        url: '/login/social',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSocialAuthMutation,
  useUpdatePushTokenMutation,
  useCheckUsernameMutation,
  useCheckEmailMutation,
  useConfirmEmailMutation,
  useVerifyEmailMutation,
  useConfirmMobileMutation,
  useVerifyMobileMutation,
} = UserAuthApi;
