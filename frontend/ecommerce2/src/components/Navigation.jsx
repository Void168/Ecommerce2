import React from 'react'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'

function Navigation() {
  return (
    <Container>
      <Row>
        <ul className="justify-around bg-[#064663] p-4  flex">
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
                <NavLink className="nav-link" to="/login">
                  Đăng nhập
                </NavLink>
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
            <NavLink className="nav-link">Giỏ hàng</NavLink>
          </Col>
        </ul>
      </Row>
    </Container>
  )
}

export default Navigation
