import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout, resetNotifications } from '../features/userSlice.js'
import categories from '../categories.js'
import axios from '../axios'

function Navigation() {
  const [navbar, setNavbar] = useState(false)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const bellRef = useRef(null)
  const [bellPos, setBellPos] = useState({})
  const [display, setDisplay] = useState(false)

  const signoutHandler = () => {
    navigate('/login')
    dispatch(logout())
  }

  const unreadNotifications = user?.notifications?.reduce(
    (account, current) => {
      if (current.status === 'chưa đọc') return account + 1
      return account
    },
    0,
  )

  const handleToggleNotifications = () => {
    const position = bellRef.current.getBoundingClientRect()
    setBellPos(position)
    if (display) {
      setDisplay(false)
    } else {
      setDisplay(true)
    }
    dispatch(resetNotifications())
    if (unreadNotifications > 0)
      axios.post(`/users/${user._id}/updateNotifications`)
  }

  const setFixed = () => {
    if (window.scrollY >= 200) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  window.addEventListener('scroll', setFixed)

  console.log(display)
  return (
    <div className={navbar ? 'navbar active w-full' : 'navbar w-full'}>
      <ul className="justify-around bg-[#126E82] p-4 flex">
        <div className="w-2/12">
          <Link className="h-10" to="/">
            Brand
          </Link>
        </div>
        <div className="flex justify-evenly w-8/12">
          <ul className="w-full">
            <li className="text-white flex justify-between text-xl">
              <div className="mt-4 dropdown__categories">
                <NavLink
                  to="/category/tất cả"
                  className="p-4 hover:bg-[#132C33] rounded-full hover:shadow-sm hover:rounded-b-sm hover:rounded-t-3xl"
                >
                  Danh mục
                </NavLink>
                <div className="grid absolute bg-[#132C33] mt-3 border-none rounded-b-3xl grid-cols-4 rounded-r-2xl z-50 shadow-sm">
                  {categories.map((category) => (
                    <div key={category._id}>
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

              <NavLink className="nav-link" to="/about">
                Về chúng tôi
              </NavLink>
              <NavLink className="nav-link" to="/promo">
                Khuyến mãi
              </NavLink>
              <NavLink className="nav-link" to="/payment">
                Thanh toán
              </NavLink>
              <NavLink className="nav-link" to="/shipping">
                Vận chuyển
              </NavLink>
              <NavLink onClick={handleToggleNotifications}>
                <i
                  className="fas fa-bell mt-5"
                  ref={bellRef}
                  data-count={unreadNotifications || null}
                ></i>
                {/* notifications */}
                <div
                  className={
                    !display
                      ? 'container mx-auto absolute text-sm w-72 bg-[#D8E3E7] z-50 p-2 mt-2 text-black rounded-lg shadow-sm hidden'
                      : 'container mx-auto absolute text-sm w-72 bg-[#D8E3E7] z-50 p-2 mt-2 text-black rounded-lg shadow-sm'
                  }
                >
                  {user?.notifications.length > 0
                    ? user?.notifications.map((notification) => (
                        <p
                          className={`notification-${notification.status}`}
                          key={notification._id}
                        >
                          {notification.message}
                          <br />
                          <span>
                            {notification.time.split('T')[0] +
                              ' ' +
                              notification.time.split('T')[1]}
                          </span>
                        </p>
                      ))
                    : // <span>Không có thông báo mới</span>
                      null}
                </div>
              </NavLink>
              {!user ? (
                <NavLink className="nav-link" to="/login">
                  Đăng nhập
                </NavLink>
              ) : (
                <div className="mt-4 dropdown__profile relative">
                  <NavLink
                    className="nav-link hover:bg-[#51C4D3] hover:rounded-b-sm hover:rounded-t-3xl w-full duration-0 text-white"
                    to="/"
                  >
                    {user.name}{' '}
                    {/* <FontAwesomeIcon icon="fa-solid fa-caret-down" /> */}
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
                          <Button onClick={signoutHandler}>Đăng xuất</Button>
                        </li>
                      </div>
                    </ul>
                  )}
                </div>
              )}
            </li>
            <li className="items-center flex flex-row">
              <div className="w-6/12">
                <input className="mt-2 mx-2 p-1 rounded w-full"></input>
              </div>

              <div className="w-6/12 pl-8">
                <ul className="flex flex-row justify-around text-white">
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
            <span className="text-white ml-2 text-xl">Giỏ hàng</span>
          </NavLink>
        </div>
      </ul>
    </div>
  )
}

export default Navigation
