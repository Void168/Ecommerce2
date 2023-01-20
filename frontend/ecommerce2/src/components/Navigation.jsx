import React from 'react'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navigation() {
  const user = useSelector((state) => state.user)

  const signoutHandler = () => {}
  return (
    <Container>
      <Row>
        <ul className="justify-around bg-[#126E82] p-4  flex">
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
                  <div className="mt-4">
                    <NavLink
                      className="nav-link hover:bg-[#51C4D3] hover:rounded-b-sm hover:rounded-t-3xl"
                      to="/"
                    >
                      {user.name}{' '}
                      <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                    </NavLink>
                    <ul className="flex flex-col absolute text-black bg-[#51C4D3] z-10 p-2 rounded-b-3xl">
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
                        <Link onClick={signoutHandler}>Đăng xuất</Link>
                      </li>
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
