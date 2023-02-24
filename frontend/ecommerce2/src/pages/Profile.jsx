import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProfileMutation } from "../services/appApi";
import axios from "../axios";
import Loading from "../components/Loading";
import { Alert, Avatar } from "@mui/material";
import { useSelector } from "react-redux";

function Profile() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setImages] = useState([]);
  const [avatarToRemove, setAvatarToRemove] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const user = useSelector((state) => state.user);
  const [updateProfile, { isError, error, isLoading, isSuccess }] =
    useUpdateProfileMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
      address,
    });
  };

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
            <form
              onSubmit={handleSubmit}
              className="form__create--user p-2 w-full grid grid-cols-5"
            >
              <div className="laptop:col-span-2 small-phone:col-span-5 p-4">
                <div className="small-phone:text-center laptop:text-left">
                  <strong className="text-3xl small-phone:text-2xl">
                    Thông tin tài khoản
                  </strong>
                </div>
                <div>
                  <label>Tên</label>
                  <br />
                  <input
                    className="w-full"
                    type="text"
                    placeholder="Nhập tên"
                    value={name}
                    disabled
                  />
                </div>
                <div>
                  <label>Email</label>
                  <br />
                  <input
                    className="w-full"
                    as="textarea"
                    disabled
                    placeholder="Nhập email"
                    value={email}
                  />
                </div>
                <div>
                  <label>Đổi Mật khẩu</label>
                  <br />
                  <input
                    className="w-full"
                    type="text"
                    placeholder="Nhập mật khẩu mới"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label>Số điện thoại</label>
                  <br />
                  <input
                    className="w-full"
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label>Địa chỉ</label>
                  <br />
                  <input
                    className="w-full"
                    type="text"
                    placeholder="Nhập địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="bg-[#132C33] mx-2 my-4 text-xl laptop:block small-phone:hidden"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
              <div className="laptop:col-span-3 small-phone:col-span-5 p-4">
                <div className="text-center">
                  <div className="flex justify-center">
                    <img
                      alt={`${user.name}`}
                      src={`${user.avatar.at(-1).url}`}
                      className='w-32 h-32 rounded-full'
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
                            alt=""
                            className="big-desktop:w-64 laptop:w-48 laptop:h-48 big-phone:h-32 big-phone:w-32 big-desktop:h-64 shadow-sm rounded-lg mx-4"
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
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="bg-[#132C33] mx-2 my-4 text-xl laptop:hidden small-phone:block"
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
