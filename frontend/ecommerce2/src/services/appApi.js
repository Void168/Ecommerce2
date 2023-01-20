import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// create the api

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  endpoints: (builder) => ({
    //   create users
    signup: builder.mutation({
      query: (user) => ({
        url: '/users/signup',
        method: 'POST',
        body: user,
      }),
    }),

    // login
    login: builder.mutation({
      query: (user) => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
    }),
  }),
})

export const { userSignupMutation, userLoginMutation } = appApi

export default appApi
