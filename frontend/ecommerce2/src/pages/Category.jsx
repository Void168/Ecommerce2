import axios from "axios";
import React from "react";
import { useEffect, useContext } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import { updateProducts } from "../features/productSlice";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import FilterPrice from "../components/FilterPrice";
import { AppContext } from "../context/AppContext";
import FilterPriceResponsive from "../components/FilterPriceResponsive";
import categories from '../categories'

function Category() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const products = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const categoryName = categories.find(
    (cateName) =>
      cateName.name
        .toLocaleLowerCase()
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        .replace(/ì|í|ị|ỉ|ĩ/g, "i")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        .replace(/đ/g, "d")
        .replace(/\s/g, "") === category.replaceAll("-", "")
  );
  
  const {
    value,
    page,
    changeIndex,
    gender,
    resetPage,
    sortPrice,
    sortAlphabet,
  } = useContext(AppContext);

  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, [dispatch]);

  const productsSearch = products.filter(
    (product) =>
      product.category === categoryName?.name &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    resetPage();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [categoryName?.name]);

  return (
    <div className="container mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            <p className="text-center font-bold text-3xl my-2">
              {categoryName?.name}
            </p>
          </div>
          <div className="text-center">
            <input
              value={searchTerm}
              className="w-6/12 px-4"
              type="search"
              placeholder="Tìm kiếm"
              onChange={handleSearch}
            />
          </div>
          <div className="container mx-auto grid grid-flow-row-dense grid-cols-4 my-8">
            <div className="w-full bg-[#126E82] col-span-1 rounded-lg shadow-sm max-h-max laptop:block galaxy-fold:hidden">
              <FilterPrice />
              {productsSearch.filter(
                (filteredProduct) =>
                  value[0] / 24000 <= filteredProduct.price &&
                  filteredProduct.price <= value[1] / 24000 &&
                  filteredProduct.category === categoryName?.name
              ).length > 0 ? (
                <p className="text-white px-4 mt-8 text-2xl text-center">
                  Có{" "}
                  {
                    productsSearch.filter(
                      (filteredProduct) =>
                        value[0] / 24000 <= filteredProduct.price &&
                        filteredProduct.price <= value[1] / 24000 &&
                        filteredProduct.category === categoryName?.name
                    ).length
                  }{" "}
                  sản phẩm
                </p>
              ) : null}
            </div>
            <div className="container mx-auto laptop:col-span-3 galaxy-fold:col-span-4 px-4">
              <div className="fixed z-20 big-tablet:bottom-5 left-2 galaxy-fold:bottom-24 galaxy-fold:block laptop:hidden">
                <FilterPriceResponsive />
              </div>
              <div className="">
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    {productsSearch.length === 0 ? (
                      <p>Không tìm thấy sản phẩm phù hợp</p>
                    ) : (
                      <div className="rounded-lg shadow-sm bg-[#126E82] py-4">
                        <div className="p-4 grid gap-4 my-4 big-tablet:grid-cols-4 small-phone:grid-cols-2 galaxy-fold:grid-cols-1 max-h-max">
                          <>
                            {page === 1 ? (
                              <>
                                {gender === "newest" ? (
                                  <>
                                    {productsSearch
                                      .filter(
                                        (filteredProduct) =>
                                          filteredProduct.category ===
                                            categoryName?.name &&
                                          value[0] / 24000 <=
                                            filteredProduct.price &&
                                          filteredProduct.price <=
                                            value[1] / 24000
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
                                    {productsSearch
                                      .filter(
                                        (filteredProduct) =>
                                          filteredProduct.category ===
                                            categoryName?.name &&
                                          value[0] / 24000 <=
                                            filteredProduct.price &&
                                          filteredProduct.price <=
                                            value[1] / 24000
                                      )
                                      .slice(
                                        productsSearch.length - 8,
                                        productsSearch.length
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
                                    {productsSearch
                                      .filter(
                                        (filteredProduct) =>
                                          filteredProduct.category ===
                                            categoryName?.name &&
                                          value[0] / 24000 <=
                                            filteredProduct.price &&
                                          filteredProduct.price <=
                                            value[1] / 24000
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
                                    {productsSearch
                                      .filter(
                                        (filteredProduct) =>
                                          filteredProduct.category ===
                                            categoryName?.name &&
                                          value[0] / 24000 <=
                                            filteredProduct.price &&
                                          filteredProduct.price <=
                                            value[1] / 24000
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
                                    {productsSearch
                                      .filter(
                                        (filteredProduct) =>
                                          filteredProduct.category ===
                                            categoryName?.name &&
                                          value[0] / 24000 <=
                                            filteredProduct.price &&
                                          filteredProduct.price <=
                                            value[1] / 24000
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
                                    {productsSearch
                                      .filter(
                                        (filteredProduct) =>
                                          filteredProduct.category ===
                                            categoryName?.name &&
                                          value[0] / 24000 <=
                                            filteredProduct.price &&
                                          filteredProduct.price <=
                                            value[1] / 24000
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
                            ) : productsSearch.filter(
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
                                    {productsSearch
                                      .filter(
                                        (filteredProduct) =>
                                          filteredProduct.category ===
                                            categoryName?.name &&
                                          value[0] / 24000 <=
                                            filteredProduct.price &&
                                          filteredProduct.price <=
                                            value[1] / 24000
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
                                    {productsSearch
                                      .filter(
                                        (filteredProduct) =>
                                          filteredProduct.category ===
                                            categoryName?.name &&
                                          value[0] / 24000 <=
                                            filteredProduct.price &&
                                          filteredProduct.price <=
                                            value[1] / 24000
                                      )
                                      .slice(
                                        8 *
                                          (Math.round(
                                            productsSearch.length / 8
                                          ) -
                                            page),
                                        8 *
                                          (Math.round(
                                            productsSearch.length / 8
                                          ) -
                                            page +
                                            1)
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
                                    {productsSearch
                                      .filter(
                                        (filteredProduct) =>
                                          filteredProduct.category ===
                                            categoryName?.name &&
                                          value[0] / 24000 <=
                                            filteredProduct.price &&
                                          filteredProduct.price <=
                                            value[1] / 24000
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
                                    {productsSearch
                                      .filter(
                                        (filteredProduct) =>
                                          filteredProduct.category ===
                                            categoryName?.name &&
                                          value[0] / 24000 <=
                                            filteredProduct.price &&
                                          filteredProduct.price <=
                                            value[1] / 24000
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
                                    {productsSearch
                                      .filter(
                                        (filteredProduct) =>
                                          filteredProduct.category ===
                                            categoryName?.name &&
                                          value[0] / 24000 <=
                                            filteredProduct.price &&
                                          filteredProduct.price <=
                                            value[1] / 24000
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
                                    {productsSearch
                                      .filter(
                                        (filteredProduct) =>
                                          filteredProduct.category ===
                                            categoryName?.name &&
                                          value[0] / 24000 <=
                                            filteredProduct.price &&
                                          filteredProduct.price <=
                                            value[1] / 24000
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
                        </div>
                        <Stack spacing={2} className="p-4 rounded-lg">
                          <Pagination
                            count={Math.ceil(
                              productsSearch.filter(
                                (filteredProduct) =>
                                  filteredProduct.category === categoryName?.name &&
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000
                              ).length / 8
                            )}
                            color="primary"
                            onChange={changeIndex}
                          />
                        </Stack>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Category;
