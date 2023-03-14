import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const CartButton = () => {
  const location = useLocation();
  const { user } = useContext(AppContext);

  return (
    <Link
      to="/cart"
      className={
        location.pathname === "/cart" ||
        location.pathname === "/login" ||
        location.pathname === "/register"
          ? "hidden"
          : "w-12 h-12 fixed z-20 big-tablet:hidden left-2 small-phone:bottom-36 text-center text-sm cursor-pointer animate-bounce ease-in-out duration-300"
      }
    >
      {user && user?.cart?.count > 0 && (
        <span
          className="
              bg-[#51C4D3] px-3 py-1 rounded-full absolute z-10 top-0 left-6"
        >
          {user.cart.count}
        </span>
      )}
      <img
        src="/images/shopping-bag.png"
        alt="scrollToTop"
        className="shadow-none"
      />
    </Link>
  );
};

export default CartButton;
