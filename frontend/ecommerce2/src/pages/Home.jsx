import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { updateProducts } from "../features/productSlice";
import axios from "../axios";
import ProductPreview from "../components/ProductPreview";
import Loading from "../components/Loading";
import Paginate from "../components/Paginate";
import ViewedProduct from "../components/ViewedProduct";
import FilterPrice from "../components/FilterPrice";
import FilterPriceResponsive from "../components/FilterPriceResponsive";
import Article from "../components/Article";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { width } from "@mui/system";

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
  const products = useSelector((state) => state.products);
  const articles = useSelector((state) => state.articles);
  const [loading, setLoading] = useState(false);
  const { value, page, gender, sortPrice, sortAlphabet } =
    useContext(AppContext);
  const viewedProducts = localStorage.getItem("viewed products");
  const list = JSON.parse(viewedProducts);
  const listViewProduct = list?.filter((element) => element !== null);
  const set = new Set(listViewProduct);
  const viewedProduct = [...set];

  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="big-phone:container big-phone:mx-auto w-full">
          <div className="grid big-phone:grid-cols-3 small-phone:grid-rows-1 p-4 w-full gap-1">
            <div className="grid big-phone:grid-rows-3 small-phone:grid-rows-4 gap-1 big-phone:col-span-2 small-phone:row-span-1">
              <div className="small-phone:row-span-2 p-3 h-full">
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
              <div className="grid grid-cols-2 gap-1 small-phone:row-span-2 big-phone:row-span-1">
                <div className="card__zoom">
                  <div
                    alt="banner"
                    className="card__zoom--image bg-apple"
                    onClick={() => navigate("/search/apple")}
                  />
                </div>
                <div className="card__zoom">
                  <div
                    alt="banner"
                    className="card__zoom--image bg-samsung"
                    onClick={() => navigate("/search/samsung")}
                  />
                </div>
                <div className="card__zoom small-phone:block big-phone:hidden">
                  <div
                    alt="banner"
                    className="card__zoom--image bg-xiaomi"
                    onClick={() => navigate("/search/xiaomi")}
                  />
                </div>
                <div className="card__zoom small-phone:block big-phone:hidden">
                  <div
                    alt="banner"
                    className="card__zoom--image bg-asus"
                    onClick={() => navigate("/search/asus")}
                  />
                </div>
                <div className="card__zoom small-phone:block big-phone:hidden">
                  <div
                    alt="banner"
                    className="card__zoom--image bg-jbl"
                    onClick={() => navigate("/search/jbl")}
                  />
                </div>
              </div>
            </div>
            <div className="grid big-phone:grid-rows-3 grid-cols-1 gap-1 big-phone:col-span-1 small-phone:w-0 small-phone:h-0 big-phone:w-full big-phone:h-full">
              <div className="card__zoom">
                <div
                  alt="banner"
                  className="card__zoom--image bg-xiaomi"
                  onClick={() => navigate("/search/xiaomi")}
                />
              </div>
              <div className="card__zoom">
                <div
                  alt="banner"
                  className="card__zoom--image bg-asus"
                  onClick={() => navigate("/search/asus")}
                />
              </div>
              <div className="card__zoom">
                <div
                  alt="banner"
                  className="card__zoom--image bg-jbl"
                  onClick={() => navigate("/search/jbl")}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Promo */}
      <p className="neon__text">Tin công nghệ</p>
      <div className="grid-cols-4 big-phone:container big-phone:mx-auto my-4">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="grid tablet:grid-cols-3 big-phone:grid-cols-2 small-phone:grid-cols-1 max-h-max bg-promo rounded-lg shadow-sm">
              {articles?.slice(0, 3).map((newArticle) => (
                <Article
                  {...newArticle}
                  key={newArticle._id}
                  article={newArticle}
                  className="col-span-1"
                />
              ))}
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
      <p className="neon__text">Sản phẩm nổi bật</p>
      <div className="big-phone:container big-phone:mx-auto grid grid-flow-row-dense big-tablet:grid-cols-4 my-8">
        <div className="w-full bg-[#132C33] col-span-1 rounded-lg shadow-sm max-h-max laptop:block galaxy-fold:hidden">
          <FilterPrice />
          <p className="text-white px-4 my-8  big-desktop:text-2xl desktop:text-xl text-center">
            Có{" "}
            {
              products.filter(
                (filteredProduct) =>
                  value[0] / 24000 <= filteredProduct.price &&
                  filteredProduct.price <= value[1] / 24000
              ).length
            }{" "}
            sản phẩm
          </p>
        </div>

        <div className="laptop:col-span-3 galaxy-fold:col-span-4 px-4">
          <div className="big-phone:container mx-auto">
            <div className="fixed z-20 big-tablet:bottom-5 left-2 galaxy-fold:bottom-24 galaxy-fold:block laptop:hidden">
              <FilterPriceResponsive />
            </div>
            <div className="bg-[#132C33] p-4 rounded-lg shadow-sm">
              <div className="grid gap-4 my-4 big-tablet:grid-cols-4 small-phone:grid-cols-2 galaxy-fold:grid-cols-1">
                {loading ? (
                  <div className=" col-span-4 relative h-screen flex justify-center items-center text-center w-full">
                    <Loading />
                  </div>
                ) : (
                  <>
                    {page === 1 ? (
                      <>
                        {gender === "newest" ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000
                              )
                              .slice(0, 8)
                              .map((product, index) => (
                                <ProductPreview
                                  {...product}
                                  data-value={index}
                                  key={product._id}
                                />
                              ))}
                          </>
                        ) : gender === "oldest" ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000
                              )
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
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000
                              )
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
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000
                              )
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
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000
                              )
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
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000
                              )
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
                    ) : products.filter(
                        (filteredProduct) =>
                          value[0] / 24000 <=
                          filteredProduct.price <=
                          value[1] / 24000
                      ).length === 0 ? (
                      <div>Bạn hãy điều chỉnh lại giá nhé</div>
                    ) : (
                      <>
                        {gender === "newest" ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000
                              )
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
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000
                              )
                              .slice(
                                8 * (Math.round(products.length / 8) - page),
                                8 * (Math.round(products.length / 8) - page + 1)
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
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000
                              )
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
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000
                              )
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
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000
                              )
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
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000
                              )
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
              <div className="text-sm">
                <Paginate />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* last products */}
      <p className="neon__text">Sản phẩm đã xem</p>
      <div className="container mx-auto">
        <div className="grid laptop:grid-cols-8 gap-4 bg-[#132C33] px-4 py-8 my-8 tablet:grid-cols-4 small-phone:grid-cols-2 galaxy-fold:grid-cols-1 rounded-lg shadow-sm">
          {loading ? (
            <Loading />
          ) : (
            <>
              {viewedProduct?.slice(0, 8).map((lastProduct, index) => (
                <ViewedProduct
                  {...lastProduct}
                  key={index}
                  product={lastProduct}
                  className="min-h-max"
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
