import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import categories from "../categories";
import EditText from "../components/EditText";
import Loading from "../components/Loading";
import { useCreateProductMutation } from "../services/appApi";

function NewProducts() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState(0);
  const [specifications, setSpecifications] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const [imageToRemove, setImageToRemove] = useState(null);
  const [stockingActive, setStockingActive] = useState(true)
  const [outOfStockActive, setOutOfStockActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();
  const stocking = useRef(null)
  const outOfStock = useRef(null);

  const getStatusStocking = () => {
    setStatus(stocking.current.innerHTML);
    setStockingActive(true);
    setOutOfStockActive(false);
  }

  const getStatusOutofStock = () => {
    setStatus(outOfStock.current.innerHTML);
    setStockingActive(false);
    setOutOfStockActive(true);
  };

  // Submit create products
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !longDescription ||
      !specifications ||
      !price ||
      !brand ||
      !images.length
    ) {
      return alert("Vui lòng điền vào form hoặc quay lại");
    }
    createProduct({
      name,
      description,
      longDescription,
      specifications,
      price,
      category,
      brand,
      discount,
      images,
      status,
    }).then(({ data }) => {
      if (data.length > 0) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    });
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

  // Remove image
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
            {/* Form create product */}
            <form
              onSubmit={handleSubmit}
              className="form__create--product p-2 w-full grid grid-cols-5"
            >
              <div className="laptop:col-span-2 small-phone:col-span-5 p-4">
                <div className="small-phone:text-center laptop:text-left">
                  <strong className="big-phone:text-3xl small-phone:text-2xl">
                    Tạo sản phẩm mới
                  </strong>
                </div>

                {/* Alert when submit create */}
                {isSuccess && (
                  <alert variant="success">Tạo sản phẩm thành công</alert>
                )}
                {isError && (
                  <alert variant="error">Tạo sản phẩm thất bại</alert>
                )}

                {/* Product's title */}
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

                {/* Product's description */}
                <div>
                  <label>Mô tả ngắn</label>
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

                {/* Product's long description */}
                <div className="laptop:col-span-2">
                  <label>Mô tả chi tiết</label>
                  <br />
                  <EditText
                    theme="snow"
                    value={longDescription}
                    onChange={setLongDescription}
                    className="bg-white h-96 mb-8"
                  />
                </div>

                {/* Product's specifications */}
                <div className="laptop:col-span-2">
                  <label>Thông số kỹ thuật</label>
                  <br />
                  <EditText
                    theme="snow"
                    value={specifications}
                    onChange={setSpecifications}
                    className="bg-white h-96 mb-8"
                  />
                </div>

                {/* Product's price */}
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

                {/* Product's brand */}
                <div>
                  <label>Thương hiệu</label>
                  <br />
                  <input
                    className="w-full"
                    type="text"
                    placeholder="Nhập giá sản phẩm"
                    value={brand}
                    required
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>

                {/* Product's discount */}
                <div>
                  <label>Giảm giá</label>
                  <br />
                  <input
                    className="w-full"
                    type="text"
                    placeholder="Nhập giá sản phẩm"
                    value={discount}
                    required
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>

                {/* Product's category */}
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

                {/* Product's status */}
                <div className="flex flex-row justify-evenly">
                  <div
                    ref={stocking}
                    onClick={getStatusStocking}
                    className={
                      stockingActive
                        ? "px-4 py-2 bg-lime-500 text-white shadow-sm rounded-lg cursor-pointer ring-2 ring-offset-2 ring-lime-500"
                        : "px-4 py-2 bg-lime-500 text-white shadow-sm rounded-lg cursor-pointer hover:scale-110 ease-in-out duration-200"
                    }
                  >
                    Còn hàng
                  </div>
                  <div
                    ref={outOfStock}
                    onClick={getStatusOutofStock}
                    className={
                      outOfStockActive
                        ? "px-4 py-2 bg-rose-500 text-white shadow-sm rounded-lg cursor-pointer ring-2 ring-offset-2 ring-rose-500"
                        : "px-4 py-2 bg-rose-500 text-white shadow-sm rounded-lg cursor-pointer hover:scale-110 ease-in-out duration-200"
                    }
                  >
                    Hết hàng
                  </div>
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

              {/* Choose Image */}
              <div className="laptop:col-span-3 small-phone:col-span-5 p-4">
                <div className="text-center">
                  <div className="flex justify-center">
                    <div
                      onClick={showWidget}
                      className="bg-[#132C33] cursor-pointer text-white shadow-sm rounded-lg w-6/12 py-2 hover:text-black ease-in-out duration-200 hover:bg-[#D8E3E7]"
                    >
                      Chọn ảnh
                    </div>
                  </div>
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

export default NewProducts;
