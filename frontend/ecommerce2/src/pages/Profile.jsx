import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProfileMutation } from "../services/appApi";
import axios from "../axios";
import Loading from "../components/Loading";
import {
  Alert,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useSelector } from "react-redux";
import SelectAddress from "../components/SelectAddress";
import { AppContext } from "../context/AppContext";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Profile() {
  const { id } = useParams();
  const {
    number,
    setNumber,
    chosenProvince,
    chosenDistrict,
    chosenWard,
    setChosenProvince,
    setChosenDistrict,
    setChosenWard,
  } = useContext(AppContext);
  const fullAddress =
    number + ", " + chosenWard + ", " + chosenDistrict + ", " + chosenProvince;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setImages] = useState([]);
  const [avatarToRemove, setAvatarToRemove] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const user = useSelector((state) => state.user);
  const [updateProfile, { isError, error, isLoading, isSuccess }] =
    useUpdateProfileMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user
    axios
      .get("/users/" + id)
      .then(({ data }) => {
        const user = data.user;
        setName(user.name);
        setEmail(user.email);
        setImages(user.avatar);
        setPhone(user.phone);
        setPassword(user.password);
        setAddress(user.address);
      })
      .catch((e) => console.log(e));
  }, [id]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Submit change
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      return alert("Vui lòng điền vào form hoặc quay lại");
    }
    updateProfile({
      id,
      password,
      avatar,
      phone,
      address: fullAddress,
    });
  };

  // Remove Image
  const handleRemoveImg = (imgObj) => {
    setAvatarToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setAvatarToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  };

  // Choose image
  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dzttab71p",
        uploadPreset: "fw0qtksm",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  };

  useEffect(() => {
    setLoading(true);
    setNumber("");
    setChosenProvince("");
    setChosenDistrict("");
    setChosenWard("");
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [isSuccess]);

  return (
    <div className="big-phone:container big-phone:mx-auto min-h-max my-8">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="text-center">
            {/* Alert when submit update */}
            {isSuccess && (
              <Alert
                variant="success"
                className="p-2 text-lg text-emerald-700 bg-emerald-200 border-emerald-700 rounded-lg shadow-sm"
              >
                Cập nhật thành công
              </Alert>
            )}
            {isError && (
              <Alert
                variant="error"
                className="p-2 text-lg text-red-700 bg-red-200 border-red-700 rounded-lg shadow-sm"
              >
                Cập nhật thất bại
              </Alert>
            )}
          </div>
          <div className="flex laptop:flex-row small-phone:flex-col">
            {/* Update form */}
            <form
              onSubmit={handleSubmit}
              className="form__create--user p-2 w-full grid grid-cols-5 bg-slate-400 shadow-sm"
            >
              <div className="laptop:col-span-2 small-phone:col-span-5 p-4">
                <div className="small-phone:text-center laptop:text-left">
                  <p className="big-phone:text-4xl small-phone:text-2xl text-center">
                    Thông tin tài khoản
                  </p>
                </div>
                {/* User's name */}
                <div className="my-4">
                  <TextField
                    id="standard-read-only-input"
                    className="w-full"
                    label="Tên"
                    defaultValue={name}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                  />
                </div>

                {/* User's email */}
                <div className="my-4">
                  <TextField
                    id="standard-read-only-input"
                    className="w-full my-4"
                    label="Email"
                    defaultValue={email}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                  />
                </div>

                {/* User's password */}
                <div className="my-4">
                  {/* <TextField
                    id="outlined-password-input"
                    label="Đổi mật khẩu"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                  /> */}
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    className="w-full"
                  >
                    Đổi mật khẩu
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    className="w-full"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* User's phone */}
                <div className="my-4">
                  <TextField
                    className="w-full"
                    id="standard-basic"
                    label="Số điện thoại"
                    variant="standard"
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {/* User's address */}
                <div>
                  <label>Địa chỉ hiện tại</label>
                  <p className="text-sm"> ({address})</p>
                </div>

                {/* User's address change */}
                <div className="mt-4 pt-4 border-t-2">
                  <p className="text-center text-xl">Thay đổi địa chỉ</p>
                  <SelectAddress />
                  <label>Hiển thị địa chỉ mới</label>
                  <input
                    className="w-full bg-white"
                    type="text"
                    placeholder="Nhập địa chỉ"
                    value={fullAddress}
                    disabled
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                {/* Button submit */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="bg-[#132C33] mx-2 my-4 text-xl laptop:block small-phone:hidden button"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>

              {/* Choose Avatar */}
              <div className="laptop:col-span-3 small-phone:col-span-5 p-4">
                <div className="text-center">
                  <div className="flex justify-center">
                    <img
                      alt={`${user.name}`}
                      src={
                        user?.avatar.at(-1)
                          ? `${user?.avatar?.at(-1)?.url}`
                          : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
                      }
                      className="w-32 h-32 rounded-full"
                    />
                  </div>
                  <div className="flex justify-center">
                    <div
                      onClick={showWidget}
                      className="bg-[#132C33] cursor-pointer text-white shadow-sm rounded-lg w-6/12 py-2 hover:text-black ease-in-out duration-200 hover:bg-[#D8E3E7]"
                    >
                      Chọn ảnh
                    </div>
                  </div>

                  <p>
                    Danh sách avatar của bạn (nếu avatar nào không dùng nữa hãy
                    xóa nó)
                  </p>
                  <div className="p-4 border-spacing-1 border-cyan-700 border-2 grid grid-cols-3 rounded-lg">
                    {avatar
                      ?.map((image) => (
                        <div>
                          <img
                            src={image.url}
                            alt="avatar"
                            className="laptop:w-48 laptop:h-48 big-phone:h-32 big-phone:w-32 small-phone:h-24 small-phone:w-24 shadow-sm rounded-full mx-4"
                          />
                          {avatarToRemove !== image.public_id && (
                            <span>
                              <i
                                className="fa fa-times-circle"
                                onClick={() => handleRemoveImg(image)}
                              ></i>
                            </span>
                          )}
                        </div>
                      ))
                      .reverse()}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Button submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="bg-[#132C33] mx-2 my-4 text-xl laptop:hidden small-phone:block button"
            >
              Xác nhận
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
