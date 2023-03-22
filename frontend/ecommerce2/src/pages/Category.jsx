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
import Select from "react-select";
import Pagination from "@mui/material/Pagination";
import FilterPrice from "../components/FilterPrice";
import { AppContext } from "../context/AppContext";
import FilterPriceResponsive from "../components/FilterPriceResponsive";
import categories from "../categories";

function Category() {
  const { category } = useParams();
  const {
    value,
    page,
    changeIndex,
    gender,
    resetPage,
    sortPrice,
    sortAlphabet,
    products,
    loading,
    setLoading,
  } = useContext(AppContext);

  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, [dispatch]);

  // Replace "-" of category's name
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

  const [searchTerm, setSearchTerm] = useState("");

  // Search products search list
  const productsSearch = products.filter(
    (product) =>
      product.category === categoryName?.name &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Remove duplicate element in product brand's array
  const set = new Set(productsSearch.map((product) => product.brand));
  const arrayValues = [...set];

  // Create new array of product's brand
  const array = [];
  arrayValues.forEach(function (v, i) {
    let obj = {};
    obj.value = v;
    obj.label = arrayValues[i];
    array.push(obj);
  });

  // Options array
  const [options, setOptions] = useState([...array]);
  const optionsArray = options.map((s) => s.value);

  // List of search products (first page)
  const listProductSearchFirstPage = productsSearch
    .filter(
      (filteredProduct) =>
        filteredProduct.category === categoryName?.name &&
        value[0] / 24000 <= filteredProduct.price &&
        filteredProduct.price <= value[1] / 24000 &&
        optionsArray.includes(filteredProduct.brand)
    )
    .slice(0, 8);

  // List of search products (others page)
  const listProductSearch = productsSearch.filter(
    (filteredProduct) =>
      filteredProduct.category === categoryName?.name &&
      value[0] / 24000 <= filteredProduct.price &&
      filteredProduct.price <= value[1] / 24000 &&
      optionsArray.includes(filteredProduct.brand)
  );

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  // Handle options
  const handleChange = (selectedOption) => {
    setOptions(selectedOption);
    if (
      productsSearch.filter(
        (filteredProduct) =>
          value[0] / 24000 <= filteredProduct.price &&
          filteredProduct.price <= value[1] / 24000 &&
          filteredProduct.category === categoryName?.name &&
          optionsArray.includes(filteredProduct.brand)
      ).length <= 9
    ) {
      resetPage();
    }
  };

  useEffect(() => {
    setLoading(true);
    setOptions([...array]);
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
            <p className="text-center font-bold text-4xl my-2">
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
            <div className="w-full bg-[#132C33] col-span-1 rounded-lg shadow-sm max-h-max laptop:block galaxy-fold:hidden">
              <FilterPrice />

              {/* List of search products length */}
              {listProductSearch.length > 0 ? (
                <p className="mt-4 text-2xl text-white text-center px-4 py-8">
                  Có {listProductSearch.length} sản phẩm
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
                    {/* Not Found Any Product */}
                    {productsSearch.length === 0 ? (
                      <p>Không tìm thấy sản phẩm phù hợp</p>
                    ) : (
                      // Find products
                      <div className="rounded-lg shadow-sm bg-product py-4">
                        <Select
                          defaultValue={[...array]}
                          isMulti
                          name="colors"
                          options={array}
                          className="basic-multi-select mx-4"
                          classNamePrefix="select"
                          onChange={handleChange}
                        />
                        <div className="p-4 grid gap-4 my-4 big-tablet:grid-cols-4 small-phone:grid-cols-2 galaxy-fold:grid-cols-1 max-h-max">
                          <>
                            {page === 1 ? (
                              <>
                                {/* Filter price by newest (default) */}
                                {gender === "newest" ? (
                                  <>
                                    {listProductSearchFirstPage.map(
                                      (product) => (
                                        <ProductPreview
                                          {...product}
                                          key={product._id}
                                          product={product}
                                        />
                                      )
                                    )}
                                  </>
                                ) : gender === "oldest" ? (
                                  <>
                                    {/* Filter price by oldest */}
                                    {listProductSearch
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
                                    {/* Filter price by low to high */}
                                    {listProductSearchFirstPage
                                      .sort(sortPrice)
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
                                    {listProductSearchFirstPage
                                      .sort(sortPrice)
                                      .reverse()
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
                                    {listProductSearchFirstPage
                                      .sort(sortAlphabet)
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
                                    {listProductSearchFirstPage
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
                                ) : (
                                  <>
                                    {/* Filter price by default */}
                                    {listProductSearchFirstPage.map(
                                      (product) => (
                                        <ProductPreview
                                          {...product}
                                          key={product._id}
                                          product={product}
                                        />
                                      )
                                    )}
                                  </>
                                )}
                              </>
                            ) : //Not Found any products by filter price
                            productsSearch.filter(
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
                                    {/* Filter price by newest */}
                                    {listProductSearch
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
                                    {listProductSearch
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
                                    {/* Filter price by low to high */}
                                    {listProductSearch
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
                                    {listProductSearch
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
                                    {listProductSearch
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
                                    {listProductSearch
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
                                ) : (
                                  <>
                                    {/* Filter price by default */}
                                    {listProductSearch
                                      .slice(8 * (page - 1), 8 * page)
                                      .map((product) => (
                                        <ProductPreview
                                          {...product}
                                          key={product._id}
                                          product={product}
                                        />
                                      ))}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        </div>

                        {/* Pagination */}
                        <Stack spacing={2} className="p-4 rounded-lg">
                          <Pagination
                            count={Math.ceil(listProductSearch.length / 8)}
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
