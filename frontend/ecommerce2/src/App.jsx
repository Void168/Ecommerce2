import Navigation from "./components/Navigation";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
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
import { useEffect } from "react";
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
    <div className="bg-[#D8E3E7]">
      <CartButton />
      <ScrollToTop />
      <header>
        <div className="flex justify-center">
          <img
            src="/images/logo.png"
            alt="mini-logo"
            className="big-tablet:hidden small-phone:block shadow-none"
          />
        </div>
        <Navigation />
        <NavigationResponsive />
      </header>
      <AppProvider>
        <main
          className={
            location.pathname === "/login" || location.pathname === "/register"
              ? "py-8 px-4 small-phone:bg-bg big-tablet:bg-main bg-contain bg-repeat-round h-screen"
              : "py-8 px-4"
          }
        >
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/promo" element={<Promo />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/shipping" element={<Shipping />} />
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
            <Route path="/order/:id" element={<OrderDetail />}></Route>

            <Route path="/new-product" element={<NewProducts />} />
            <Route path="/new-article" element={<NewAriticles />} />
            <Route path="*" element={<Home />} />
            {user && <Route path="/orders" element={<Order />} />}
            {user && user.isAdmin && (
              <>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/product/:id/edit" element={<EditProduct />} />
              </>
            )}
          </Routes>
          <ScrollToTopButton />
        </main>
      </AppProvider>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
