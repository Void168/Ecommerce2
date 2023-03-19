import React, { useRef, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppContext } from "../context/AppContext";
import { logout, resetNotifications } from "../features/userSlice.js";
import categories from "../categories.js";
import axios from "../axios";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

function NavigationResponsive() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext);
  const inputRef = useRef(null);
  const [bellPos, setBellPos] = useState({});
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Active link navbar
  const activeLink =
    "bg-[#51C4D3] text-black big-tablet:px-2 tablet:p-4 shadow-sm";
  const normalLink = "py-12 px-4 ease-in-out duration-200";

  const bellRef = useRef(null);

  // Handle open 4 kind of menus
  // menu categories
  const handleOpen = () => setOpen(true);

  // menu account
  const handleOpenAccount = () => {
    if (!openAccount) {
      setOpenAccount(true);
    } else {
      setOpenAccount(false);
    }
  };

  // menu more
  const handleOpenMore = () => {
    if (!openMore) {
      setOpenMore(true);
    } else {
      setOpenMore(false);
    }
  };

  // menu notification
  const handleOpenNoti = () => {
    if (!openNoti) {
      setOpenNoti(true);
    } else {
      setOpenNoti(false);
    }
  };

  // Handle close menu
  const handleClose = () => {
    setOpen(false);
    setOpenAccount(false);
    setOpenMore(false);
    setValue(0);
  };

  // Get value of search field when keydown
  const pressKey = (e) => {
    e.preventDefault();
    document.addEventListener("keydown", navigateSearch, true);
  };

  // Nativate to search page when press Enter key
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

  // Nativate to search page when click Search button
  const clickSearch = () => {
    if (inputRef.current.value !== null) {
      setOpen(false);
      navigate(`/search/${inputRef.current.value}`);
    } else {
      navigate("/");
    }
  };

  // Nativate to home page and close all menu
  const homeClick = () => {
    setOpenAccount(false);
    setOpenMore(false);
    navigate("/");
  };

  // Sign out
  const signoutHandler = () => {
    navigate("/login");
    dispatch(logout());
  };

  // Unread notifications
  const unreadNotifications = user?.notifications?.reduce(
    (account, current) => {
      if (current.status === "chưa đọc") return account;
      return account;
    },
    0
  );

  // Display count of unread notifications
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

  return (
    <>
      <Box className="fixed overscroll-x-auto shadow-sm small-phone:w-full z-50 galaxy-fold:block big-tablet:hidden bottom-0 ">
        {/* Bottom Navigation */}
        <BottomNavigation
          showLabels
          value={value}
          className="w-full galaxy-fold:py-8"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Trang chủ"
            icon={<HomeIcon />}
            onClick={homeClick}
          />
          <BottomNavigationAction
            label="Danh mục"
            icon={<CategoryIcon />}
            onClick={handleOpen}
          />
          {user ? (
            <BottomNavigationAction
              label="Tài khoản"
              icon={<AccountCircleIcon />}
              onClick={handleOpenAccount}
            />
          ) : (
            <BottomNavigationAction
              label="Đăng nhập"
              icon={<AccountCircleIcon />}
              onClick={() => navigate("/login")}
            />
          )}

          {user ? (
            <BottomNavigationAction
              label="Thông báo"
              icon={<NotificationsActiveIcon />}
              onClick={handleOpenNoti}
            />
          ) : null}

          <BottomNavigationAction
            label="Xem thêm"
            icon={<MoreHorizIcon />}
            onClick={handleOpenMore}
          />
        </BottomNavigation>

        {user ? (
          <span className="bg-red-400 px-2 rounded-full w-6 h-6 absolute inset-x-3/4 bottom-8 text-sm z-50">
            {unreadNotifications}
          </span>
        ) : null}
      </Box>

      {/* Categories */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="duration-300"
      >
        <Box className=" container mx-auto w-full rounded-lg tablet:mt-16 small-phone:mt-24">
          <div className="desktop:w-6/12 big-tablet:w-5/12 relative">
            <input
              className="p-1 rounded w-full"
              placeholder="Tìm kiếm"
              onChange={pressKey}
              ref={inputRef}
            ></input>
            <span onClick={clickSearch}>
              <i className="fa-solid fa-magnifying-glass absolute right-1 top-4 cursor-pointer border-l-2 pl-1"></i>
            </span>
          </div>
          <Typography id="modal-modal-description">
            <div className="grid tablet:grid-cols-4 big-phone:grid-cols-2 p-2 small-phone:grid-cols-3 bg-[#132C33] mt-3 border-none rounded-xl z-50 shadow-sm text-white galaxy-fold:max-h-max ">
              {categories.map((category) => (
                <div key={category._id} onClick={handleClose}>
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
                    <div className="big-phone:p-4 galaxy-fold:p-2 flex flex-col justify-center">
                      <div className="text-center">
                        <img
                          src={category.img}
                          alt="category"
                          className="big-phone:w-24 big-phone:h-24 galaxy-fold:h-16 galaxy-fold:w-16 rounded-lg shadow-sm tablet:mx-4 big-phone:mx-16 small-phone:mx-3"
                        />
                      </div>
                      <div className="my-4 text-center">
                        <h1 className="mt-1 galaxy-fold:text-xs">
                          {category.name}
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Typography>
        </Box>
      </Modal>

      {/* Account Menu */}
      <div
        className={
          openAccount
            ? "fixed w-full z-50 duration-300 transition-transform ease-in-out top-0"
            : "fixed w-full translate-x-full duration-300 top-0"
        }
      >
        {/* User is admin */}
        {user?.isAdmin ? (
          <ul className="p-4 flex flex-col justify-around h-screen absolute z-50 w-full bg-[#132C33] text-white">
            <div className="mb-4">
              <DoubleArrowIcon
                onClick={handleOpenAccount}
                className="text-white"
              />
            </div>
            <ul className="w-full flex flex-col container mx-auto text-white overflow-y-auto">
              <li onClick={handleClose}>
                <Avatar
                  alt={`${user.name}`}
                  src={`${user?.avatar?.at(-1)?.url}`}
                  className="mx-8"
                />
                <span>
                  <>
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
                      <div className="dropdown__profile relative px-8 py-12 text-2xl">
                        <Link to={`/profile/${user._id}/edit`}>
                          {user.name} <i className="fa-solid fa-caret-down" />
                        </Link>
                      </div>
                    )}
                  </>
                </span>
              </li>
              <li className="my-1 px-4 py-12 text-2xl" onClick={handleClose}>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Lịch sử mua hàng
                </NavLink>
              </li>
              <li className="my-1 px-4 py-12 text-2xl" onClick={handleClose}>
                <NavLink
                  to={`/dashboard}`}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Quản lý
                </NavLink>
              </li>
              <li className="my-1 px-4 py-12 text-2xl" onClick={handleClose}>
                <NavLink
                  to="/chart"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Thống kê
                </NavLink>
              </li>
            </ul>
            <div>
              <li className="text-center flex-end mb-20" onClick={handleClose}>
                <button
                  onClick={signoutHandler}
                  className="bg-[#132C33] text-xl button"
                >
                  Đăng xuất
                </button>
              </li>
            </div>
          </ul>
        ) : (
          // User is not admin
          <ul className="flex flex-col text-black absolute z-50">
            <li onClick={handleToggleNotifications} className="relative">
              <span className="bg-red-400 px-2 rounded-full w-6 h-6 absolute left-2 top-1 text-sm">
                {unreadNotifications}
              </span>
              <i
                className="fas fa-bell mt-5"
                ref={bellRef}
                data-count={unreadNotifications || null}
              ></i>
            </li>
            <li onClick={handleClose}>
              <Link to="/orders">Lịch sử mua hàng</Link>
            </li>

            <li className="justify-self-end" onClick={handleClose}>
              <button onClick={signoutHandler} className="button">
                Đăng xuất
              </button>
            </li>
          </ul>
        )}
      </div>

      {/* Menu more */}
      <div
        className={
          openMore
            ? "fixed w-full z-50 duration-300 transition-transform ease-in-out top-0"
            : "fixed w-full translate-x-full duration-300 top-0"
        }
      >
        <ul className="bg-[#132C33] p-4 flex flex-col h-screen">
          <div className="mb-4">
            <DoubleArrowIcon onClick={handleOpenMore} className="text-white" />
          </div>

          <ul className="w-full flex flex-col container mx-auto text-white overflow-y-auto">
            <li className=" flex flex-col text-2xl">
              <NavLink
                onClick={handleOpenMore}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/about"
              >
                Về chúng tôi
              </NavLink>
              <NavLink
                onClick={handleOpenMore}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/promo"
              >
                Khuyến mãi
              </NavLink>
              <NavLink
                onClick={handleOpenMore}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/payment"
              >
                Thanh toán
              </NavLink>
              <NavLink
                onClick={handleOpenMore}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/shipping"
              >
                Vận chuyển
              </NavLink>
            </li>
            <li className="px-4 py-12 text-2xl">Tuyển dụng</li>
            <li className="px-4 py-12 text-2xl">Khuyến mãi</li>
            <li className="px-4 py-12 text-2xl">Chính sách</li>
          </ul>
        </ul>
      </div>

      {/* Menu notifications */}
      <div
        className={
          openNoti
            ? "fixed w-full p-4 z-50 duration-300 transition-transform ease-in-out h-screen bg-[#132C33] top-0 overflow-y-auto"
            : "fixed w-full p-4 translate-x-full duration-300 scroll-auto h-screen top-0"
        }
      >
        <div className="mb-4">
          <DoubleArrowIcon onClick={handleOpenNoti} className="text-white" />
        </div>
        {user ? (
          <>
            {user?.notifications?.length > 0 ? (
              user?.notifications?.map((notification, id) => (
                <div
                  key={user?.notifications?.id}
                  className="border-b border-[#D8E3E7] p-2 text-white h-24 tablet:text-xl galaxy-fold:text-base"
                >
                  {/* <p
                className={`notification-${notification.status}`}
                key={notification._id}
              ></p> */}
                  {notification.message} vào lúc{" "}
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
                </div>
              ))
            ) : (
              <span className="text-white text-2xl">
                Không có thông báo mới
              </span>
            )}
          </>
        ) : null}
      </div>
    </>
  );
}

export default NavigationResponsive;
