import { configureStore } from '@reduxjs/toolkit'
import productSlice from './features/productSlice.js'
import userSlice from './features/userSlice.js'
import articleSlice from './features/articleSlice.js'
import appApi from './services/appApi.js'

// persit store
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

// reducers
const reducer = combineReducers({
  user: userSlice,
  products: productSlice,
  articles: articleSlice,
  [appApi.reducerPath]: appApi.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blackList: [appApi.reducerPath,'products', 'articles'],
}

// persist store
const persistedReducer = persistReducer(persistConfig, reducer)

// create Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, appApi.middleware],
})

export default store
