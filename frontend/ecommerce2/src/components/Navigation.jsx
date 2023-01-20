import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../features/userSlice.js'

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
    <Container className={navbar ? 'navbar active w-full' : 'navbar w-full'}>
      <Row>
        <ul className="justify-around bg-[#126E82] p-4 flex">
          <Col className="w-2/12">
            <Link className="h-10" to="/">
              Brand
            </Link>
          </Col>
          <Col className="flex justify-evenly w-8/12">
            <ul className="w-full">
              <li className="text-white flex justify-between  text-xl">
                <NavLink className="nav-link">Danh mục</NavLink>
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
                  <ul className="flex flex-row justify-around">
                    <li>SĐT: 0123456789</li>
                    <li>Tuyển dụng</li>
                    <li>Khuyến mãi</li>
                    <li>Chính sách</li>
                  </ul>
                </Col>
              </li>
            </ul>
          </Col>
          <Col>
            <NavLink>Giỏ hàng</NavLink>
          </Col>
        </ul>
      </Row>
    </Container>
  )
}

export default Navigation
