import React from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Signup from './Signup'

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
      <Row className="flex flex-row w-full justify-center">
        <Col className="w-3/12 px-2 py-4">
          <form
            onSubmit={submitHandler}
            className="bg-[#51C4D3] p-4 rounded-xl h-full"
          >
            <div className="text-5xl text-center mb-8">Đăng nhập</div>
            <div className="form__element">
              <label htmlFor="email">Email</label>
              <br />
              <input
                className="w-full"
                type="email"
                id="email"
                name="email"
                placeholder="Nhập email"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
            </div>
            <div className="relative form__element">
              <label htmlFor="password">Mật khẩu</label>
              <br />
              <div className="flex flex-row">
                <input
                  className="w-full"
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
            <div className="form__element">
              <label />
              <button type="submit" className="w-full bg-[#132C33]">
                Xác Nhận
              </button>
            </div>
            <div className="mt-10">
              <div className="form__element">
                Chưa có tài khoản? {''}
                <Link to="/register">Đăng ký</Link>
              </div>
              <div className="form__element pointer">
                <h4 onClick={openPopup}>Quên mật khẩu? {''} </h4>
              </div>
            </div>
          </form>
        </Col>
        <Col className="px-2 py-4">
          <img
            className="rounded-xl h-full"
            src="https://www.hepper.com/wp-content/uploads/2021/08/golden-british-shorthair-cat-lying-on-a-blue-sofa_SunRay-BRI-Cattery-RU_Shutterstock.webp"
            alt="banner"
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Login
