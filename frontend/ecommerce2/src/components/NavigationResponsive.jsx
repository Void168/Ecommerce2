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

  const pressKey = (e) => {
    e.preventDefault();
    document.addEventListener("keydown", navigateSearch, true);
  };

  const navigateSearch = (e) => {
    if (e.key === "Enter" && inputRef.current.value !== null) {
      navigate(`/search/${inputRef.current.value}`);
    }
    if (e.key === "Enter" && inputRef.current.value === null) navigate("/");
  };

  const clickSearch = () => {
    if (inputRef.current.value !== null) {
      setOpen(false);
      navigate(`/search/${inputRef.current.value}`);
    } else {
      navigate("/");
    }
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
      if (current.status === "ch??a ?????c") return account;
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
      <Box className="fixed overscroll-x-auto shadow-sm small-phone:w-full z-50 galaxy-fold:block big-tablet:hidden bottom-0 ">
        <BottomNavigation
          showLabels
          value={value}
          className="w-full galaxy-fold:py-8"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Trang ch???"
            icon={<HomeIcon />}
            onClick={homeClick}
          />
          <BottomNavigationAction
            label="Danh m???c"
            icon={<CategoryIcon />}
            onClick={handleOpen}
          />
          {user ? (
            <BottomNavigationAction
              label="T??i kho???n"
              icon={<AccountCircleIcon />}
              onClick={handleOpenAccount}
            />
          ) : (
            <BottomNavigationAction
              label="????ng nh???p"
              icon={<AccountCircleIcon />}
              onClick={() => navigate("/login")}
            />
          )}

          {user ? (
            <BottomNavigationAction
              label="Th??ng b??o"
              icon={<NotificationsActiveIcon />}
              onClick={handleOpenNoti}
            />
          ) : null}

          <BottomNavigationAction
            label="Xem th??m"
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
              placeholder="T??m ki???m"
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
                      .replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a")
                      .replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e")
                      .replace(/??|??|???|???|??/g, "i")
                      .replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o")
                      .replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u")
                      .replace(/???|??|???|???|???/g, "y")
                      .replace(/??/g, "d")
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
      <div
        className={
          openAccount
            ? "fixed w-full z-50 duration-300 transition-transform ease-in-out top-0"
            : "fixed w-full translate-x-full duration-300 top-0"
        }
      >
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
                        ????ng nh???p
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
                  L???ch s??? mua h??ng
                </NavLink>
              </li>
              <li className="my-1 px-4 py-12 text-2xl" onClick={handleClose}>
                <NavLink
                  to={`/dashboard}`}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Qu???n l??
                </NavLink>
              </li>
              <li className="my-1 px-4 py-12 text-2xl" onClick={handleClose}>
                <NavLink
                  to="/chart"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Th???ng k??
                </NavLink>
              </li>
            </ul>
            <div>
              <li className="text-center flex-end mb-20" onClick={handleClose}>
                <button
                  onClick={signoutHandler}
                  className="bg-[#132C33] text-xl button"
                >
                  ????ng xu???t
                </button>
              </li>
            </div>
          </ul>
        ) : (
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
              <Link to="/orders">L???ch s??? mua h??ng</Link>
            </li>

            <li className="justify-self-end" onClick={handleClose}>
              <button onClick={signoutHandler} className="button">
                ????ng xu???t
              </button>
            </li>
          </ul>
        )}
      </div>
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
                V??? ch??ng t??i
              </NavLink>
              <NavLink
                onClick={handleOpenMore}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/promo"
              >
                Khuy???n m??i
              </NavLink>
              <NavLink
                onClick={handleOpenMore}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/payment"
              >
                Thanh to??n
              </NavLink>
              <NavLink
                onClick={handleOpenMore}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                to="/shipping"
              >
                V???n chuy???n
              </NavLink>
            </li>
            <li className="px-4 py-12 text-2xl">Tuy???n d???ng</li>
            <li className="px-4 py-12 text-2xl">Khuy???n m??i</li>
            <li className="px-4 py-12 text-2xl">Ch??nh s??ch</li>
          </ul>
        </ul>
      </div>
      {/* notifications */}
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
              user?.notifications?.map((notification) => (
                <div className="border-b border-[#D8E3E7] p-2 text-white h-24 tablet:text-xl galaxy-fold:text-base">
                  {/* <p
                className={`notification-${notification.status}`}
                key={notification._id}
              ></p> */}
                  {notification.message} v??o l??c{" "}
                  {notification.time.split("T")[1].slice(0, 8) +
                    " " +
                    "ng??y" +
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
                Kh??ng c?? th??ng b??o m???i
              </span>
            )}
          </>
        ) : null}
      </div>
    </>
  );
}

export default NavigationResponsive;
