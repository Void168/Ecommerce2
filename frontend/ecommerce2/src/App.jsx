import Navigation from './components/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import NewProducts from './pages/NewProducts'
import Product from './pages/Product'
import Category from './pages/Category'
import Cart from './pages/Cart'
import Order from './pages/Order'
import Dashboard from './pages/Dashboard'
import EditProduct from './pages/EditProduct'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { addNotification } from './features/userSlice'

function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const socket = io('http://localhost:8080')
    socket.off('notification').on('notification', (msgObj, user_id) => {
      // logic for notification
      if (user_id === user._id) {
        dispatch(addNotification(msgObj))
      }
    })

    socket.off('new-order').on('new-order', (msgObj) => {
      if (user.isAdmin) {
        dispatch(addNotification(msgObj))
      }
    })
  }, [dispatch, user._id, user.isAdmin])
  return (
    <div className="bg-[#D8E3E7]">
      <BrowserRouter>
        <header>
          <Navigation />
        </header>
        <main className="h-screen my-8">
          <Routes>
            <Route index element={<Home />} />
            {!user && (
              <>
                <Route path="/login" element={<Login />} />
                {user && <Route path="/login" element={<Home />} />}
                <Route path="/register" element={<Signup />} />
              </>
            )}
            <Route path="/product/:id" element={<Product />} />
            <Route path="/category/:category" element={<Category />} />
            {user && <Route path="/cart" element={<Cart />} />}

            <Route path="/new-product" element={<NewProducts />} />
            <Route path="*" element={<Home />} />
            {user && <Route path="/orders" element={<Order />} />}
            {user && user.isAdmin && (
              <>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/product/:id/edit" element={<EditProduct />} />
              </>
            )}
          </Routes>
        </main>
        <footer className="bottom-0">
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App
