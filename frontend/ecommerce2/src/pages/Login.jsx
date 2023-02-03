import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { useLoginMutation } from '../services/appApi'

function Login(props) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [emailReset, setEmailReset] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isError, isLoading, error }] = useLoginMutation()
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(true)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [])

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

  const checkUser = (e) => {
    e.preventDefault()
    if (email && password) {
      navigate(-1)
    }
    login({ email, password })
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-row w-full justify-center">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="w-3/12 px-2 py-4">
              <form
                onSubmit={submitHandler}
                className="bg-[#51C4D3] p-4 rounded-xl h-full"
              >
                <div className="text-5xl text-center mb-8">Đăng nhập</div>
                {isError && <h1>{error.data}</h1>}
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
                  <div className="flex flex-row relative">
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
                            ? 'fas fa-eye-slash eye-1 absolute right-1 top-4'
                            : 'fas fa-eye eye-1 absolute right-1 top-4'
                        }
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="form__element">
                  <button
                    type="submit"
                    className="w-full bg-[#132C33]"
                    onClick={checkUser}
                  >
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
  )
}

export default Login
