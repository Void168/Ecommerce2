import { createSlice } from '@reduxjs/toolkit'

// appApi
import appApi from '../services/appApi.js'

const initialState = null

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: () => initialState,
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
      appApi.endpoints.addToCart.matchFulfilled,
      (_, { payload }) => payload,
    )
    builder.addMatcher(
      appApi.endpoints.removeFromCart.matchFulfilled,
      (_, { payload }) => payload,
    )
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
