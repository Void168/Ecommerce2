import Navigation from './components/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App bg-[#D8E3E7] h-max">
      <BrowserRouter>
        <header className="App-header">
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Home />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App
