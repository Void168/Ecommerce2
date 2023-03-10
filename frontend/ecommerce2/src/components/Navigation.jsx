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
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bellRef = useRef(null);
  const [bellPos, setBellPos] = useState({});
  const [display, setDisplay] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, setLoading } = useContext(AppContext);

  const signoutHandler = () => {
    navigate("/login");
    dispatch(logout());
    localStorage.removeItem("viewed products");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const unreadNotifications = user?.notifications.filter(
    (noti) => noti.status === "chưa đọc"
  ).length;

  const activeLink =
    "border-b-2 border-[#51C4D3] text-[#51C4D3] desktop:p-4 big-tablet:px-2 big-tablet:py-4 desktop:text-lg big-tablet:text-base";
  const normalLink =
    "p-4 hover:text-[#51C4D3] ease-in-out duration-200 desktop:text-lg big-tablet:text-base";

  const handleToggleNotifications = () => {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    if (display) setDisplay(false);
    else setDisplay(true);

    dispatch(resetNotifications());
    if (user && unreadNotifications > 0)
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

  const pressKey = (e) => {
    e.preventDefault();
    document.addEventListener("keydown", navigateSearch, true);
  };

  const navigateSearch = (e) => {
    if (e.key === "Enter" && inputRef.current.value !== null) {
      navigate(
        `/search/${inputRef.current.value
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

  const clickSearch = () => {
    if (inputRef.current.value !== null) {
      navigate(
        `/search/${inputRef.current.value
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
        <div className="laptop:w-1/12 galaxy-fold:w-0">
          <Link className="h-10" to="/">
            <img src="../images/sfsff.png" alt="logo" />
          </Link>
        </div>
        <div className="flex justify-evenly big-desktop:w-8/12 laptop:w-9/12 big-tablet:w-full">
          <ul className="w-full">
            <li className="text-white flex justify-between text-xl">
              <div className="mt-3 dropdown__categories">
                <NavLink className="p-4 mb-2 hover:bg-[#D8E3E7] hover:text-black rounded-3xl hover:shadow-sm ease-in-out duration-200 hover:rounded-b-none desktop:text-lg big-tablet:text-base">
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
                        onClick={handleClose}
                      >
                        <div className="mt-2 p-6 text-center">
                          <img
                            src={category.img}
                            alt="category"
                            className="w-32 h-32 rounded-lg shadow-sm ml-2 hover:shadow-blue-900 hover:shadow-2xl ease-in-out duration-200"
                          />
                          <p className="mt-1">{category.name}</p>
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
              {user ? (
                <NavLink
                  onClick={handleToggleNotifications}
                  className="relative"
                >
                  <span className="bg-red-400 px-2 rounded-full w-6 h-6 absolute left-1 top-2 text-sm">
                    {unreadNotifications}
                  </span>
                  <i
                    className="fas fa-bell mt-5 text-sm"
                    ref={bellRef}
                    data-count={unreadNotifications || null}
                  ></i>
                  {/* notifications */}
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
                        user?.notifications.map((notification) => (
                          <div className="border-[#132C33] border-b">
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
                    </div>
                  ) : null}
                </NavLink>
              ) : null}

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
                <div
                  className={
                    user
                      ? "dropdown__profile relative"
                      : "mt-4 dropdown__profile relative"
                  }
                >
                  <NavLink
                    className="profile w-full flex flex-row justify-center items-center p-2 hover:bg-[#D8E3E7] hover:text-black rounded-3xl hover:shadow-sm ease-in-out duration-200 hover:rounded-b-none desktop:text-lg  big-tablet:text-base"
                    to={`/profile/${user._id}/edit`}
                  >
                    <Avatar
                      alt={`${user.name}`}
                      src={`${user?.avatar?.at(-1)?.url}`}
                    />
                    &nbsp;
                    {user.name}&nbsp; <i className="fa-solid fa-caret-down" />
                  </NavLink>
                  {user?.isAdmin ? (
                    <ul className="flex flex-col text-black absolute z-10 w-48 ease-in-out duration-200">
                      <div className="bg-[#D8E3E7] rounded-b-3xl shadow-sm text-base text-center">
                        <li className="my-1 hover:bg-[#126E82] hover:text-white ease-in-out duration-200">
                          <Link to="/orders">Lịch sử mua hàng</Link>
                        </li>
                        <li className="my-1 hover:bg-[#126E82] hover:text-white ease-in-out duration-200">
                          <Link to="/dashboard">Quản lý</Link>
                        </li>
                        <li className="my-1 hover:bg-[#126E82] hover:text-white ease-in-out duration-200">
                          <Link to="/chart">Thống kê</Link>
                        </li>
                        <li
                          className="cursor-pointer hover:bg-[#126E82] hover:text-white hover:rounded-b-2xl"
                          onClick={signoutHandler}
                        >
                          Đăng xuất
                        </li>
                      </div>
                    </ul>
                  ) : (
                    <ul className="flex flex-col text-black absolute z-10 w-48">
                      <div className="bg-[#51C4D3] rounded-b-3xl p-2">
                        <li>
                          <Link to="/orders">Lịch sử mua hàng</Link>
                        </li>
                        <li>
                          <button onClick={signoutHandler} className="button">
                            Đăng xuất
                          </button>
                        </li>
                      </div>
                    </ul>
                  )}
                </div>
              )}
            </li>
            <li className="items-center flex flex-row">
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
            {user?.cart?.count > 0 && (
              <span
                className="
              bg-[#D8E3E7] px-3 py-1 rounded-full absolute z-10 top-0 left-8"
              >
                {user?.cart?.count}
              </span>
            )}
            <i className="fas fa-shopping-cart laptop:text-3xl big-tablet:text-base text-[#d35164]" />
            <span className="text-white ml-2 desktop:text-lg laptop:text-base big-tablet:text-base laptop:inline big-tablet:hidden">
              Giỏ hàng
            </span>
          </NavLink>
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
