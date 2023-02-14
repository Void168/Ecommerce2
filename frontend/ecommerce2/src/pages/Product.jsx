import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../axios";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "../image";

function Product() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [selected, setSelected] = useState(Image[1]);
  const [loading, setLoading] = useState(false);

  const [addToCart, { isSuccess }] = useAddToCartMutation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
      setSimilar(data.similar);
    });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto">
        <Loading />
      </div>
    );
  }

  let similarProducts = [];
  if (similar) {
    similarProducts = similar.map((product, index) => (
      <div
        className="big-phone:container big-phone:mx-auto"
        data-value={index}
        key={product}
      >
        <SimilarProduct {...product} />
      </div>
    ));
  }

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="big-phone:container big-phone:mx-auto small-phone:mx-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="my-8 grid grid-cols-5">
            <div className="big-tablet:col-span-2 galaxy-fold:col-span-5 small-phone:mb-8 ">
              <div className="text-black mb-8 truncate tablet:text-xl">
                <Link to="/">Trang chủ</Link>{" "}
                <i className="fas fa-caret-right"></i>
                <Link to={`/category/${product.category.toLocaleLowerCase()}`}>
                  {" "}
                  {product.category}{" "}
                </Link>
                <i className="fas fa-caret-right"></i>
                {/* {product.type} <i class="fas fa-caret-right"></i> */}{" "}
                {product.name}
              </div>
              <div>
                <div className="tablet:p-4 big-phone:px-20 big-phone:grid-cols-1 small-phone:grid small-phone:grid-cols-5 small-phone:gap-10">
                  <img
                    src={product.pictures[0].url}
                    alt={product.name}
                    className="w-full bg-[#fff] hover:scale-105 ease-in-out duration-300 small-phone:col-span-4"
                  />
                  <div className="flex big-phone:flex-row small-phone:flex-col justify-between my-8 small-phone:m-0 big-phone:col-span-4 small-phone:col-span-1 ">
                    {Image.map((img, index) => (
                      <div>
                        <img
                          key={index}
                          src={img}
                          alt="gallery"
                          style={{
                            border: selected === img ? "2px solid #132C33" : "",
                          }}
                          onClick={() => setSelected(img)}
                          className="hover:cursor-pointer desktop:w-20 desktop:h-20 laptop:w-16 laptop:h-16 big-tablet:w-12 big-tablet:h-12 tablet:w-20 tablet:h-20 big-phone:w-16 big-phone:h-16 small-phone:w-12 small-phone:h-12"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="big-tablet:col-span-3 small-phone:col-span-5">
              <p className="big-phone:text-4xl small-phone:text-3xl text-center mb-4">
                Thông tin sản phẩm
              </p>
              <div className="flex flex-col big-tablet:justify-between laptop:justify-start galaxy-fold:justify-start py-4 px-8 h-full">
                <div className="text-xl">
                  <p className="my-4">{product.name}</p>
                  <span className="my-4 text-xl text-black">Giá gốc: </span>
                  <span className="laptop:text-3xl tablet:text-2xl my-4 text-red-500 line-through">
                    {(product.price * 24000).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                  <p className="laptop:text-3xl tablet:text-2xl my-4 text-[#126E82]">
                    <span className="my-4 text-xl text-black">Còn: </span>
                    {(product.price * 24000).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <strong>{product.description}</strong>
                </div>
                <div className="my-4 flex flex-col">
                  {!user ? (
                    <button
                      className="big-tablet:w-6/12 tablet:w-8/12 bg-[#132C33] my-4"
                      onClick={navigateToLogin}
                    >
                      Đăng nhập để mua hàng
                    </button>
                  ) : (
                    <button
                      className="big-tablet:w-6/12 tablet:w-8/12 bg-[#132C33] my-4"
                      onClick={(e) =>
                        addToCart({
                          userId: user._id,
                          productId: id,
                          price: product.price,
                          image: product.pictures[0].url,
                        })
                      }
                    >
                      Thêm vào giỏ
                    </button>
                  )}
                  {user && user.isAdmin && (
                    <Link to={`/product/${product._id}/edit`}>
                      <button className="bg-[#132C33] big-tablet:mb-20 small-phone:mb-0 big-tablet:w-6/12 tablet:w-8/12 small-phone:w-full">
                        Sửa thông tin sản phẩm
                      </button>
                    </Link>
                  )}
                </div>
              </div>

              {isSuccess && (
                <ToastMessage
                  bg="info"
                  title="Thông báo"
                  body={`${product.name} đã được thêm vào giỏ hàng`}
                >
                  <Link to="/cart"></Link>
                </ToastMessage>
              )}
            </div>
          </div>
          <div>
            <p className="text-2xl">Sản phẩm tương tự</p>
            <div className="flex justify-center items-center flex-wrap w-full my-4">
              <Swiper
                watchSlidesProgress={true}
                slidesPerView={4}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="shadow-sm outline-0"
              >
                {similarProducts.map((product) => (
                  <SwiperSlide key={product.id}>{product}</SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
