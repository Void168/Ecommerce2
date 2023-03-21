import React, { useState, useContext, useRef } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, resetNotifications } from "../features/userSlice.js";
import categories from "../categories.js";
import axios from "../axios";
import { Avatar } from "@mui/material";

function Navigation() {
  const [navbar, setNavbar] = useState(false);
  const [visible, setVisible] = useState(5);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bellRef = useRef(null);
  const [bellPos, setBellPos] = useState({});
  const [display, setDisplay] = useState(false);
  const { user, setLoading } = useContext(AppContext);

  const showMoreNotifications = () => {
    setVisible((prevValue) => prevValue + 5);
  };

  // Sign out
  const signoutHandler = () => {
    navigate("/login");
    dispatch(logout());
    localStorage.removeItem("viewed products");
  };

  // Unread notifications
  const unreadNotifications = user?.notifications?.filter(
    (noti) => noti.status === "chưa đọc"
  ).length;

  // Active link navbar
  const activeLink =
    "relative before:content-[''] before:absolute before:w-full before:h-1 before:bottom-1 before:left-0 before:rounded before:bg-[#51C4D3] text-[#51C4D3] desktop:p-4 big-tablet:px-2 big-tablet:py-4 desktop:text-lg big-tablet:text-base";
  const normalLink =
    "navlink hover:text-[#51C4D3] duration-300 p-4 text-white desktop:text-lg big-tablet:text-base";

  // Display count of unread notifications
  const handleToggleNotifications = () => {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    if (display) setDisplay(false);
    else setDisplay(true);

    dispatch(resetNotifications());
    if (user && unreadNotifications > 0)
      axios.post(`/users/${user._id}/updateNotifications`);
  };

  // Fixed navbar when scroll to Y=200
  const setFixed = () => {
    if (window.scrollY >= 200) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", setFixed);

  // Get value of search field when keydown
  const pressKey = (e) => {
    e.preventDefault();
    document.addEventListener("keydown", navigateSearch, true);
  };

  // Nativate to search page when press Enter key
  const navigateSearch = (e) => {
    if (e.key === "Enter" && inputRef.current.value !== null) {
      navigate(
        `/tim-kiem/${inputRef.current.value
          .toLocaleLowerCase()
          .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
          .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
          .replace(/ì|í|ị|ỉ|ĩ/g, "i")
          .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
          .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
          .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
          .replace(/đ/g, "d")
          .replace(/\s/g, "-")}`
      );
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    if (e.key === "Enter" && inputRef.current.value === null) navigate("/");
  };

  // Nativate to search page when click Search button
  const clickSearch = () => {
    if (inputRef.current.value !== null) {
      navigate(
        `/tim-kiem/${inputRef.current.value
          .toLocaleLowerCase()
          .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
          .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
          .replace(/ì|í|ị|ỉ|ĩ/g, "i")
          .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
          .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
          .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
          .replace(/đ/g, "d")
          .replace(/\s/g, "-")}`
      );
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className={
        navbar
          ? "fixed bg-[#132C33] shadow-sm top-0 w-full z-50 opacity-95 galaxy-fold:hidden big-tablet:block"
          : "w-full sticky z-50 galaxy-fold:hidden big-tablet:block"
      }
    >
      <ul className="justify-around bg-[#132C33] p-4 flex">
        {/* Logo */}
        <div className="laptop:w-1/12 galaxy-fold:w-0">
          <Link className="h-10" to="/">
            <img src="../images/sfsff.png" alt="logo" />
          </Link>
        </div>

        {/* Menu navbar */}
        <div className="flex justify-evenly big-desktop:w-8/12 laptop:w-9/12 big-tablet:w-full">
          <ul className="w-full">
            <li className="text-white flex justify-between text-xl">
              {/* Categories */}
              <div className="mt-3 dropdown__categories">
                <NavLink className="hover:text-[#51C4D3] p-4 mb-2 navlink ease-in-out duration-300 desktop:text-lg big-tablet:text-base">
                  Danh mục
                </NavLink>
                <div className="grid absolute text-black bg-[#D8E3E7] mt-3 border-none rounded-b-3xl grid-cols-4 rounded-r-2xl z-50 shadow-sm ease-in-out duration-200">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <Link
                        to={`/danh-muc/${category.name
                          .toLocaleLowerCase()
                          .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
                          .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                          .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                          .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
                          .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                          .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                          .replace(/đ/g, "d")
                          .replace(/\s/g, "-")}`}
                        className="dropdown__categories--element"
                      >
                        <div className="mt-2 p-6 text-center">
                          <img
                            src={category.img}
                            alt="category"
                            className="w-32 h-32 rounded-lg shadow-sm ml-2 hover:shadow-[#126E82] hover:shadow-2xl ease-in-out duration-200"
                          />
                          <p className="mt-1">{category.name}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* About */}
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/about"
              >
                Về chúng tôi
              </NavLink>

              {/* Promo */}
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/promo"
              >
                Khuyến mãi
              </NavLink>

              {/* Payment information */}
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/payment"
              >
                Thanh toán
              </NavLink>

              {/* Shipping Information */}
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/shipping"
              >
                Vận chuyển
              </NavLink>

              {/* Notification */}
              {user ? (
                <NavLink className="relative">
                  <span
                    className="bg-red-400 px-2 rounded-full w-6 h-6 absolute left-1 top-2 text-sm"
                    onClick={handleToggleNotifications}
                  >
                    {unreadNotifications}
                  </span>
                  <i
                    className="fas fa-bell mt-5 text-sm"
                    ref={bellRef}
                    data-count={unreadNotifications || null}
                  ></i>

                  {/* List of notifications */}
                  {user ? (
                    <div
                      className={
                        !display
                          ? "hidden"
                          : "container mx-auto absolute text-sm w-72 bg-[#D8E3E7] z-50 p-2 mt-2 text-black rounded-lg shadow-sm overflow-auto h-48"
                      }
                    >
                      {user ? <></> : null}
                      {user?.notifications?.length > 0 ? (
                        user?.notifications
                          .slice(
                            user?.notifications?.length - visible > 0
                              ? user?.notifications?.length - visible
                              : 0,
                            user?.notifications?.length
                          )
                          ?.map((notification, id) => (
                            <div
                              className="border-[#132C33] border-b"
                              key={user?.notifications?.id}
                            >
                              <p>{notification.message}</p>
                              <div className="py-2 flex flex-row justify-around text-xs items-center">
                                <div
                                  className="px-4 py-1 bg-red-500 text-white rounded-full"
                                  key={user._id}
                                >
                                  {notification.status}
                                </div>
                                <p>
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
                            </div>
                          ))
                      ) : (
                        <span>Không có thông báo mới</span>
                      )}
                      <div className="flex justify-center">
                        {user?.notifications?.length - visible < 0 ? null : (
                          <button onClick={showMoreNotifications}>
                            Xem thêm
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null}
                </NavLink>
              ) : null}

              {/* No Login yet */}
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
                // Logged in
                <div
                  className={
                    user
                      ? "dropdown__profile relative"
                      : "mt-4 dropdown__profile relative"
                  }
                >
                  <NavLink className="hover:text-[#51C4D3] p-2 navlink profile w-full flex flex-row justify-center items-center ease-in-out duration-200 hover:rounded-b-none desktop:text-lg  big-tablet:text-base">
                    {/* Avatar and user's name */}
                    <Avatar
                      alt={`${user.name}`}
                      src={`${user?.avatar?.at(-1)?.url}`}
                    />
                    &nbsp;
                    {user.name}&nbsp; <i className="fa-solid fa-caret-down" />
                  </NavLink>

                  {/* When user is admin */}
                  {user?.isAdmin ? (
                    <ul className="flex flex-col text-black absolute z-10 w-48 ease-in-out duration-200">
                      <div className="bg-[#D8E3E7] rounded-b-3xl shadow-sm text-base text-center">
                        {/* Navigate to profile page */}
                        <li className="my-1 hover:bg-[#126E82] hover:text-white ease-in-out duration-200 py-2">
                          <Link to={`/profile/${user._id}/edit`}>
                            Thông tin tài khoản
                          </Link>
                        </li>
                        {/* Navigate to orders page */}
                        <li className="my-1 hover:bg-[#126E82] hover:text-white ease-in-out duration-200 py-2">
                          <Link to="/orders">Lịch sử mua hàng</Link>
                        </li>

                        {/* Navigate to dashboard page */}
                        <li className="my-1 hover:bg-[#126E82] hover:text-white ease-in-out duration-200 py-2">
                          <Link to="/dashboard">Quản lý</Link>
                        </li>

                        {/* Navigate to chart page */}
                        <li className="my-1 hover:bg-[#126E82] hover:text-white ease-in-out duration-200 py-2">
                          <Link to="/chart">Thống kê</Link>
                        </li>

                        {/*Sign out and navigate to login page */}
                        <li
                          className="cursor-pointer hover:bg-[#126E82] hover:text-white ease-in-out duration-200 hover:rounded-b-2xl py-2"
                          onClick={signoutHandler}
                        >
                          Đăng xuất
                        </li>
                      </div>
                    </ul>
                  ) : (
                    // User is not an admin
                    <ul className="flex flex-col text-black absolute z-10 w-48 ease-in-out duration-200">
                      <div className="bg-[#D8E3E7] rounded-b-3xl shadow-sm text-base text-center">
                        <li className="my-1 hover:bg-[#126E82] hover:text-white ease-in-out duration-200 py-2">
                          <Link to={`/profile/${user._id}/edit`}>
                            Thông tin tài khoản
                          </Link>
                        </li>
                        <li className="my-1 hover:bg-[#126E82] hover:text-white ease-in-out duration-200 py-2">
                          <Link to="/orders">Lịch sử mua hàng</Link>
                        </li>
                        <li
                          className="cursor-pointer hover:bg-[#126E82] hover:text-white ease-in-out duration-200 hover:rounded-b-2xl py-2"
                          onClick={signoutHandler}
                        >
                          Đăng xuất
                        </li>
                      </div>
                    </ul>
                  )}
                </div>
              )}
            </li>

            <li className="items-center flex flex-row">
              {/* Search field */}
              <div className="desktop:w-6/12 big-tablet:w-5/12 relative">
                <input
                  className="mt-2 mx-2 p-1 rounded w-full"
                  placeholder="Tìm kiếm"
                  onChange={pressKey}
                  ref={inputRef}
                ></input>
                <span onClick={clickSearch}>
                  <i className="fa-solid fa-magnifying-glass absolute right-1 top-4 cursor-pointer border-l-2 pl-2"></i>
                </span>
              </div>

              {/* Others Information */}
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

        {/* Cart button when using large devices */}
        <div className="relative p-2 small-phone:hidden laptop:block">
          <NavLink to="/cart">
            {/* Cart count */}
            {user?.cart?.count > 0 && (
              <span
                className="
              bg-[#D8E3E7] px-3 py-1 rounded-full absolute z-10 top-0 left-6"
              >
                {user?.cart?.count}
              </span>
            )}
            <i className="fas fa-shopping-cart laptop:text-3xl big-tablet:text-base text-[#d35164]" />
            <span className="navlink hover:text-[#51C4D3] p-2 duration-300 ease-in-out text-white ml-2 desktop:text-lg laptop:text-base big-tablet:text-base laptop:inline big-tablet:hidden">
              Giỏ hàng
            </span>
          </NavLink>
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
