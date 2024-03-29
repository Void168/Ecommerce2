import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "../services/appApi";
import axios from "../axios";
import categories from "../categories";
import Loading from "../components/Loading";
import "react-quill/dist/quill.snow.css";
import EditText from "../components/EditText";

function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState("");
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState(0);
  const [status, setStatus] = useState("");
  const [stockingActive, setStockingActive] = useState(true);
  const [outOfStockActive, setOutOfStockActive] = useState(false);
  const [imageToRemove, setImageToRemove] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [updateProduct, { isError, error, isLoading, isSuccess }] =
    useUpdateProductMutation();
  const stocking = useRef(null);
  const outOfStock = useRef(null);

  useEffect(() => {
    // Get product
    axios
      .get("/products/" + id)
      .then(({ data }) => {
        const product = data.product;
        setName(product.name);
        setDescription(product.description);
        setLongDescription(product.longDescription);
        setSpecifications(product.specifications);
        setCategory(product.category);
        setRating(product.rating);
        setImages(product.pictures);
        setPrice(product.price);
        setBrand(product.brand);
        setStatus(product.status);
        setDiscount(product.discount);
      })
      .catch((e) => console.log(e));
  }, [id]);

  console.log(status);

  console.log(stockingActive);
  console.log(outOfStockActive);

  const getStatusStocking = () => {
    setStatus(stocking.current.innerHTML);
    setStockingActive(true);
    setOutOfStockActive(false);
  };

  const getStatusOutofStock = () => {
    setStatus(outOfStock.current.innerHTML);
    setStockingActive(false);
    setOutOfStockActive(true);
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

  // Submit change
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
    } else
      updateProduct({
        id,
        name,
        description,
        longDescription,
        specifications,
        price,
        category,
        images,
        rating,
        brand,
        discount,
        status,
      }).then(({ data }) => {
        if (data.length > 0) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        }
      });
  };

  useEffect(() => {
    if (status === "Còn hàng") {
      setStockingActive(true);
      setOutOfStockActive(false);
    } else {
      setStockingActive(false);
      setOutOfStockActive(true);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [status]);

  return (
    <div className="big-phone:container big-phone:mx-auto min-h-max my-8">
      {error && null}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="text-center">
            {/* Alert when update */}
            {isSuccess && (
              <alert
                variant="success"
                className="p-2 text-lg text-emerald-700 bg-emerald-200 border-emerald-700 rounded-lg shadow-sm"
              >
                Cập nhật thành công
              </alert>
            )}
            {isError && (
              <alert
                variant="error"
                className="p-2 text-lg text-red-700 bg-red-200 border-red-700 rounded-lg shadow-sm"
              >
                Cập nhật thất bại
              </alert>
            )}
          </div>

          {/* Update form */}
          <div className="flex laptop:flex-row small-phone:flex-col">
            <form
              onSubmit={handleSubmit}
              className="form__create--product p-2 w-full"
            >
              <div className=" flex flex-row">
                <div className="grid grid-cols-5">
                  <div className="laptop:col-span-2 small-phone:col-span-5 p-4">
                    <div className="small-phone:text-center laptop:text-left">
                      <p className="text-center big-phone:text-4xl small-phone:text-2xl">
                        Điều chỉnh sản phẩm
                      </p>
                    </div>

                    {/* Product's Title */}
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

                    {/* Product's Description */}
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

                    {/* Product's Price */}
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

                    {/* Product's Brand */}
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

                    {/* Product's Discount */}
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

                    {/* Product's Category */}
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

                    {/* Product's Rating */}
                    <div>
                      <label>Đánh giá</label>
                      <br />
                      <input
                        className="w-full bg-white"
                        type="text"
                        value={rating}
                        disabled
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </div>

                    {/* Product's Status */}
                    <div className="flex flex-row justify-evenly">
                      <div
                        ref={stocking}
                        onClick={getStatusStocking}
                        className={
                          (stockingActive && status === "Còn hàng") ||
                          stockingActive
                            ? "px-4 py-2 bg-lime-500 text-white shadow-sm rounded-lg cursor-pointer ring-2 ring-offset-2 ring-lime-500 scale-125"
                            : "px-4 py-2 bg-lime-500 text-white shadow-sm rounded-lg cursor-pointer hover:scale-110 hover:ring-2 hover:ring-offset-2 hover:ring-lime-500 ease-in-out duration-200"
                        }
                      >
                        Còn hàng
                      </div>
                      <div
                        ref={outOfStock}
                        onClick={getStatusOutofStock}
                        className={
                          (outOfStockActive && status === "Hết hàng") ||
                          outOfStockActive
                            ? "px-4 py-2 bg-rose-500 text-white shadow-sm rounded-lg cursor-pointer ring-2 ring-offset-2 ring-rose-500 scale-125"
                            : "px-4 py-2 bg-rose-500 text-white shadow-sm rounded-lg cursor-pointer hover:scale-110 hover:ring-2 hover:ring-offset-2 hover:ring-rose-500 ease-in-out duration-200"
                        }
                      >
                        Hết hàng
                      </div>
                    </div>
                  </div>

                  {/* Choose image */}
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
                </div>
              </div>

              <div className="grid grid-cols-4 gap-8 max-h-max">
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
                <div className="laptop:col-span-2 max-h-max">
                  {/* Product's specifications */}
                  <label>Thông số kỹ thuật</label>
                  <br />
                  <EditText
                    theme="snow"
                    value={specifications}
                    onChange={setSpecifications}
                    className="bg-white h-96 mb-8"
                  />
                </div>
              </div>

              {/* Button Submit */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="bg-[#132C33] mx-2 my-4 text-xl laptop:block small-phone:hidden button"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
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

export default EditProduct;
