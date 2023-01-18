import React from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [emailReset, setEmailReset] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const submitHandler = (e) => {
    e.preventDefault()
  }

  const ShowHidePassword = () => {
    if (!showPassword) {
      setShowPassword(true)
    } else {
      setShowPassword(false)
    }
  }

  const openPopup = () => {
    if (!showPopup) {
      setShowPopup(true)
    } else {
      setShowPopup(false)
    }
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          <form onSubmit={submitHandler} className="bg-[#ECB365]">
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập email"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
            </div>
            <div style={{ position: 'relative' }}>
              <label htmlFor="password">Mật khẩu</label>
              <br />
              <div className="flex flex-row">
                <input
                  type={showPassword === true ? 'password' : 'text'}
                  id="password"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
                <span onClick={ShowHidePassword}>
                  <i
                    className={
                      showPassword
                        ? 'fas fa-eye-slash eye-1'
                        : 'fas fa-eye eye-1'
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div>
              <label />
              <button type="submit">Xác Nhận</button>
            </div>
            <div>
              Chưa có tài khoản? {''}
              <Link to="/register">Đăng ký</Link>
            </div>
            <div style={{ cursor: 'pointer' }}>
              <h4 onClick={openPopup}>Quên mật khẩu? {''} </h4>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
