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

    // create product
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        body: product,
        method: 'POST',
      }),
    }),

    // add to cart
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: '/products/add-to-cart',
        body: cartInfo,
        method: 'POST',
      }),
    }),

    // remove from cart
    removeFromCart: builder.mutation({
      query: (body) => ({
        url: '/products/remove-from-cart',
        body,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = appApi

export default appApi
