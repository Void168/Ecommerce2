import Navigation from './components/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <div className="App bg-[#041C32] h-max">
      <BrowserRouter>
        <header className="App-header">
          <Navigation />
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  )
}

export default App
