import Navigation from './components/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <div className="App bg-[#041C32] h-max">
      <BrowserRouter>
        <header className="App-header">
          <Navigation />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Home />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  )
}

export default App
