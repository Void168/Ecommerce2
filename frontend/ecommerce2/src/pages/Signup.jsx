import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useSignupMutation } from "../services/appApi";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [comfirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [signup, { error, isLoading, isError }] = useSignupMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const ShowHidePassword = () => {
    if (!showPassword) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  const openPopup = () => {
    if (!showPopup) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    signup({ name, email, password });
    navigate("/");
    if (password !== comfirmPassword) {
      alert("Mật khẩu xác nhận không đúng!");
    } 
    if (error) {
      navigate("/register");
      setOpen(true);
    }
  };

  return (
    <div className="grid grid-cols-4 w-full justify-center big-tablet:container big-tablet:mx-auto big-tablet:my-4">
      {error && open && (
        <Alert
          onClose={handleClose}
          severity="error"
          className="fixed z-50 w-64 top-48 inset-x-1/4 opacity-100 delay-1000"
        >
          {error.data}
        </Alert>
      )}
      {loading ? (
        <div className="relative h-screen flex justify-center items-center text-center w-full col-span-4">
          <Loading />
        </div>
      ) : (
        <>
          <div className="big-tablet:w-full big-tablet:col-span-2 small-phone:col-span-4 tablet:w-6/12 big-phone:w-8/12 big-tablet:m-0 tablet:my-16 tablet:mx-20 big-phone:my-8 big-phone:mx-auto small-phone:mx-10 small-phone:my-10">
            <form
              onSubmit={submitHandler}
              className="big-tablet:bg-[#D8E3E7] small-phone:bg-gradient-to-b from-[#D8E3E7] to-[#126E82] p-4 h-full shadow-sm"
            >
              <div className="small-phone:text-3xl tablet:text-5xl text-center mb-8">
                Đăng ký
              </div>

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
              <div className="form__element text-center small-phone:m-0">
                <button type="submit" className="w-8/12 bg-[#132C33]">
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
          <div className="col-span-2">
            <img
              className="h-full rounded-none small-phone:hidden big-tablet:block shadow-sm"
              src="https://w0.peakpx.com/wallpaper/360/997/HD-wallpaper-techno-2-firefox-theme-technology-blue-lights-arrows.jpg"
              alt="banner"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Signup;
