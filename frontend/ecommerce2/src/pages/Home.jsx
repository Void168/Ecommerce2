import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { updateProducts } from "../features/productSlice";
import axios from "../axios";
import ProductPreview from "../components/ProductPreview";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Loading from "../components/Loading";
import Paginate from "../components/Paginate";
import ViewedProduct from "../components/ViewedProduct";
import FilterPrice from "../components/FilterPrice";
import FilterPriceResponsive from "../components/FilterPriceResponsive";
import Article from "../components/Article";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

// List image of carousel
const listBanner = [
  {
    url: "https://wallpaperaccess.com/full/187273.jpg",
  },
  {
    url: "https://cdn.mos.cms.futurecdn.net/RA4syq4sk3LBQjsHVNZV6n.jpg",
  },
  {
    url: "https://wallpapers.com/images/featured/w65hwkhmusntb0j9.jpg",
  },
  {
    url: "https://cdn.ytechb.com/wp-content/uploads/2021/11/iphone-wallpapers.webp",
  },
  {
    url: "https://i.pinimg.com/originals/f3/fb/06/f3fb063f571c640a3c362622a0838cb1.jpg",
  },
];

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pId, setPId] = useState([]);
  const {
    value,
    page,
    gender,
    sortPrice,
    sortAlphabet,
    products,
    articles,
    USD_VND_EXCHANGE_RATE,
    orders,
    setOrders,
    bestSeller,
  } = useContext(AppContext);

  // Get viewed products on local storage
  const viewedProducts = localStorage.getItem("viewed products");
  const list = JSON.parse(viewedProducts);

  // Filter remove null elements
  const listViewProduct = list?.filter((element) => element !== null);

  // Filter list of products by price
  const listProduct = products.filter(
    (filteredProduct) =>
      value[0] / USD_VND_EXCHANGE_RATE <= filteredProduct.price &&
      filteredProduct.price <= value[1] / USD_VND_EXCHANGE_RATE
  );

  // Filter duplicate products in list of products
  const uniqueArray = listViewProduct?.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      listViewProduct.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });

  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    axios
      .get("/orders")
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

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
    };
    idList();
  }, [orders]);

  let array = [];
  pId.forEach((x) => {
    array.push(x[0]);
    return x;
  });

  const occurrences = array.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});

  const object = Object.entries(occurrences);
  object.sort(function (a, b) {
    return b[1] - a[1];
  });

  let res = [];
  res.push(object);
  const sortBestSeller = res.map((x) => x.map((a) => a[0])).flat(1);
  bestSeller.push(sortBestSeller);

  const names = bestSeller[0]
    .slice(0, 8)
    .map((id) => products.find((el) => el._id === id));

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="big-phone:container big-phone:mx-auto w-full">
          <div className="grid big-phone:grid-cols-3 small-phone:grid-rows-1 p-4 w-full gap-1">
            <div className="grid big-phone:grid-rows-3 small-phone:grid-rows-4 gap-1 big-phone:col-span-2 small-phone:row-span-1">
              <div className="small-phone:row-span-2 p-3 h-full">
                {/* Carousel */}
                <Carousel>
                  {listBanner.map((item, i) => (
                    <Paper>
                      <img
                        src={item.url}
                        alt="banner"
                        className="max-h-fit desktop:h-200 laptop:h-128 big-tablet:h-96 tablet:h-72 big-phone:h-64 small-phone:h-72"
                      />
                    </Paper>
                  ))}
                </Carousel>
              </div>

              {/* Brand banner */}
              <div className="grid grid-cols-2 gap-1 small-phone:row-span-2 big-phone:row-span-1">
                <div className="card__zoom">
                  <div
                    alt="banner"
                    className="card__zoom--image bg-apple"
                    onClick={() => navigate("/tim-kiem/apple")}
                  />
                </div>
                <div className="card__zoom">
                  <div
                    alt="banner"
                    className="card__zoom--image bg-samsung"
                    onClick={() => navigate("/tim-kiem/samsung")}
                  />
                </div>
                <div className="card__zoom small-phone:block big-phone:hidden">
                  <div
                    alt="banner"
                    className="card__zoom--image bg-xiaomi"
                    onClick={() => navigate("/tim-kiem/xiaomi")}
                  />
                </div>
                <div className="card__zoom small-phone:block big-phone:hidden">
                  <div
                    alt="banner"
                    className="card__zoom--image bg-asus"
                    onClick={() => navigate("/tim-kiem/asus")}
                  />
                </div>
                <div className="card__zoom small-phone:block big-phone:hidden">
                  <div
                    alt="banner"
                    className="card__zoom--image bg-jbl"
                    onClick={() => navigate("/tim-kiem/jbl")}
                  />
                </div>
              </div>
            </div>
            <div className="grid big-phone:grid-rows-3 grid-cols-1 gap-1 big-phone:col-span-1 small-phone:w-0 small-phone:h-0 big-phone:w-full big-phone:h-full">
              <div className="card__zoom">
                <div
                  alt="banner"
                  className="card__zoom--image bg-xiaomi"
                  onClick={() => navigate("/tim-kiem/xiaomi")}
                />
              </div>
              <div className="card__zoom">
                <div
                  alt="banner"
                  className="card__zoom--image bg-asus"
                  onClick={() => navigate("/tim-kiem/asus")}
                />
              </div>
              <div className="card__zoom">
                <div
                  alt="banner"
                  className="card__zoom--image bg-jbl"
                  onClick={() => navigate("/tim-kiem/jbl")}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Promo */}
      <div className="grid-cols-4 big-phone:container big-phone:mx-auto my-4 small-phone:mx-4">
        <p className="neon__text">Tin công nghệ</p>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="grid laptop:grid-cols-4 big-phone:grid-cols-2 small-phone:grid-cols-1 max-h-max">
              {articles
                ?.slice(articles.length - 4, articles.length)
                .map((newArticle) => (
                  <Article
                    {...newArticle}
                    key={newArticle._id}
                    article={newArticle}
                    className="col-span-1"
                  />
                ))
                .reverse()}
            </div>
            <div className="text-center my-8">
              <Link
                to="/promo"
                className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-black bg-[#D8E3E7] border-2 border-[#132C33] rounded-lg hover:text-white group hover:bg-gray-50"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-[#132c33] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-200 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative">Xem thêm</span>
              </Link>
            </div>
          </>
        )}
      </div>
      {/* Best Seller */}
      <div className="big-phone:container big-phone:mx-auto small-phone:mx-4">
        <p className="neon__text">Sản phẩm bán chạy</p>
        {loading ? (
          <div className="flex justify-center items-center text-center max-h-96">
            <Loading />
          </div>
        ) : (
          <div className="bg-watched px-4 py-8 my-8 small-phone:grid-cols-2 galaxy-fold:grid-cols-1 rounded-lg shadow-sm">
            <Swiper
              watchSlidesProgress={true}
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
              navigation={true}
              grabCursor={true}
              spaceBetween={30}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
              className="shadow-sm outline-0"
            >
              {names.map((bestSeller, index) => (
                <SwiperSlide>
                  <ViewedProduct
                    {...bestSeller}
                    key={index}
                    product={bestSeller}
                    className="min-h-max"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
      {/* Main home page */}
      <div className="big-phone:container big-phone:mx-auto small-phone:mx-4">
        <p className="neon__text">Sản phẩm nổi bật</p>
        <div className=" grid grid-flow-row-dense big-tablet:grid-cols-4 my-8">
          <div className="w-full bg-[#132C33] col-span-1 rounded-lg shadow-sm max-h-max laptop:block galaxy-fold:hidden">
            <FilterPrice />

            {/* Length of product after filter or sort */}
            <p className="text-white px-4 my-8  big-desktop:text-2xl desktop:text-xl text-center">
              Có{" "}
              {
                products.filter(
                  (filteredProduct) =>
                    value[0] / USD_VND_EXCHANGE_RATE <= filteredProduct.price &&
                    filteredProduct.price <= value[1] / USD_VND_EXCHANGE_RATE
                ).length
              }{" "}
              sản phẩm
            </p>
          </div>

          <div className="laptop:col-span-3 galaxy-fold:col-span-4 laptop:pl-4">
            <div className="big-phone:container mx-auto">
              <div className="fixed z-20 left-2 galaxy-fold:bottom-24 galaxy-fold:block laptop:hidden">
                <FilterPriceResponsive />
              </div>
              <div className="bg-product p-4 rounded-lg shadow-sm">
                <div className="grid gap-4 my-4 big-tablet:grid-cols-4 small-phone:grid-cols-2 galaxy-fold:grid-cols-1">
                  {loading ? (
                    <div className=" col-span-4 relative h-screen flex justify-center items-center text-center w-full">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      {page === 1 ? (
                        <>
                          {/* Filter price by newest (default) */}
                          {gender === "newest" ? (
                            <>
                              {listProduct.slice(0, 8).map((product, index) => (
                                <ProductPreview
                                  {...product}
                                  data-value={index}
                                  key={product._id}
                                />
                              ))}
                            </>
                          ) : gender === "oldest" ? (
                            <>
                              {/* Filter price by oldest */}
                              {listProduct
                                .slice(products.length - 8, products.length)
                                .map((product) => (
                                  <ProductPreview
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))
                                .reverse()}
                            </>
                          ) : gender === "lowtohigh" ? (
                            <>
                              {/* Filter price by low to high */}
                              {listProduct
                                .sort(sortPrice)
                                .slice(0, 8)
                                .map((product) => (
                                  <ProductPreview
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "hightolow" ? (
                            <>
                              {/* Filter price by high to low */}
                              {listProduct
                                .sort(sortPrice)
                                .reverse()
                                .slice(0, 8)
                                .map((product) => (
                                  <ProductPreview
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "atoz" ? (
                            <>
                              {/* Filter price by A to Z */}
                              {listProduct
                                .sort(sortAlphabet)
                                .slice(0, 8)
                                .map((product) => (
                                  <ProductPreview
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "ztoa" ? (
                            <>
                              {/* Filter price by Z to A */}
                              {listProduct
                                .slice(0, 8)
                                .sort(sortAlphabet)
                                .reverse()
                                .map((product) => (
                                  <ProductPreview
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : null}
                        </>
                      ) : listProduct.length === 0 ? (
                        <div>Bạn hãy điều chỉnh lại giá nhé</div>
                      ) : (
                        <>
                          {gender === "newest" ? (
                            <>
                              {/* Filter price by newest */}
                              {listProduct
                                .slice(8 * (page - 1), 8 * page)
                                .map((product) => (
                                  <ProductPreview
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "oldest" ? (
                            <>
                              {/* Filter price by oldest */}
                              {listProduct
                                .slice(
                                  8 * (Math.round(products.length / 8) - page),
                                  8 *
                                    (Math.round(products.length / 8) - page + 1)
                                )
                                .map((product) => (
                                  <ProductPreview
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))
                                .reverse()}
                            </>
                          ) : gender === "lowtohigh" ? (
                            <>
                              {/* Filter price by low to high */}
                              {listProduct
                                .sort(sortPrice)
                                .slice(8 * (page - 1), 8 * page)
                                .map((product) => (
                                  <ProductPreview
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "hightolow" ? (
                            <>
                              {/* Filter price by high to low */}
                              {listProduct
                                .sort(sortPrice)
                                .reverse()
                                .slice(8 * (page - 1), 8 * page)
                                .map((product) => (
                                  <ProductPreview
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "atoz" ? (
                            <>
                              {/* Filter price by A to Z */}
                              {listProduct
                                .sort(sortAlphabet)
                                .slice(8 * (page - 1), 8 * page)
                                .map((product) => (
                                  <ProductPreview
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "ztoa" ? (
                            <>
                              {/* Filter price by Z to A */}
                              {listProduct
                                .sort(sortAlphabet)
                                .reverse()
                                .slice(8 * (page - 1), 8 * page)
                                .map((product) => (
                                  <ProductPreview
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : null}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              {/* Pagination */}
              <div className="w-full bg-[#D8E3E7] flex justify-center mt-2 shadow-sm rounded-lg">
                <div className="text-sm">
                  <Paginate />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* last products */}
      <div className="big-phone:container big-phone:mx-auto small-phone:mx-4">
        <p className="neon__text">Sản phẩm đã xem</p>
        {loading ? (
          <div className="flex justify-center items-center text-center max-h-96">
            <Loading />
          </div>
        ) : (
          <div className="bg-watched px-4 py-8 my-8 small-phone:grid-cols-2 galaxy-fold:grid-cols-1 rounded-lg shadow-sm">
            {uniqueArray?.length > 0 ? (
              <Swiper
                watchSlidesProgress={true}
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
                navigation={true}
                grabCursor={true}
                spaceBetween={30}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
                className="shadow-sm outline-0"
              >
                {uniqueArray?.slice(0, 8).map((lastProduct, index) => (
                  <SwiperSlide>
                    <ViewedProduct
                      {...lastProduct}
                      key={index}
                      product={lastProduct}
                      className="min-h-max"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="text-white text-center">
                Bạn chưa xem sản phẩm nào hoặc đã đăng xuất khỏi tài khoản trước
                đó
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
