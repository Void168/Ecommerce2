import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { useSignupMutation } from '../services/appApi'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailReset, setEmailReset] = useState('')
  const [password, setPassword] = useState('')
  const [comfirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(false)

  const [signUp, { error, isLoading, isError }] = useSignupMutation()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [])
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== comfirmPassword) {
      alert('Mật khẩu xác nhận không đúng!')
    } else {
      signUp({ name, email, password })
      navigate('/')
    }
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
    <div className="container mx-auto">
      <div className="flex flex-row w-full justify-center">
        {error && <Loading />}
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="w-3/12 px-2 py-4">
              <form
                onSubmit={submitHandler}
                className="bg-[#51C4D3] p-4 rounded-xl h-full"
              >
                <div className="text-5xl text-center mb-8">Đăng ký</div>
                <div>
                  <label htmlFor="name">Tên</label>
                  <br />
                  <input
                    className="w-full"
                    type="name"
                    id="name"
                    name="name"
                    placeholder="Nhập họ tên"
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></input>
                </div>
                <div></div>
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
                      type={showPassword === true ? "password" : "text"}
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
                            ? "fas fa-eye-slash eye-1 absolute right-1 bottom-3"
                            : "fas fa-eye eye-1 absolute right-1 bottom-3"
                        }
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="relative form__element">
                  <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                  <br />
                  <div className="flex flex-row">
                    <input
                      className="w-full"
                      type={showPassword === true ? "password" : "text"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Nhập lại mật khẩu"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      required
                    ></input>
                    <span onClick={ShowHidePassword}>
                      <i
                        className={
                          showPassword
                            ? "fas fa-eye-slash eye-1 absolute right-1 bottom-3"
                            : "fas fa-eye eye-1 absolute right-1 bottom-3"
                        }
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="form__element">
                  <button type="submit" className="w-full bg-[#132C33]">
                    Xác Nhận
                  </button>
                </div>
                <div>
                  <div className="form__element">
                    Đã có tài khoản? {""}
                    <Link to="/login">Đăng nhập</Link>
                  </div>
                  <div className="form__element pointer">
                    <h4 onClick={openPopup}>Quên mật khẩu? {""} </h4>
                  </div>
                </div>
              </form>
            </div>
            <div className="px-2 py-4">
              <img
                className="rounded-xl h-full"
                src="https://www.hepper.com/wp-content/uploads/2021/08/golden-british-shorthair-cat-lying-on-a-blue-sofa_SunRay-BRI-Cattery-RU_Shutterstock.webp"
                alt="banner"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup
