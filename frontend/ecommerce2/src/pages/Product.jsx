import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../axios";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import Rating from "../components/Rating";
import {
  useAddToCartMutation,
  useCreateReviewMutation,
} from "../services/appApi";
import ToastMessage from "../components/ToastMessage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Product() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const [addToCart, { isSuccess }] = useAddToCartMutation();
  const [createReview, { isError, isSuccess1 }] = useCreateReviewMutation();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(createReview({ rating, comment, name: user.name }));
    } else {
      alert("Hãy bình luận và chọn số sao");
    }
  };

  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
      setSimilar(data.similar);
    });
    axios.get(`/products/${id}/reviews`).then(({ data }) => {
      setComment(data.comment);
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

  const listPic = product.pictures;

  return (
    <div className="big-phone:container big-phone:mx-auto small-phone:mx-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="my-8 grid grid-cols-5">
            <div className="big-tablet:col-span-2 galaxy-fold:col-span-5 small-phone:mb-8 ">
              <div className="text-black mb-8 tablet:text-xl">
                <Link to="/">Trang chủ</Link>{" "}
                <i className="fas fa-caret-right"></i>
                <Link to={`/category/${product.category.toLocaleLowerCase()}`}>
                  {" "}
                  {product.category}{" "}
                </Link>
                <Link
                  to={`/search/${product.brand
                    .toLocaleLowerCase()
                    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
                    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                    .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
                    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                    .replace(/đ/g, "d")
                    .replace(/\s/g, "")}`}
                >
                  {" "}
                  <i className="fas fa-caret-right"></i> {product.brand}{" "}
                </Link>
                <i className="fas fa-caret-right"></i> {product.name}
              </div>
              <div>
                <div className="tablet:p-4 big-phone:px-20 big-phone:grid-cols-1 small-phone:grid small-phone:grid-cols-5 small-phone:gap-10">
                  <div className="flex big-phone:flex-row justify-between my-8 big-phone:col-span-4 small-phone:col-span-5 ">
                    <Carousel className="w-full">
                      {listPic.map((img, index) => (
                        <div>
                          <img
                            key={index}
                            src={img.url}
                            alt="gallery"
                            style={{
                              border:
                                selected === img ? "2px solid #132C33" : "",
                            }}
                            className="w-full bg-[#fff] hover:scale-105 ease-in-out duration-300 small-phone:col-span-4"
                          />
                        </div>
                      ))}
                    </Carousel>
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
                    {(
                      ((product.price * (100 - product.discount)) / 100) *
                      24000
                    ).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                    <span className="my-4 text-xl text-black">
                      {" "}
                      (Giảm {product.discount}%)
                    </span>
                  </p>
                  <p>{product.description}</p>
                  <br />
                  <p>Nhà phân phối: {product.brand}</p>
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
            <div className="flex justify-center items-center flex-wrap big-tablet:w-9/12 small-phone:w-full big-phone:mx-auto big-phone:container">
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
          <div className="container mx-auto my-8">
            <div className="my-8">
              <p>Bình luận ({product.reviews.length})</p>
              {product.reviews.length === 0 ? (
                <p>Chưa có đánh giá</p>
              ) : (
                <ul className="reviews">
                  {product.reviews.map((review) => (
                    <li key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rating} caption=" "></Rating>
                      <p>
                        {review.createdAt.substring(0, 10)}{" "}
                        {review.createdAt.substring(11, 19)}
                      </p>
                      <p>Nội dung: {review.comment}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="container mx-auto bg-[#126E82] p-4">
              <p className="text-2xl text-white text-center">Viết nhận xét</p>
              {user ? (
                <form onSubmit={submitHandler}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <select
                        style={{ margin: "2rem 0" }}
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Chọn đánh giá</option>
                        <option value="1">1 sao - Tệ</option>
                        <option value="2">2 sao - Khá</option>
                        <option value="3">3 sao - Tốt</option>
                        <option value="4">4 sao - Rất tốt</option>
                        <option value="5">5 sao - Tuyệt vời</option>
                      </select>
                    </div>
                    <div
                      className="flex flex-col "
                    >
                      <label htmlFor="comment">
                        <strong className="text-white">
                          Bình luận của bạn
                        </strong>
                      </label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <div>
                        {/* <label>
                          {loadingReviewCreate && <LoadingBox></LoadingBox>}
                          {errorReviewCreate && (
                            <MessageBox variant="danger">
                              {errorReviewCreate}
                            </MessageBox>
                          )}
                        </label> */}
                      </div>
                      <div className="text-center">
                        <button
                          variant="contained"
                          className="bg-[#132C33]"
                          type="submit"
                        >
                          Gửi đánh giá
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <h2>
                  Vui lòng <Link to="/signin">Đăng nhập</Link> để nhận xét
                </h2>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
