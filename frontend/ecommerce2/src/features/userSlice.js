import { createSlice } from '@reduxjs/toolkit'

// appApi
import appApi from '../services/appApi.js'

const initialState = null

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.signup.matchFulfilled,
      (_, { payload }) => payload,
    )
    builder.addMatcher(
      appApi.endpoints.login.matchFulfilled,
      (_, { payload }) => payload,
    )
  },
})

export const {
  logout,
  addNotifications,
  resetNotifications,
} = userSlice.actions
export default userSlice.reducer
