import React from "react";
import { Link, useLocation } from "react-router-dom";

const CartResponsive = () => {
  const location = useLocation();

  return (
    <Link
      to="/cart"
      className={location.pathname === "/cart" ? "hidden" : "w-12 h-12 fixed z-20 big-tablet:hidden left-2 small-phone:bottom-36 text-center text-sm cursor-pointer animate-bounce ease-in-out duration-300"}
    >
      <img
        src="/images/shopping-bag.png"
        alt="scrollToTop"
        className="shadow-none"
      />
    </Link>
  );
};

export default CartResponsive;
