import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useLoginMutation } from "../services/appApi";
import TextField from "@mui/material/TextField";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [login, { isSucess, isError, isLoading, error }] = useLoginMutation();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Toggle show/hide password
  const ShowHidePassword = () => {
    if (!showPassword) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  // Close modal
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Open modal
  const openPopup = () => {
    if (!showPopup) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  // Handle submit
  const submitHandler = (e) => {
    e.preventDefault();
    login({ email, password });
    if (error) {
      setOpen(true);
      navigate("/login");
    }
  };

  return (
    <>
      <div>
        {error && open && (
          <div className="container mx-auto w-full flex justify-center">
            {/* Alert when submit */}
            <Alert
              onClose={handleClose}
              severity="error"
              className="fixed z-50 w-72 top-32"
            >
              {error.data}
            </Alert>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 w-full justify-center big-tablet:container big-tablet:mx-auto big-tablet:my-12">
        {loading ? (
          <div className="relative h-screen flex justify-center items-center text-center w-full col-span-4">
            <Loading />
          </div>
        ) : (
          <>
            {/* Login form */}
            <div className="big-tablet:w-full big-tablet:col-span-2 small-phone:col-span-4 tablet:w-6/12 big-phone:w-8/12 big-tablet:m-0 tablet:my-16 tablet:mx-20 big-phone:my-8 big-phone:mx-auto small-phone:mx-10 small-phone:my-10">
              <form
                onSubmit={submitHandler}
                className="big-tablet:bg-[#D8E3E7] small-phone:bg-gradient-to-b from-[#D8E3E7] to-[#126E82] p-4 h-full shadow-sm"
              >
                <div className="small-phone:text-3xl tablet:text-5xl text-center mb-8">
                  Đăng nhập
                </div>
                {/* Login email */}
                <div className="form__element">
                  <label htmlFor="email">Email</label>
                  <br />
                  <TextField
                    className="w-full shadow-none small-phone:m-0 px-2"
                    type="email"
                    id="email"
                    name="email"
                    label=""
                    variant="standard"
                    placeholder="Nhập email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></TextField>
                </div>

                {/* Login password */}
                <div className="relative form__element">
                  <label htmlFor="password">Mật khẩu</label>
                  <br />
                  <div className="flex flex-row relative">
                    <TextField
                      className="w-full shadow-none small-phone:m-0"
                      type={showPassword === true ? "password" : "text"}
                      id="password"
                      name="password"
                      label=""
                      variant="standard"
                      placeholder="Nhập mật khẩu"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    ></TextField>
                    <span onClick={ShowHidePassword}>
                      <i
                        className={
                          showPassword
                            ? "fas fa-eye-slash eye-1 absolute right-1 top-4"
                            : "fas fa-eye eye-1 absolute right-1 top-4"
                        }
                      ></i>
                    </span>
                  </div>
                </div>

                {/* Button submit */}
                <div className="form__element text-center small-phone:m-0">
                  <button type="submit" className="w-8/12 bg-[#132C33] button">
                    Xác Nhận
                  </button>
                  </div>
                  
                <div className="big-phone:mt-10 small-phone:mt-4">
                  {/* Navigate to Register page */}
                  <div className="form__element small-phone:p-0 small-phone:m-0">
                    Chưa có tài khoản? {""}
                    <Link to="/register">Đăng ký</Link>
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
    </>
  );
}

export default Login;
