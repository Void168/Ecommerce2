import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../axios";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import Rating from "../components/Rating";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { AppContext } from "../context/AppContext";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import categories from "../categories";

// Props of Tabs MUI
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Product() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [count, setCount] = useState([]);
  const [pId, setPId] = useState([]);

  const {
    viewedProducts,
    setViewedProducts,
    favProducts,
    setFavProducts,
    convert,
    USD_VND_EXCHANGE_RATE,
    orders,
    setOrders,
  } = useContext(AppContext);

  // Save items to local storage to display viewed products
  useEffect(() => {
    setViewedProducts((viewedProduct) => [product, ...viewedProduct]);
  }, [product, setViewedProducts]);
  localStorage.setItem("viewed products", JSON.stringify(viewedProducts));

  const [addToCart, { isSuccess }] = useAddToCartMutation();
  const navigate = useNavigate();

  // Submit reviews (not finished yet)
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating && user) {
      axios
        .post(`http://localhost:8080/products/${id}/reviews`, {
          name: user.name,
          comment,
          rating,
        })
        .then(() => alert("Gửi nhận xét thành công"))
        .then(() => window.location.reload())
        .catch(() => alert("Gửi nhận xết thất bại!"));
      setRating("");
      setComment("");
    } else {
      alert("Hãy bình luận và chọn số sao");
    }
  };

  // Toggle open read more features
  const handleClick = (e) => {
    setOpen(!open);
  };

  // Toggle open read more details
  const handleClick1 = (e) => {
    setOpen1(!open1);
  };

  // Handle change tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Add product to favourite (just on local storage, not backend)
  const addToFav = () => {
    setFavProducts((favProduct) => [product, ...favProduct]);
  };

  // Save favourite product to local storage
  localStorage.setItem("fav products", JSON.stringify(favProducts));
  const favItems = localStorage.getItem("fav products");
  const list = JSON.parse(favItems);

  // Remove null elements in list of favourite products
  const listFavProduct = list?.filter((element) => element !== null);

  // Remove duplicate elements
  const uniqueArray = listFavProduct?.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      listFavProduct.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });

  // Remove product from favourite products
  const removeFromFav = () => {
    setFavProducts([...favProducts.filter((fav) => fav._id !== id)]);
  };

  useEffect(() => {
    // Get product
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
      setSimilar(data.similar);
    });

    axios
      .get("/orders")
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [id]);

  // Number of sold
  useEffect(() => {
    const idList = async () => {
      // Get Array of items in orders
      const orderItems = orders.map((order) => order.products);
      const newArray = orderItems.map(({ total, count, ...id }) => id);
      const arrayNumber = Object.entries(newArray).flat();
      for (let i = 0; i < arrayNumber.length; i++) {
        arrayNumber.splice(i, 1);
      }

      // Get id and count of items in orders
      const idList = arrayNumber
        .map(Object.entries)
        .flat(1)
        .filter((id) => id[0].includes("63d"));
      setPId(idList);
      // Get id and count of items in orders have the same id with watching product
      const count = idList.filter((x) => x[0] === id);

      // Calculate number of watching product has been sold
      const result = count.reduce(function (r, a) {
        a.forEach(function (b, i) {
          r[i] = (r[i] || 0) + b;
        });
        return r;
      }, []);
      setCount(result[1]);
    };
    idList();
  }, [orders]);

  // Not Found product
  if (!product) {
    return (
      <div className="container mx-auto">
        <Loading />
      </div>
    );
  }

  // Convert vietnamese name to english
  const convertCategoryName = convert(product.category).replace(/\s/g, "");
  const convertBrandName = convert(product.brand).replace(/\s/g, "");

  // create list of similar products
  let similarProducts = [];
  if (similar) {
    similarProducts = products
      .filter(
        (filteredProduct) =>
          filteredProduct.name
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .replace(/\s/g, "")
            .includes(convertBrandName) ||
          filteredProduct.brand
            .toLocaleLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .replace(/\s/g, "")
            .includes(convertBrandName)
      )
      .map((product, index) => (
        <div
          className="big-phone:container big-phone:mx-auto"
          data-value={index}
          key={index}
        >
          <SimilarProduct {...product} />
        </div>
      ))
      .slice(0, 8);
  }

  const navigateToLogin = () => {
    navigate("/login");
  };

  // List pictures of product
  const listPic = product.pictures;

  // Choose background by category
  const backGround = categories
    .filter((category) => category.name === product.category)
    .map((x) => (
      <div
        className={`${x.background} w-full h-96 bg-contain opacity-80`}
      ></div>
    ));

  console.log(
    product.reviews.filter((review) => review.rating === 5).length /
      product.reviews.length
  );
  return (
    <>
      <div className="flex justify-center">
        {backGround}
        {/* Directional bar */}
        <div className="big-tablet:block small-phone:hidden fixed truncate big-tablet:bottom-0 big-tablet:text-base small-phone:text-xs z-50 bg-gradient-to-r from-[#132C33] to-[#126E82] text-white w-full big-tablet:container big-tablet:max-auto p-2  ring-offset-slate-900 ring-offset-4 ring ring-[#D8E3E7] big-tablet:rounded-t-lg small-phone:rounded-t-none small-phone:rounded-b-lg big-tablet:rounded-b-none">
          <div className="flex flex-row justify-between">
            <Link
              to="/"
              className="px-2 hover:text-red-400 duration-200 ease-in-out"
            >
              Trang chủ
            </Link>

            <i className="fas fa-caret-right"></i>

            <Link
              className="px-2 hover:text-red-400 duration-200 ease-in-out"
              to={`/danh-muc/${convertCategoryName}`}
            >
              {product.category}
            </Link>

            <i className="fas fa-caret-right"></i>

            <Link
              className="px-2 hover:text-red-400 duration-200 ease-in-out"
              to={`/tim-kiem/${convertBrandName}`}
            >
              {product.brand}
            </Link>

            <i className="fas fa-caret-right"></i>

            <span className="truncate px-2">{product.name}</span>
          </div>
        </div>
        <div className="big-tablet:hidden small-phone:block fixed truncate big-tablet:bottom-0 small-phone:top-0 big-tablet:text-base small-phone:text-xs z-10 bg-gradient-to-r from-[#132C33] to-[#126E82] text-white w-full big-tablet:container big-tablet:max-auto p-2 ring-offset-slate-900 ring-offset-4 ring ring-[#D8E3E7] big-tablet:rounded-t-lg small-phone:rounded-b-lg">
          <div className="flex flex-row justify-around">
            <Link to="/" className="px-2">
              Trang chủ
            </Link>

            <i className="fas fa-caret-right"></i>

            <Link className="px-2" to={`/danh-muc/${convertCategoryName}`}>
              {product.category}
            </Link>

            <i className="fas fa-caret-right"></i>

            <Link className="px-2" to={`/tim-kiem/${convertBrandName}`}>
              {product.brand}
            </Link>

            <i className="fas fa-caret-right"></i>

            <span className="truncate px-2">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="laptop:container laptop:mx-auto">
        {loading ? (
          <Loading />
        ) : (
          <>
            {/* Add/ Remove to favourite products */}
            <div className="laptop:my-8 grid grid-cols-5 bg-watched text-white p-12 relative">
              {uniqueArray.map((arr) => arr._id).includes(id) ? (
                <div
                  className="absolute right-0 px-2 py-1 bg-[#D8E3E7] text-black rounded-bl-lg shadow-sm cursor-pointer hover:bg-red-300 hover:text-white ease-in-out duration-200"
                  onClick={removeFromFav}
                >
                  Xóa khỏi yêu thích{" "}
                  <i className="fa-solid fa-heart-crack text-red-800"></i>
                </div>
              ) : (
                <div
                  className="absolute right-0 px-2 py-1 bg-[#D8E3E7] text-black rounded-bl-lg shadow-sm cursor-pointer hover:bg-red-300 hover:text-white ease-in-out duration-200"
                  onClick={addToFav}
                >
                  Thêm vào yêu thích{" "}
                  <i className="fa-solid fa-heart text-red-800"></i>
                </div>
              )}

              <div className="big-tablet:col-span-2 galaxy-fold:col-span-5 small-phone:mb-8 ">
                <div>
                  <div className="tablet:p-4 big-phone:grid-cols-1 small-phone:grid small-phone:grid-cols-5 small-phone:gap-10">
                    <div className="flex big-phone:flex-row justify-between big-phone:col-span-4 small-phone:col-span-5 ">
                      {/* Display images of product */}
                      <Carousel
                        className="w-full"
                        autoPlay={true}
                        infiniteLoop={true}
                      >
                        {listPic.map((img, index) => (
                          <div>
                            <img
                              key={index}
                              src={img.url}
                              alt="gallery"
                              style={{
                                border:
                                  selected === img ? "2px solid #51C4D3" : "",
                              }}
                              className="w-full bg-[#fff] ease-in-out duration-300 small-phone:col-span-4 rounded-lg"
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product informations */}
              <div className="big-tablet:col-span-3 small-phone:col-span-5">
                <p className="big-phone:text-4xl small-phone:text-2xl text-center mb-4">
                  Thông tin sản phẩm
                </p>
                <div className="flex flex-col big-tablet:justify-around laptop:justify-start galaxy-fold:justify-start py-4 big-phone:px-8 small-phone:px-0 h-full">
                  <div className="text-xl">
                    <div className="flex flex-col big-phone:py-4 px-2 small-phone:py-0">
                      {/* Product's name */}
                      <p className="big-phone:text-2xl small-phone:text-xl">
                        {product.name}
                      </p>

                      {/* Product's rating */}
                      <div className="flex flex-row big-phone:text-xl small-phone:text-sm">
                        (<span>Đánh giá</span>
                        &nbsp;
                        <Rating
                          rating={
                            (
                              product.reviews.reduce(
                                (a, c) => c.rating + a,
                                0
                              ) / product.reviews.length
                            ).toFixed(1) || 0
                          }
                          caption=" "
                        ></Rating>
                        &nbsp;
                        <span>
                          {(
                            product.reviews.reduce((a, c) => c.rating + a, 0) /
                            product.reviews.length
                          ).toFixed(1) || 0}
                          )
                        </span>
                      </div>
                    </div>
                    {/* Product's price change to VND */}
                    <span className="my-4 text-xl">Giá gốc: </span>
                    <span className="laptop:text-3xl tablet:text-2xl my-4 text-[#51C4D3] line-through">
                      {(product.price * USD_VND_EXCHANGE_RATE).toLocaleString(
                        "it-IT",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </span>
                    <p className="laptop:text-3xl tablet:text-2xl my-4 text-red-500">
                      <span className="my-4 text-xl">Còn: </span>
                      {(
                        ((product.price * (100 - product.discount)) / 100) *
                        USD_VND_EXCHANGE_RATE
                      ).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}

                      {/* Product's discount */}
                      <span className="my-4 text-xl text-white">
                        {" "}
                        (Giảm {product.discount}%)
                      </span>
                    </p>
                    {/* Product's description */}
                    <p>{product.description}</p>
                    <br />
                    {/* Product's brand */}
                    <p>Nhà phân phối: {product.brand}</p>
                    <br />
                    {/* Product's status */}
                    <p>
                      Trạng thái:
                      <span
                        className={
                          product.status === "Còn hàng"
                            ? "text-lime-500"
                            : "text-rose-500"
                        }
                      >
                        {" "}
                        {product.status}
                      </span>
                    </p>
                    <br />
                    <p>Đã bán: {count || 0} sản phẩm</p>
                  </div>

                  <div className="my-4 flex flex-col">
                    {/* Not logged in yet */}
                    {!user ? (
                      <button
                        className="laptop:w-6/12 big-tablet:w-8/12 small-phone:w-full flex flex-row big-tablet:justify-around small-phone:justify-center shadow-sm rounded-md my-4 text-center px-4 py-2 button"
                        onClick={navigateToLogin}
                      >
                        Đăng nhập để mua hàng
                      </button>
                    ) : (
                      <>
                        {/* Logged in */}
                        {/* Add to cart button */}
                        {product.status === "Còn hàng" ? (
                          <button
                            className="laptop:w-6/12 big-tablet:w-8/12 small-phone:w-full flex flex-row big-tablet:justify-around small-phone:justify-center shadow-sm rounded-md my-4 text-center px-4 py-2 button"
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
                        ) : (
                          <div className="laptop:w-6/12 big-tablet:w-8/12 small-phone:w-full flex flex-row big-tablet:justify-around small-phone:justify-center bg-rose-500 shadow-sm rounded-md my-4 text-center px-4 py-2">
                            <i className="fa-solid fa-phone text-4xl big-tablet:text-2xl small-phone:hidden"></i>
                            <div>
                              <p className="desktop:text-base small-phone:text-xs">
                                Liên hệ số điện thoại 0123456789
                              </p>
                              <p className="desktop:text-base small-phone:text-xs">
                                {" "}
                                để nhận thông báo khi có hàng
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* User is admin */}
                    {user && user.isAdmin && (
                      // Edit product button -> navigate to edit product page
                      <button className="laptop:w-6/12 big-tablet:w-8/12 small-phone:w-full flex flex-row big-tablet:justify-around small-phone:justify-center shadow-sm rounded-md my-4 text-center px-4 py-2 button small-phone:text-sm big-phone:text-base">
                        <Link to={`/san-pham/${product._id}/chinh-sua`}>
                          Sửa thông tin sản phẩm
                        </Link>
                      </button>
                    )}
                  </div>
                </div>

                {/* Toast message if add to cart successfully */}
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

            {/* Tabs */}
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  {/* Feature Tab title */}
                  <Tab label="Mô tả" {...a11yProps(0)} />
                  {/* Specifications Tab title */}
                  <Tab label="Thông số kỹ thuật" {...a11yProps(1)} />
                  {/* Review Tab title */}
                  <Tab label="Bình luận" {...a11yProps(2)} />
                </Tabs>
              </Box>

              {/* Feature Tab */}
              <TabPanel value={value} index={0}>
                <div className="laptop:w-8/12 small-phone:w-full border-x-2 border-b-2 border-[#132C33] bg-opacity-70 rounded-b-2xl p-4 bg-[#D8E3E7] flex flex-col justify-center items-center">
                  <p className="big-phone:text-3xl small-phone:text-xl text-center mb-8 text-[#126E82]">
                    ĐẶC ĐIỂM NỔI BẬT
                  </p>
                  <div
                    className={
                      open
                        ? "long-description h-full transition-height ease-linear duration-300"
                        : "long-description h-96 overflow-hidden transition-height ease-linear duration-300"
                    }
                    dangerouslySetInnerHTML={{
                      __html: product?.longDescription,
                    }}
                  ></div>
                  <button
                    className={
                      open
                        ? "button tablet:w-3/12 small-phone:w-6/12 hidden"
                        : "button tablet:w-3/12 small-phone:w-6/12 block my-4"
                    }
                    onClick={handleClick}
                  >
                    Xem thêm
                  </button>
                  <button
                    className={
                      open
                        ? "button tablet:w-3/12 small-phone:w-6/12 block my-4"
                        : "button tablet:w-3/12 small-phone:w-6/12 hidden"
                    }
                    onClick={handleClick}
                  >
                    Thu gọn
                  </button>
                </div>
              </TabPanel>

              {/* Specifications Tab */}
              <TabPanel value={value} index={1}>
                <div className="laptop:w-8/12 small-phone:w-full border-x-2 border-b-2 border-[#132C33] bg-opacity-70 rounded-b-2xl p-4 bg-[#D8E3E7]">
                  <p className="big-phone:text-3xl small-phone:text-2xl text-center mb-8 text-[#126E82]">
                    THÔNG SỐ KỸ THUẬT
                  </p>
                  <div
                    className={
                      open1
                        ? "specifications h-full transition-height ease-linear duration-300 big-phone:px-12"
                        : "specifications h-96 overflow-hidden transition-height ease-linear duration-300 big-phone:px-12"
                    }
                    dangerouslySetInnerHTML={{
                      __html: product?.specifications,
                    }}
                  ></div>
                  <div className="flex justify-center items-center">
                    <button
                      className={
                        open1
                          ? "button tablet:w-3/12 small-phone:w-6/12 hidden"
                          : "button tablet:w-3/12 small-phone:w-6/12 block my-4"
                      }
                      onClick={handleClick1}
                    >
                      Xem thêm
                    </button>
                    <button
                      className={
                        open1
                          ? "button tablet:w-3/12 small-phone:w-6/12 block my-4"
                          : "button tablet:w-3/12 small-phone:w-6/12 hidden"
                      }
                      onClick={handleClick1}
                    >
                      Thu gọn
                    </button>
                  </div>
                </div>
              </TabPanel>

              {/* Review Tab */}
              <TabPanel value={value} index={2}>
                <div className="my-8 grid big-tablet:grid-cols-2 small-phone:grid-cols-1 gap-8">
                  <div className="container mx-auto bg-[#132C33] p-4 big-tablet:col-span-1 rounded-lg shadow-sm">
                    <p className="text-2xl text-white text-center">
                      Viết nhận xét
                    </p>
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
                          <div className="flex flex-col ">
                            <label htmlFor="comment">
                              <strong className="text-white">
                                Bình luận của bạn
                              </strong>
                            </label>
                            <textarea
                              className="h-72"
                              id="comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <div></div>
                            <div className="text-center">
                              <button
                                variant="contained"
                                className="button text-black bg-[#D8E3E7]"
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
                        Vui lòng <Link to="/login">Đăng nhập</Link> để nhận xét
                      </h2>
                    )}
                  </div>
                  <div className="big-tablet:col-span-1 bg-[#132C33] p-4 shadow-sm rounded-lg">
                    <div className="p-2 bg-[#D8E3E7] rounded-lg">
                      <p>Bình luận ({product.reviews.length})</p>
                    </div>
                    <div className="p-2 bg-[#D8E3E7] my-4 big-phone:h-128 small-phone:h-180 rounded-lg">
                      {product.reviews.length === 0 ? (
                        <p>Chưa có đánh giá</p>
                      ) : (
                        <div className="flex flex-col justify-around">
                          <div className="flex big-phone:flex-row small-phone:flex-col">
                            <div className="flex flex-col big-desktop:w-5/12 big-tablet:w-4/12 big-phone:w-4/12  text-center justify-center">
                              <p className="laptop:text-6xl big-tablet:text-4xl big-phone:text-5xl small-phone:text-6xl">
                                {product.rating.toFixed(1)}
                              </p>
                              <Rating
                                rating={product.rating.toFixed(2)}
                                caption="Đã đánh giá "
                              >
                                {product.rating.toFixed(2)}
                              </Rating>
                              <p className="laptop:text-base big-phone:text-sm">
                                Điểm trung bình
                              </p>
                            </div>
                            <div className="h-full big-desktop:w-7/12 big-phone:w-8/12 p-4 small-phone:w-full flex flex-row big-phone:justify-center items-center">
                              <div className="flex flex-col desktop:w-8/12 big-tablet:w-5/12 small-phone:w-6/12">
                                <div className="big-phone:w-full bg-gray-200 rounded-full h-2.5 dark:bg-[#132C33] shadow-sm">
                                  <div
                                    className="bg-[#51C4D3] h-2.5 rounded-full"
                                    style={{
                                      width: `${
                                        (product.reviews.filter(
                                          (review) => review.rating === 5
                                        ).length /
                                          product.reviews.length) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <Rating rating={5} caption="Đã đánh giá ">
                                  {5}
                                </Rating>
                                <div className="big-phone:w-full bg-gray-200 rounded-full h-2.5 dark:bg-[#132C33] shadow-sm">
                                  <div
                                    className="bg-[#51C4D3] h-2.5 rounded-full"
                                    style={{
                                      width: `${
                                        (product.reviews.filter(
                                          (review) => review.rating === 4
                                        ).length /
                                          product.reviews.length) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <Rating rating={4} caption="Đã đánh giá ">
                                  {4}
                                </Rating>
                                <div className="big-phone:w-full bg-gray-200 rounded-full h-2.5 dark:bg-[#132C33] shadow-sm">
                                  <div
                                    className="bg-[#51C4D3] h-2.5 rounded-full"
                                    style={{
                                      width: `${
                                        (product.reviews.filter(
                                          (review) => review.rating === 3
                                        ).length /
                                          product.reviews.length) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <Rating rating={3} caption="Đã đánh giá ">
                                  {3}
                                </Rating>
                                <div className="big-phone:w-full bg-gray-200 rounded-full h-2.5 dark:bg-[#132C33] shadow-sm">
                                  <div
                                    className="bg-[#51C4D3] h-2.5 rounded-full"
                                    style={{
                                      width: `${
                                        (product.reviews.filter(
                                          (review) => review.rating === 2
                                        ).length /
                                          product.reviews.length) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <Rating rating={2} caption="Đã đánh giá ">
                                  {2}
                                </Rating>
                                <div className="big-phone:w-full bg-gray-200 rounded-full h-2.5 dark:bg-[#132C33] shadow-sm">
                                  <div
                                    className="bg-[#51C4D3] h-2.5 rounded-full"
                                    style={{
                                      width: `${
                                        (product.reviews.filter(
                                          (review) => review.rating === 1
                                        ).length /
                                          product.reviews.length) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <Rating rating={1} caption="Đã đánh giá ">
                                  {1}
                                </Rating>
                              </div>
                              <div className="flex flex-col desktop:w-4/12 big-tablet:w-7/12 small-phone:w-6/12 laptop:text-base big-tablet:text-sm tablet:text-base big-phone:text-sm">
                                <div className="my-1 ml-2">
                                  (
                                  {
                                    product.reviews.filter(
                                      (review) => review.rating === 5
                                    ).length
                                  }{" "}
                                  đánh giá )
                                </div>
                                <div className="my-1 ml-2">
                                  (
                                  {
                                    product.reviews.filter(
                                      (review) => review.rating === 4
                                    ).length
                                  }{" "}
                                  đánh giá )
                                </div>
                                <div className="my-1 ml-2">
                                  (
                                  {
                                    product.reviews.filter(
                                      (review) => review.rating === 3
                                    ).length
                                  }{" "}
                                  đánh giá )
                                </div>
                                <div className="my-1 ml-2">
                                  (
                                  {
                                    product.reviews.filter(
                                      (review) => review.rating === 2
                                    ).length
                                  }{" "}
                                  đánh giá )
                                </div>
                                <div className="my-1 ml-2">
                                  (
                                  {
                                    product.reviews.filter(
                                      (review) => review.rating === 1
                                    ).length
                                  }{" "}
                                  đánh giá )
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="max-h-180">
                            <ul className="overflow-y-auto max-h-64 big-phone:p-4 small-phone:py-2 small-phone:pl-2 border-teal-900 border-x-2 border-t-2">
                              {product.reviews.map((review) => (
                                <li
                                  key={review._id}
                                  className="my-8 border-teal-900 border-b-2 p-4"
                                >
                                  <div className="flex laptop:flex-row big-tablet:flex-col big-phone:justify-between big-phone:flex-row small-phone:flex-col mb-4">
                                    <p className="laptop:text-lg big-tablet:text-base">
                                      Tên khách hàng: {review.name}
                                    </p>
                                    <p className="text-sm">
                                      Ngày:{" "}
                                      {review.date
                                        .slice(0, 10)
                                        .toString()
                                        .split("-")
                                        .reverse()
                                        .join("-")}{" "}
                                    </p>
                                  </div>

                                  <div className="p-4 bg-slate-300">
                                    <div className="flex flex-row">
                                      <p>Đánh giá</p>&nbsp;
                                      <Rating
                                        rating={review.rating}
                                        caption="Đã đánh giá"
                                      >
                                        {review.rating}
                                      </Rating>
                                    </div>
                                    <p>Nội dung: {review.comment}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Box>

            {/* List of similar products */}
            <div>
              <p className="neon__text">Sản phẩm tương tự</p>
              {similarProducts.length > 2 ? (
                <div className="bg-watched flex justify-center items-center flex-wrap big-tablet:w-full small-phone:w-full big-phone:mx-auto big-phone:container">
                  <Swiper
                    watchSlidesProgress={true}
                    slidesPerView={5}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    breakpoints={{
                      320: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                      },
                      1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                      },
                    }}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    modules={[
                      Autoplay,
                      Pagination,
                      Navigation,
                      EffectCoverflow,
                    ]}
                    className="shadow-sm outline-0 bg-[#D8E3E7] bg-opacity-10"
                  >
                    {similarProducts.map((product) => (
                      <SwiperSlide key={product.id}>{product}</SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : similarProducts.length <= 2 && similarProducts.length > 1 ? (
                <Swiper
                  watchSlidesProgress={true}
                  slidesPerView={5}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={true}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="shadow-sm outline-0 bg-[#D8E3E7] bg-opacity-70"
                >
                  {similarProducts.map((product) => (
                    <SwiperSlide key={product.id}>{product}</SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="flex justify-center items-center flex-wrap big-tablet:w-full small-phone:w-full big-phone:mx-auto big-phone:container">
                  <p>Chưa có sản phẩm tương tự</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Product;
