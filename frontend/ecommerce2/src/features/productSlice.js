import { createSlice } from '@reduxjs/toolkit'

// appApi
import appApi from '../services/appApi.js'

const initialState = []

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducer: {},
})

export default productSlice.reducer
