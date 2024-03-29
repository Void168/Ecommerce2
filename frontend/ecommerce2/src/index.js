import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './styled.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
// setup store
import store from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import { BrowserRouter } from 'react-router-dom'
import Loading from './components/Loading'
import { createTheme, ThemeProvider } from '@mui/material';


const theme = createTheme({
  typography: {
    fontFamily: [
      'Quicksand',
      'sans-serif',
    ].join(','),
  },
  BottomNavigationActionLabel: {
    fontSize: '10px',
  }
});

// store to persit
const persistedStore = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <React.StrictMode>
        <PersistGate loading={<Loading />} persistor={persistedStore}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
      </PersistGate>
    </React.StrictMode>
    ,
    </BrowserRouter>
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
