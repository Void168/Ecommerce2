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
            <Link className="h-10">Brand</Link>
          </Col>
          <Col className="flex justify-evenly w-8/12">
            <ul className="w-full">
              <li className="text-white flex justify-between  text-xl">
                <NavLink className="nav-link">Danh muc</NavLink>
                <NavLink className="nav-link">Ve chung toi</NavLink>
                <NavLink className="nav-link">Ket noi</NavLink>
                <NavLink className="nav-link">Thanh toan</NavLink>
                <NavLink className="nav-link">Van chuyen</NavLink>
                <NavLink className="nav-link">Dang nhap</NavLink>
              </li>
              <li className="items-center flex flex-row">
                <Col className="w-6/12">
                  <input className="mt-2 mx-2 p-1 rounded w-full"></input>
                </Col>

                <Col className="w-6/12 pl-8">
                  <ul className="flex flex-row justify-around">
                    <li>SDT: 0123456789</li>
                    <li>Tuyen dung</li>
                    <li>Khuyen mai</li>
                    <li>Chinh sach</li>
                  </ul>
                </Col>
              </li>
            </ul>
          </Col>
          <Col>
            <NavLink className="nav-link">Gio hang</NavLink>
          </Col>
        </ul>
      </Row>
    </Container>
  )
}

export default Navigation
