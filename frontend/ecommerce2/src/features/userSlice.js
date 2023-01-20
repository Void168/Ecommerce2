import { createSlice } from '@reduxjs/toolkit'

// appApi
import appApi from '../services/appApi.js'

const initialState = null

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducer: {},
})

export const {
  logout,
  addNotifications,
  resetNotifications,
} = userSlice.actions
export default userSlice.reducer
