import { createSlice } from '@reduxjs/toolkit'

// appApi
import appApi from '../services/appApi.js'

const initialState = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload)
    },
    resetNotifications: (state) => {
      state.notifications.forEach((obj) => {
        obj.status = 'đọc'
      })
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.signup.matchFulfilled,
      (_, { payload }) => payload,
    )
    builder.addMatcher(
      appApi.endpoints.login.matchFulfilled,
      (_, { payload }) => payload,
    )
    builder.addMatcher(
      appApi.endpoints.updateProfile.matchFulfilled,
      (_, { payload }) => payload,
    )
    builder.addMatcher(
      appApi.endpoints.deleteUser.matchFulfilled,
      (_, { payload }) => payload,
    )
    builder.addMatcher(
      appApi.endpoints.addToCart.matchFulfilled,
      (_, { payload }) => payload,
    )
    builder.addMatcher(
      appApi.endpoints.removeFromCart.matchFulfilled,
      (_, { payload }) => payload,
    )
    builder.addMatcher(
      appApi.endpoints.increaseCartProduct.matchFulfilled,
      (_, { payload }) => payload,
    )
    builder.addMatcher(
      appApi.endpoints.decreaseCartProduct.matchFulfilled,
      (_, { payload }) => payload,
    )
    builder.addMatcher(
      appApi.endpoints.createOrder.matchFulfilled,
      (_, { payload }) => payload,
    )
  },
})

export const { logout, addNotification, resetNotifications } = userSlice.actions
export default userSlice.reducer
