import Navigation from "./components/Navigation";
import { Route, Routes, useLocation } from "react-router-dom";
import {  AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import NewProducts from "./pages/NewProducts";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Dashboard from "./pages/Dashboard";
import EditProduct from "./pages/EditProduct";
import {  useEffect } from "react";
import { io } from "socket.io-client";
import { addNotification } from "./features/userSlice";
import ScrollToTop from "./components/ScrollToTop";
import OrderDetail from "./pages/OrderDetail";
import ScrollToTopButton from "./components/ScrollToTopButton";
import About from "./pages/About";
import Promo from "./pages/Promo";
import Payment from "./pages/Payment";
import Shipping from "./pages/Shipping";
import NewAriticles from "./pages/NewArticles";
import NavigationResponsive from "./components/NavigationResponsive";
import CartButton from "./components/CartButton";
import SearchPage from "./pages/SearchPage";
import Profile from './pages/Profile';
import EditArticle from "./pages/EditArticle";

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

function App() {
  const user = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.off("notification").on("notification", (msgObj, user_id) => {
      // logic for notification
      if (user_id === user._id) {
        dispatch(addNotification(msgObj));
      }
    });

    socket.off("new-order").on("new-order", (msgObj) => {
      if (user.isAdmin) {
        dispatch(addNotification(msgObj));
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppProvider>
      <div className="bg-[#D8E3E7]">
        <CartButton />
        <ScrollToTop />
        <header>
          <Navigation />
          <NavigationResponsive />
        </header>
        <main
          className={
            location.pathname === "/login" || location.pathname === "/register"
              ? "py-8 px-4 w-full small-phone:bg-bg big-tablet:bg-main bg-contain bg-repeat-round max-h-max"
              : "py-8 px-4 bg-main w-full"
          }
        >
          <div className="flex justify-center">
            <img
              src="/images/logo.png"
              alt="mini-logo"
              className="big-tablet:hidden small-phone:block shadow-none"
            />
          </div>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/promo" element={<Promo />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/search/:searchName" element={<SearchPage />} />
            {!user && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
              </>
            )}
            <Route path="/san-pham/:id" element={<Product />} />
            <Route path="/danh-muc/:category/:page" element={<Category />} />
            {user && <Route path="/cart" element={<Cart />} />}
            <Route path="/order/:id" element={<OrderDetail />}></Route>

            <Route path="*" element={<Home />} />
            {user && (
              <>
                <Route path="/orders" element={<Order />} />
                <Route path="/profile/:id/edit" element={<Profile />} />
              </>
            )}
            {user && user.isAdmin && (
              <>
                <Route path="/new-product" element={<NewProducts />} />
                <Route path="/new-article" element={<NewAriticles />} />
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/product/:id/edit" element={<EditProduct />} />
                <Route path="/article/:id/edit" element={<EditArticle />} />
              </>
            )}
          </Routes>
          <ScrollToTopButton />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
