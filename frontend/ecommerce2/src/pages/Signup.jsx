import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useSignupMutation } from "../services/appApi";
import MuiAlert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

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
  const registerPassword = useRef(null);
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;

  const [signup, { error, isLoading, isError }] = useSignupMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  // Toggle show/hide password
  const ShowHidePassword = () => {
    if (!showPassword) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  // Open modal
  const openPopup = () => {
    if (!showPopup) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  // Close modal
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Handle submit
  const submitHandler = (e) => {
    e.preventDefault();
    signup({ name, email, password });
    if (password !== comfirmPassword) {
      alert("Mật khẩu xác nhận không đúng!");
    }
    if (error || registerPassword?.current?.value?.length < 8) {
      navigate("/register");
      setOpen(true);
    }
  };

  return (
    <div className="grid grid-cols-4 w-full justify-center big-tablet:container big-tablet:mx-auto big-tablet:my-4">
      {/* Alert when submit */}
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
          {/* Register form */}
          <div className="big-tablet:w-full big-tablet:col-span-2 small-phone:col-span-4 tablet:w-6/12 big-phone:w-8/12 big-tablet:m-0 tablet:my-16 tablet:mx-20 big-phone:my-8 big-phone:mx-auto small-phone:mx-10 small-phone:my-10">
            <form
              onSubmit={submitHandler}
              className="big-tablet:bg-[#D8E3E7] small-phone:bg-gradient-to-b from-[#D8E3E7] to-[#126E82] p-4 h-full shadow-sm"
            >
              <div className="small-phone:text-3xl tablet:text-5xl text-center mb-8">
                Đăng ký
              </div>

              {/* Register name */}
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

              {/* Register email */}
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

              {/* Register password */}
              <div className="relative form__element">
                <label htmlFor="password">Mật khẩu</label>
                <Tooltip
                  title="Mật khẩu phải có ít nhất 8 ký tự, ký tự đầu tiên viết hoa
                      và ít nhất 1 ký tự là số"
                  arrow
                >
                  <HelpOutlineIcon />
                </Tooltip>
                <br />
                <div className="flex flex-row">
                  <input
                    ref={registerPassword}
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

              {/* Register comfirm password */}
              <div className="relative form__element">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <Tooltip
                  title="Mật khẩu xác nhận phải giống với mật khẩu đăng ký"
                  arrow
                >
                  <HelpOutlineIcon />
                </Tooltip>
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

              <ul className="text-lg mb-8">
                {registerPassword?.current?.value?.match(lowerCaseLetters) ? (
                  <li className="text-lime-500">
                    <i class="fa-solid fa-check mr-10"></i>
                    <span>Có ký tự viết thường</span>
                  </li>
                ) : (
                  <li className="text-rose-400">
                    <i class="fa-solid fa-xmark mr-10"></i>
                    <span>Có ký tự viết thường</span>
                  </li>
                )}
                {registerPassword?.current?.value?.match(upperCaseLetters) ? (
                  <li className="text-lime-500">
                    <i class="fa-solid fa-check mr-10"></i>
                    <span>Có ký tự viết hoa</span>
                  </li>
                ) : (
                  <li className="text-rose-400">
                    <i class="fa-solid fa-xmark mr-10"></i>
                    <span>Có ký tự viết hoa</span>
                  </li>
                )}
                {registerPassword?.current?.value?.match(numbers) ? (
                  <li className="text-lime-500">
                    <i class="fa-solid fa-check mr-10"></i>
                    <span>Có ký tự là số</span>
                  </li>
                ) : (
                  <li className="text-rose-400">
                    <i className="fa-solid fa-xmark mr-10"></i>
                    <span>Có ký tự là số</span>
                  </li>
                )}
                {registerPassword?.current?.value?.length >= 8 ? (
                  <li className="text-lime-500">
                    <i class="fa-solid fa-check mr-10"></i>
                    <span>Mật khẩu từ 8 ký tự trở lên</span>
                  </li>
                ) : (
                  <li className="text-rose-400">
                    <i class="fa-solid fa-xmark mr-10"></i>
                    <span>Mật khẩu từ 8 ký tự trở lên</span>
                  </li>
                )}
              </ul>

              {/* Button submit */}
              <div className="form__element text-center small-phone:m-0">
                {registerPassword?.current?.value?.length > 8 &&
                registerPassword?.current?.value?.match(lowerCaseLetters) &&
                registerPassword?.current?.value?.match(upperCaseLetters) &&
                registerPassword?.current?.value?.match(numbers) ? (
                  <button type="submit" className="w-8/12 bg-[#132C33] button">
                    Xác Nhận
                  </button>
                ) : null}
              </div>

              {/* Navigate to Login page */}
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
