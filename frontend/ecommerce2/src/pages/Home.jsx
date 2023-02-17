import React, {useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { updateProducts } from "../features/productSlice";
import axios from "../axios";
import ProductPreview from "../components/ProductPreview";
import Loading from "../components/Loading";
import Paginate from "../components/Paginate";
import WatchedProduct from "../components/WatchedProduct";
import FilterPrice from "../components/FilterPrice";
import FilterPriceResponsive from "../components/FilterPriceResponsive";
import Article from "../components/Article";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const articles = useSelector((state) => state.articles);
  const lastProducts = products.slice(0, 8);
  const [loading, setLoading] = useState(false);
  const { value, page, gender, sortPrice, sortAlphabet } =
    useContext(AppContext);
  
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
        <img
          src="https://wallpapers.com/images/featured/oculus-quest-2-ra1bss24xaa87lrh.jpg"
          alt="banner"
          className="w-full big-phone:h-96 laptop:h-full galaxy:h-full"
        />
      )}
      {/* Promo */}
      <p className="neon__text">
        Tin công nghệ
      </p>
      <div className="grid-cols-4 big-phone:container big-phone:mx-auto my-4">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="grid tablet:grid-cols-3 big-phone:grid-cols-2 small-phone:grid-cols-1 max-h-max bg-promo rounded-lg shadow-sm">
              {page === 1 ? (
                <>
                  {articles.slice(0, 6).map((newArticle) => (
                    <Article
                      {...newArticle}
                      key={newArticle._id}
                      article={newArticle}
                      className="col-span-1"
                    />
                  ))}
                </>
              ) : (
                <>
                  {articles
                    .slice(6 * (page - 1), 6 * page)
                    .map((newArticle) => (
                      <Article
                        {...newArticle}
                        key={newArticle._id}
                        article={newArticle}
                        className="col-span-1"
                      />
                    ))}
                </>
              )}
            </div>
            <div className="text-center my-8">
              <Link to="/promo">
                <button>Xem thêm</button>
              </Link>
            </div>
          </>
        )}
      </div>
      <p className="neon__text">
        Sản phẩm nổi bật
      </p>
      <div className="big-phone:container big-phone:mx-auto grid grid-flow-row-dense big-tablet:grid-cols-4 my-8">
        <div className="w-full bg-[#126E82] col-span-1 rounded-lg shadow-sm max-h-max laptop:block galaxy-fold:hidden">
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
            <div className="bg-[#126E82] p-4 rounded-lg shadow-sm">
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
      <p className="neon__text">
        Sản phẩm đã xem
      </p>
      <div className="container mx-auto">
        <div className="grid laptop:grid-cols-8 gap-4 bg-[#126E82] px-4 py-8 my-8 tablet:grid-cols-4 small-phone:grid-cols-2 galaxy-fold:grid-cols-1 rounded-lg shadow-sm">
          {loading ? (
            <Loading />
          ) : (
            <>
              {lastProducts?.map((lastProduct) => (
                <WatchedProduct
                  {...lastProduct}
                  key={lastProduct._id}
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
