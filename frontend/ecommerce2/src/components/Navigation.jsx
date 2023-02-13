import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetNotifications } from "../features/userSlice.js";
import categories from "../categories.js";
import axios from "../axios";

function Navigation() {
  const [navbar, setNavbar] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bellRef = useRef(null);
  const [bellPos, setBellPos] = useState({});
  const [display, setDisplay] = useState(false);

  const signoutHandler = () => {
    navigate("/login");
    dispatch(logout());
  };

  const unreadNotifications = user?.notifications?.reduce(
    (account, current) => {
      if (current.status === "chưa đọc") return account;
      return account;
    },
    0
  );
  const activeLink = "bg-[#51C4D3] text-black desktop:p-4 big-tablet:px-2 big-tablet:py-4 rounded-full desktop:text-lg big-tablet:text-base";
  const normalLink =
    "p-4 hover:bg-[#51C4D3] hover:text-black rounded-full hover:shadow-sm ease-in-out duration-300 desktop:text-lg big-tablet:text-base";

  const handleToggleNotifications = () => {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    if (display) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
    dispatch(resetNotifications());
    if (unreadNotifications > 0)
      axios.post(`/users/${user._id}/updateNotifications`);
  };

  const setFixed = () => {
    if (window.scrollY >= 200) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", setFixed);

  return (
    <div
      className={
        navbar
          ? "fixed bg-[#126E82] shadow-sm top-0 w-full z-50 opacity-90 small-phone:hidden big-tablet:block"
          : "w-full sticky z-50 small-phone:hidden big-tablet:block"
      }
    >
      <ul className="justify-around bg-[#126E82] p-4 flex">
        <div className="laptop:w-1/12 small-phone:w-0">
          <Link className="h-10" to="/">
            <img src="../images/sfsff.png" alt="logo" />
          </Link>
        </div>
        <div className="flex justify-evenly big-desktop:w-8/12 laptop:w-9/12 big-tablet:w-full">
          <ul className="w-full">
            <li className="text-white flex justify-between text-xl">
              <div className="mt-3 dropdown__categories">
                <NavLink className="p-4 mb-2 hover:bg-[#132C33] rounded-3xl hover:shadow-sm ease-in-out duration-200 hover:rounded-b-none desktop:text-lg big-tablet:text-base">
                  Danh mục
                </NavLink>
                <div className="grid absolute bg-[#132C33] mt-3 border-none rounded-b-3xl grid-cols-4 rounded-r-2xl z-50 shadow-sm">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <Link
                        to={`/category/${category.name.toLocaleLowerCase()}`}
                        className="dropdown__categories--element"
                      >
                        <div className="mt-2 p-6 text-center">
                          <img
                            src={category.img}
                            alt="category"
                            className="w-32 h-32 rounded-lg shadow-sm ml-2 "
                          />
                          <h1 className="mt-1">{category.name}</h1>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <NavLink
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/about"
              >
                Về chúng tôi
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/promo"
              >
                Khuyến mãi
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/payment"
              >
                Thanh toán
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/shipping"
              >
                Vận chuyển
              </NavLink>
              <NavLink onClick={handleToggleNotifications} className="relative">
                <span className="bg-red-400 px-2 rounded-full w-6 h-6 absolute left-2 top-1 text-sm">
                  {unreadNotifications}
                </span>
                <i
                  className="fas fa-bell mt-5"
                  ref={bellRef}
                  data-count={unreadNotifications || null}
                ></i>
                {/* notifications */}
                <div
                  className={
                    !display
                      ? "hidden"
                      : "container mx-auto absolute text-sm w-72 bg-[#D8E3E7] z-50 p-2 mt-2 text-black rounded-lg shadow-sm overflow-auto h-64"
                  }
                >
                  {user?.notifications.length > 0 ? (
                    user?.notifications.map((notification) => (
                      <div className="border-b border-[#132C33] py-2">
                        <p
                          className={`notification-${notification.status}`}
                          key={notification.id}
                        ></p>
                        {notification.message}
                        <br />
                        <p>
                          vào lúc{" "}
                          {notification.time.split("T")[1].slice(0, 8) +
                            " " +
                            "ngày" +
                            " " +
                            notification.time
                              .slice(0, 10)
                              .toString()
                              .split("-")
                              .reverse()
                              .join("-")}
                        </p>
                      </div>
                    ))
                  ) : (
                    <span>Không có thông báo mới</span>
                  )}
                </div>
              </NavLink>
              {!user ? (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  to="/login"
                >
                  Đăng nhập
                </NavLink>
              ) : (
                <div className="mt-4 dropdown__profile relative">
                  <NavLink
                    className="p-4 hover:bg-[#51C4D3] hover:text-black rounded-3xl hover:shadow-sm ease-in-out duration-200 hover:rounded-b-none desktop:text-lg  big-tablet:text-base"
                    to="/"
                  >
                    {user.name} <i className="fa-solid fa-caret-down" />
                  </NavLink>
                  {user.isAdmin ? (
                    <ul className="flex flex-col text-black absolute z-10 w-48">
                      <div className="bg-[#51C4D3] rounded-b-3xl p-2">
                        <li className="my-1">
                          <Link to="/orders">Lịch sử mua hàng</Link>
                        </li>
                        <li className="my-1">
                          <Link to="/dashboard">Quản lý</Link>
                        </li>
                        <li className=" text-center">
                          <button
                            onClick={signoutHandler}
                            className="bg-[#132C33]"
                          >
                            Đăng xuất
                          </button>
                        </li>
                      </div>
                    </ul>
                  ) : (
                    <ul className="flex flex-col text-black absolute z-10">
                      <div className="bg-[#51C4D3] rounded-b-3xl p-2">
                        <li>
                          <Link to="/orders">Lịch sử mua hàng</Link>
                        </li>
                        <li>
                          <button onClick={signoutHandler}>Đăng xuất</button>
                        </li>
                      </div>
                    </ul>
                  )}
                </div>
              )}
            </li>
            <li className="items-center flex flex-row">
              <div className="desktop:w-6/12 big-tablet:w-5/12">
                <input className="mt-2 mx-2 p-1 rounded w-full" placeholder="Tìm kiếm"></input>
              </div>

              <div className="desktop:w-6/12 pl-8 laptop:w-7/12 big-tablet:w-8/12">
                <ul className="flex flex-row justify-around text-white desktop:text-base laptop:text-sm big-tablet:text-xs">
                  <li>SĐT: 0123456789</li>
                  <li>Tuyển dụng</li>
                  <li>Khuyến mãi</li>
                  <li>Chính sách</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="relative p-4">
          <NavLink to="/cart">
            {user?.cart.count > 0 && (
              <span
                className="
              bg-[#51C4D3] px-3 py-1 rounded-full absolute z-10 top-0 left-8"
              >
                {user.cart.count}
              </span>
            )}
            <i className="fas fa-shopping-cart text-3xl" />
            <span className="text-white ml-2 desktop:text-lg laptop:text-base big-tablet:text-base laptop:inline big-tablet:hidden">Giỏ hàng</span>
          </NavLink>
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
