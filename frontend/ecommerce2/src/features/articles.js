import { createSlice } from '@reduxjs/toolkit'

// appApi
import appApi from '../services/appApi.js'

const initialState = []

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    updatearticles: (_, action) => {
      return action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.createArticle.matchFulfilled,
      (_, { payload }) => payload,
    )
    builder.addMatcher(
      appApi.endpoints.updateArticle.matchFulfilled,
      (_, { payload }) => payload,
    )
    builder.addMatcher(
      appApi.endpoints.deleteArticle.matchFulfilled,
      (_, { payload }) => payload,
    )
  },
})

export const { updateArticles } = articleSlice.actions
export default articleSlice.reducer
