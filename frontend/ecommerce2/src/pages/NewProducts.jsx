import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import categories from "../categories";
import Loading from "../components/Loading";
import { useCreateProductMutation } from "../services/appApi";

function NewProducts() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imageToRemove, setImageToRemove] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert("Vui lòng điền vào form hoặc quay lại");
    }
    createProduct({ name, description, price, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        }
      }
    );
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

  const handleRemoveImg = (imgObj) => {
    setImageToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImageToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="big-phone:container big-phone:mx-auto min-h-max my-8">
      {error && <Loading />}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex laptop:flex-row small-phone:flex-col">
            <form
              onSubmit={handleSubmit}
              className="form__create--product p-2 w-full grid grid-cols-5"
            >
              <div className="laptop:col-span-2 small-phone:col-span-5 p-4">
                <div className="small-phone:text-center laptop:text-left">
                  <strong className="big-phone:text-3xl small-phone:text-2xl">Tạo sản phẩm mới</strong>
                </div>
                {isSuccess && (
                  <alert variant="success">Tạo sản phẩm thành công</alert>
                )}
                {isError && (
                  <alert variant="error">Tạo sản phẩm thất bại</alert>
                )}
                <div>
                  <label>Tên sản phẩm</label>
                  <br />
                  <input
                    className="w-full"
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Mô tả</label>
                  <br />
                  <input
                    className="w-full"
                    as="textarea"
                    placeholder="Nhập mô tả"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label>Giá tiền</label>
                  <br />
                  <input
                    className="w-full"
                    type="text"
                    placeholder="Nhập giá sản phẩm"
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div onChange={(e) => setCategory(e.target.value)}>
                  <label>Danh mục</label>
                  <br />
                  <select className="ml-2 p-2 rounded-md w-full">
                    <option disabled>Chọn một</option>
                    {categories.map((category) => (
                      <option value={category.name}>{category.name}</option>
                    ))}
                  </select>
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
                  <button onClick={showWidget} className="bg-[#132C33]">
                    Chọn ảnh
                  </button>
                  <div className="p-4 border-spacing-1 border-cyan-700 border-2 grid grid-cols-3 rounded-lg">
                    {images.map((image) => (
                      <div>
                        <img
                          src={image.url}
                          alt=""
                          className="big-desktop:w-64 laptop:w-48 laptop:h-48 big-phone:h-32 big-phone:w-32 big-desktop:h-64 shadow-sm rounded-lg mx-4"
                        />
                        {imageToRemove !== image.public_id && (
                          <span>
                            <i
                              className="fa fa-times-circle"
                              onClick={() => handleRemoveImg(image)}
                            ></i>
                          </span>
                        )}
                      </div>
                    ))}
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

export default NewProducts;
