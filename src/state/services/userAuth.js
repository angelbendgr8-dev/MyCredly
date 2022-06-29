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
        url: 'user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: credentials => ({
        url: 'user/register-free',
        method: 'POST',
        body: credentials,
      }),
    }),
    changeEmail: builder.mutation({
      query: credentials => ({
        url: '/change/email',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserInfo: builder.query({
      query: email => ({
        url: `user/profile?email=${email}`,
      }),
    }),
    changePassword: builder.mutation({
      query: credentials => ({
        url: '/change/password',
        method: 'POST',
        body: credentials,
      }),
    }),
    updateInfo: builder.mutation({
      query: credentials => ({
        url: '/update/profile/info',
        method: 'POST',
        body: credentials,
      }),
    }),
    updateFavChoice: builder.mutation({
      query: credentials => ({
        url: '/update/profile/fav/choice',
        method: 'POST',
        body: credentials,
      }),
    }),
    updateProfilePics: builder.mutation({
      query: credentials => ({
        url: `/user/profilePhoto?email=${credentials.email}`,
        method: 'POST',
        body: credentials.formData,
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
        url: '/reset/password',
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
  useChangeEmailMutation,
  useChangePasswordMutation,
  useUpdateInfoMutation,
  useUpdateProfilePicsMutation,
  useSocialAuthMutation,
  useUpdateFavChoiceMutation,
  useGetUserInfoQuery,
  useUpdatePushTokenMutation,
} = UserAuthApi;
