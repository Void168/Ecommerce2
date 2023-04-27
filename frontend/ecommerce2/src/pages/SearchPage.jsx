import { Pagination, Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SearchProducts from "../components/SearchProducts";
import { AppContext } from "../context/AppContext";
import Select from "react-select";
import FilterPrice from "../components/FilterPrice";
import FilterPriceResponsive from "../components/FilterPriceResponsive";

function SearchPage() {
  const {
    page,
    gender,
    changeIndex,
    value,
    resetPage,
    convert,
    sortPrice,
    sortAlphabet,
    products,
    loading,
    setLoading,
    USD_VND_EXCHANGE_RATE,
  } = useContext(AppContext);

  const { searchName } = useParams();

  // convert vietnamese name to english
  const convertSearchName = convert(searchName.replace(/\s/g, "").replace(/-/g, ""));

  // Search product list
  const productsSearch = products.filter(
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
        .includes(convertSearchName) ||
      filteredProduct.category
        .toLocaleLowerCase()
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        .replace(/ì|í|ị|ỉ|ĩ/g, "i")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        .replace(/đ/g, "d")
        .replace(/\s/g, "")
        .includes(convertSearchName) ||
      convertSearchName
        .toLocaleLowerCase()
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        .replace(/ì|í|ị|ỉ|ĩ/g, "i")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        .replace(/đ/g, "d")
        .replace(/\s/g, "")
        .replaceAll("-", "")
        .includes(filteredProduct.category.toLocaleLowerCase()) ||
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
        .includes(convertSearchName)
  );

  // List of categories
  const listCategories = productsSearch.map((product) => product.category);

  // Remove duplicate elements
  const set = new Set(listCategories);
  const arrayValues = [...set];

  // Create array of selected options
  const array = [];
  arrayValues.forEach(function (v, i) {
    let obj = {};
    obj.value = v;
    obj.label = arrayValues[i];
    array.push(obj);
  });

  const [options, setOptions] = useState([...array]);
  useEffect(() => {
    setLoading(true);
    setOptions([...array]);
    resetPage();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [searchName]);

  // Get value when change options
  const optionsArray = options.map((s) => s.value);
  const handleChange = (selectedOption) => {
    setOptions(selectedOption);
    if (
      productsSearch.filter(
        (filteredProduct) =>
          value[0] / USD_VND_EXCHANGE_RATE <= filteredProduct.price &&
          filteredProduct.price <= value[1] / USD_VND_EXCHANGE_RATE &&
          optionsArray.includes(filteredProduct.category)
      ).length <= 9
    ) {
      resetPage();
    }
  };

  // Search products list when change options
  const searchList = productsSearch.filter((filteredProduct) =>
    optionsArray.includes(filteredProduct.category)
  );

  return (
    <div className="big-phone:container big-phone:mx-auto">
      <div className="big-phone:container big-phone:mx-auto grid grid-flow-row-dense grid-cols-4 my-8">
        <div className="w-full bg-[#132C33] col-span-1 rounded-lg shadow-sm max-h-max laptop:block galaxy-fold:hidden">
          <FilterPrice />

          {/* List of search products length */}
          {searchList.length > 0 ? (
            <p className="mt-4 text-2xl text-white text-center px-4 py-8">
              Có {searchList.length} sản phẩm
            </p>
          ) : null}
        </div>
        <div className="big-phone:container big-phone:mx-auto laptop:col-span-3 galaxy-fold:col-span-4 px-4">
          <div className="fixed z-20 big-tablet:bottom-5 left-2 galaxy-fold:bottom-24 galaxy-fold:block laptop:hidden">
            <FilterPriceResponsive />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div>
              {/* Search products list length */}
              {productsSearch.length === 0 &&
              optionsArray.includes(listCategories) ? (
                <div className="h-screen">
                  <p>
                    Hãy tìm kiếm lại và chắc chắn là bạn nhập từ có nghĩa ^^
                  </p>
                </div>
              ) : (
                <>
                  <p>
                    Có {productsSearch.length} kết quả cho{" "}
                    {searchName.replaceAll("-", " ")}
                  </p>

                  {/* Options list */}
                  <Select
                    defaultValue={[...array]}
                    isMulti
                    name="colors"
                    options={array}
                    className="basic-multi-select mx-4"
                    classNamePrefix="select"
                    onChange={handleChange}
                  />

                  {/* Search products list */}
                  <div className="grid gap-4 my-4 big-tablet:grid-cols-4 small-phone:grid-cols-2 galaxy-fold:grid-cols-1 bg-product p-4 shadow-sm rounded-lg">
                    <>
                      {page === 1 ? (
                        <>
                          {/* Filter price by newest (default) */}
                          {gender === "newest" ? (
                            <>
                              {searchList.slice(0, 8).map((product) => (
                                <SearchProducts
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))}
                            </>
                          ) : gender === "oldest" ? (
                            <>
                              {/* Filter price by oldest */}
                              {searchList
                                .slice(
                                  productsSearch.length - 8,
                                  productsSearch.length
                                )
                                .map((product) => (
                                  <SearchProducts
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
                              {searchList
                                .slice(0, 8)
                                .sort(sortPrice)
                                .map((product) => (
                                  <SearchProducts
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "hightolow" ? (
                            <>
                              {/* Filter price by high to low */}
                              {searchList
                                .sort(sortPrice)
                                .slice(0, 8)
                                .reverse()
                                .map((product) => (
                                  <SearchProducts
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "atoz" ? (
                            <>
                              {/* Filter price by A to Z */}
                              {searchList
                                .slice(0, 8)
                                .sort(sortAlphabet)
                                .map((product) => (
                                  <SearchProducts
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "ztoa" ? (
                            <>
                              {/* Filter price by Z to A */}
                              {searchList
                                .slice(0, 8)
                                .sort(sortAlphabet)
                                .reverse()
                                .map((product) => (
                                  <SearchProducts
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : (
                            <>
                              {/* Filter price by default */}
                              {searchList.slice(0, 8).map((product) => (
                                <SearchProducts
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))}
                            </>
                          )}
                        </>
                      ) : //Not Found any products by filter price
                      productsSearch.filter(
                          (filteredProduct) =>
                            value[0] / USD_VND_EXCHANGE_RATE <=
                            filteredProduct.price <=
                            value[1] / USD_VND_EXCHANGE_RATE
                        ).length === 0 ? (
                        <div>Bạn hãy điều chỉnh lại giá nhé</div>
                      ) : (
                        <>
                          {gender === "newest" ? (
                            <>
                              {/* Filter price by newest */}
                              {searchList
                                .slice(8 * (page - 1), 8 * page)
                                .map((product) => (
                                  <SearchProducts
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "oldest" ? (
                            <>
                              {/* Filter price by oldest */}
                              {searchList
                                .slice(
                                  8 *
                                    (Math.round(productsSearch.length / 8) -
                                      page),
                                  8 *
                                    (Math.round(productsSearch.length / 8) -
                                      page +
                                      1)
                                )
                                .map((product) => (
                                  <SearchProducts
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
                              {searchList
                                .sort(sortPrice)
                                .slice(8 * (page - 1), 8 * page)
                                .map((product) => (
                                  <SearchProducts
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "hightolow" ? (
                            <>
                              {/* Filter price by high to low */}
                              {searchList
                                .sort(sortPrice)
                                .reverse()
                                .slice(8 * (page - 1), 8 * page)
                                .map((product) => (
                                  <SearchProducts
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "atoz" ? (
                            <>
                              {/* Filter price by A to Z */}
                              {searchList
                                .sort(sortAlphabet)
                                .slice(8 * (page - 1), 8 * page)
                                .map((product) => (
                                  <SearchProducts
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : gender === "ztoa" ? (
                            <>
                              {/* Filter price by Z to A */}
                              {searchList
                                .sort(sortAlphabet)
                                .reverse()
                                .slice(8 * (page - 1), 8 * page)
                                .map((product) => (
                                  <SearchProducts
                                    {...product}
                                    key={product._id}
                                    product={product}
                                  />
                                ))}
                            </>
                          ) : (
                            <>
                              {/* Filter price by default */}
                              {searchList
                                .slice(8 * (page - 1), 8 * page)
                                .map((product) => (
                                  <SearchProducts
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
                  <div className="w-full bg-[#D8E3E7] flex justify-center mt-2 shadow-sm rounded-lg">
                    <Stack spacing={2}>
                      <Pagination
                        count={Math.ceil(searchList.length / 8)}
                        color="primary"
                        onChange={changeIndex}
                      />
                    </Stack>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
