import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

function NavigationResponsive() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const user = useSelector((state) => state.user);
  const [bellPos, setBellPos] = useState({});
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeLink =
    "bg-[#51C4D3] text-black big-tablet:px-2 tablet:p-4 shadow-sm";
  const normalLink = "py-12 px-4 ease-in-out duration-200";

  const bellRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleOpenAccount = () => {
    if (!openAccount) {
      setOpenAccount(true);
    } else {
      setOpenAccount(false);
    }
  };

  const handleOpenMore = () => {
    if (!openMore) {
      setOpenMore(true);
    } else {
      setOpenMore(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAccount(false);
    setOpenMore(false);
    setValue(0);
  };

  const homeClick = () => {
    setOpenAccount(false);
    setOpenMore(false);
    navigate("/");
  };

  const handleOpenNoti = () => {
    if (!openNoti) {
      setOpenNoti(true);
    } else {
      setOpenNoti(false);
    }
  };

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
      <Box className="fixed shadow-sm small-phone:w-full z-50 galaxy-fold:block big-tablet:hidden bottom-0">
        <BottomNavigation
          showLabels
          value={value}
          className="w-full overscroll-x-auto galaxy-fold:py-8"
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
            <>
              <BottomNavigationAction
                label="Thông báo"
                icon={<NotificationsActiveIcon />}
                onClick={handleOpenNoti}
              />
              <span className="bg-red-400 px-2 rounded-full w-6 h-6 absolute right-1/4 bottom-8 text-sm z-10">
                {unreadNotifications}
              </span>
            </>
          ) : (
            null
          )}

          <BottomNavigationAction
            label="Xem thêm"
            icon={<MoreHorizIcon />}
            onClick={handleOpenMore}
          />
        </BottomNavigation>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="duration-300"
      >
        <Box className="duration-300 absolute bg-[#D8E3E7] w-full tablet:top-64 big-phone:top-20 tablet:inset-x-24 big-phone:left-1/4 galaxy-fold:inset-x-0 galaxy-fold:top-24 galaxy-fold:left-6 rounded-lg">
          <Typography id="modal-modal-description">
            <div className="grid tablet:grid-cols-4 big-phone:grid-cols-2 p-2 small-phone:grid-cols-3 absolute bg-[#132C33] mt-3 border-none rounded-xl z-50 shadow-sm text-white galaxy-fold:max-h-max ">
              {categories.map((category) => (
                <div key={category.id} onClick={handleClose}>
                  <Link
                    to={`/category/${category.name.toLocaleLowerCase()}`}
                    className="dropdown__categories--element"
                  >
                    <div className="mt-2 big-phone:p-4 galaxy-fold:p-2 text-center">
                      <img
                        src={category.img}
                        alt="category"
                        className="big-phone:w-24 big-phone:h-24 galaxy-fold:h-16 galaxy-fold:w-16 rounded-lg shadow-sm ml-2 "
                      />
                    </div>
                    <div className="text-center mb-4">
                      <h1 className="mt-1 galaxy-fold:text-xs">
                        {category.name}
                      </h1>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Typography>
        </Box>
      </Modal>
      <div
        className={
          openAccount
            ? "fixed w-full z-40 duration-300 transition-transform ease-in-out"
            : "fixed w-full translate-x-full duration-300"
        }
      >
        {user?.isAdmin ? (
          <ul className="flex flex-col justify-around p-2 h-screen absolute z-10 w-full bg-[#126E82] text-white">
            <div>
              <li>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  className="mx-8"
                />
              </li>
              <li>
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
                    <Link to="/">
                      {user.name} <i className="fa-solid fa-caret-down" />
                    </Link>
                  </div>
                )}
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
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Quản lý
                </NavLink>
              </li>
            </div>
            <div>
              <li className="text-center flex-end mb-20" onClick={handleClose}>
                <button
                  onClick={signoutHandler}
                  className="bg-[#132C33] text-xl"
                >
                  Đăng xuất
                </button>
              </li>
            </div>
          </ul>
        ) : (
          <ul className="flex flex-col text-black absolute z-10">
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
              <button onClick={signoutHandler}>Đăng xuất</button>
            </li>
          </ul>
        )}
      </div>
      <div
        className={
          openMore
            ? "fixed w-full z-40 duration-300 transition-transform ease-in-out"
            : "fixed w-full translate-x-full duration-300"
        }
      >
        <ul className="bg-[#126E82] p-4 flex">
          <ul className="w-full flex flex-col container mx-auto text-white h-screen overflow-y-auto">
            <li className=" flex flex-col text-2xl">
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
            </li>
            <li className="px-4 py-12 text-2xl">Tuyển dụng</li>
            <li className="px-4 py-12 text-2xl">Khuyến mãi</li>
            <li className="px-4 py-12 text-2xl">Chính sách</li>
          </ul>
        </ul>
      </div>
      {/* notifications */}
      <div
        className={
          openNoti
            ? "fixed w-full z-40 duration-300 transition-transform ease-in-out h-screen bg-[#126E82] scroll-auto"
            : "fixed w-full translate-x-full duration-300 scroll-auto h-screen"
        }
      >
        {user?.notifications.length > 0 ? (
          user?.notifications.map((notification) => (
            <div className="border-b border-[#D8E3E7] p-2 text-white h-24 tablet:text-xl galaxy-fold:text-base">
              <p
                className={`notification-${notification.status}`}
                key={notification.id}
              ></p>
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
          <span>Không có thông báo mới</span>
        )}
      </div>
    </>
  );
}

export default NavigationResponsive;