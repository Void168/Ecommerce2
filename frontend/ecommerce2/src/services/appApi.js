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

    // delete user
    deleteUser: builder.mutation({
      query: ({ user_id }) => ({
        url: `/users/${user_id}`,
        body: {
          user_id,
        },
        method: 'DELETE',
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

    // create review
    createReview: builder.mutation({
      query: (id) => ({
        url: `/products/${id}/reviews`,
        body: id,
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

    // increase cart
    increaseCartProduct: builder.mutation({
      query: (body) => ({
        url: '/products/increase-cart',
        body,
        method: 'POST',
      }),
    }),

    // decrease cart
    decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: '/products/decrease-cart',
        body,
        method: 'POST',
      }),
    }),

    // create order
    createOrder: builder.mutation({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
    }),

    // delete product
    deleteProduct: builder.mutation({
      query: ({ product_id, user_id }) => ({
        url: `/products/${product_id}`,
        body: {
          user_id,
        },
        method: 'DELETE',
      }),
    }),

    // update product
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        body: product,
        method: 'PATCH',
      }),
    }),

    // update profile
    updateProfile: builder.mutation({
      query: (user) => ({
        url: `/users/${user.id}`,
        body: user,
        method: 'PATCH',
      }),
    }),

    // create article
    createArticle: builder.mutation({
      query: (article) => ({
        url: '/articles',
        body: article,
        method: 'POST',
      }),
    }),

    // delete article
    deleteArticle: builder.mutation({
      query: ({ article_id, user_id }) => ({
        url: `/articles/${article_id}`,
        body: {
          user_id,
        },
        method: 'DELETE',
      }),
    }),

    // update article
    updateArticle: builder.mutation({
      query: (article) => ({
        url: `/articles/${article.id}`,
        body: article,
        method: 'PATCH',
      }),
    }),
  }),
})

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateProductMutation,
  useCreateReviewMutation,
  useAddToCartMutation,
  useDeleteUserMutation,
  useRemoveFromCartMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useCreateOrderMutation,
  useDeleteProductMutation,
  useUpdateProfileMutation,
  useUpdateProductMutation,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
} = appApi

export default appApi
