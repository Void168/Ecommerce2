import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../features/userSlice.js'
import categories from '../categories.js'

function Navigation() {
  const [navbar, setNavbar] = useState(false)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const signoutHandler = () => {
    document.location.href = '/login'
    dispatch(logout())
  }

  const setFixed = () => {
    if (window.scrollY >= 200) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  window.addEventListener('scroll', setFixed)
  return (
    <div className={navbar ? 'navbar active w-full' : 'navbar w-full'}>
      <Row>
        <ul className="justify-around bg-[#126E82] p-4 flex">
          <Col className="w-2/12">
            <Link className="h-10" to="/">
              Brand
            </Link>
          </Col>
          <Col className="flex justify-evenly w-8/12">
            <ul className="w-full">
              <li className="text-white flex justify-between text-xl">
                <div className="mt-4 dropdown__categories">
                  <NavLink className="p-4 hover:bg-[#132C33] rounded-full hover:shadow-sm hover:rounded-b-sm hover:rounded-t-3xl">
                    Danh mục
                  </NavLink>
                  <div className="grid absolute bg-[#132C33] mt-3 border-none rounded-b-3xl grid-cols-4 rounded-r-2xl z-50 shadow-sm">
                    {categories.map((category, product_id) => (
                      <div key={product_id}>
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

                <NavLink className="nav-link">Về chúng tôi</NavLink>
                <NavLink className="nav-link">Kết nối</NavLink>
                <NavLink className="nav-link">Thanh toán</NavLink>
                <NavLink className="nav-link">Vận chuyển</NavLink>
                {!user ? (
                  <NavLink className="nav-link" to="/login">
                    Đăng nhập
                  </NavLink>
                ) : (
                  <div className="mt-4 dropdown__profile relative">
                    <NavLink
                      className="nav-link hover:bg-[#51C4D3] hover:rounded-b-sm hover:rounded-t-3xl w-full text-white"
                      to="/"
                    >
                      {user.name}{' '}
                      {/* <FontAwesomeIcon icon="fa-solid fa-caret-down" /> */}
                    </NavLink>
                    <ul className="flex flex-col text-black absolute z-10">
                      <div className="bg-[#51C4D3] rounded-b-3xl p-2">
                        <li>
                          <Link>Sản phẩm</Link>
                        </li>
                        <li>
                          <Link>Người dùng</Link>
                        </li>
                        <li>
                          <Link>Báo cáo</Link>
                        </li>
                        <li>
                          <Button onClick={signoutHandler}>Đăng xuất</Button>
                        </li>
                      </div>
                    </ul>
                  </div>
                )}
              </li>
              <li className="items-center flex flex-row">
                <Col className="w-6/12">
                  <input className="mt-2 mx-2 p-1 rounded w-full"></input>
                </Col>

                <Col className="w-6/12 pl-8">
                  <ul className="flex flex-row justify-around text-white">
                    <li>SĐT: 0123456789</li>
                    <li>Tuyển dụng</li>
                    <li>Khuyến mãi</li>
                    <li>Chính sách</li>
                  </ul>
                </Col>
              </li>
            </ul>
          </Col>
          <Col className="relative p-4">
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
          </Col>
        </ul>
      </Row>
    </div>
  )
}

export default Navigation
