import Navigation from './components/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './components/Footer'
import { useSelector } from 'react-redux'
import NewProducts from './pages/NewProducts'

function App() {
  const user = useSelector((state) => state.user)
  return (
    <div className="App bg-[#D8E3E7] h-max">
      <BrowserRouter>
        <header className="App-header">
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route index element={<Home />} />
            {!user && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
              </>
            )}

            <Route path="/new-product" element={<NewProducts />} />
            <Route path="*" element={<Home />} />
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
