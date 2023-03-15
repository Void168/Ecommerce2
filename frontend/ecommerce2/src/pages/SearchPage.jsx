import { Pagination, Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SearchProducts from "../components/SearchProducts";
import { AppContext } from "../context/AppContext";
import Select from "react-select";

function SearchPage() {
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const { page, changeIndex, value, resetPage, convert } =
    useContext(AppContext);
  const { searchName } = useParams();

  // convert vietnamese name to english
  const convertSearchName = convert(searchName.replace(/\s/g, ""));

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
          value[0] / 24000 <= filteredProduct.price &&
          filteredProduct.price <= value[1] / 24000 &&
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
      <div className="big-phone:container big-phone:mx-auto">
        {loading ? (
          <Loading />
        ) : (
            <div>
              {/* Search products list length */}
            {productsSearch.length === 0 &&
            optionsArray.includes(listCategories) ? (
              <div className="h-screen">
                <p>Hãy tìm kiếm lại và chắc chắn là bạn nhập từ có nghĩa ^^</p>
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
                  {page === 1 ? (
                    <>
                      {searchList.slice(0, 8).map((product) => (
                        <SearchProducts
                          {...product}
                          key={product._id}
                          product={product}
                        />
                      ))}
                    </>
                  ) : (
                    <>
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
                    </div>
                    
                    {/* Pagination */}
                <Stack spacing={2} className="p-4 rounded-lg">
                  <Pagination
                    count={Math.ceil(searchList.length / 8)}
                    color="primary"
                    onChange={changeIndex}
                  />
                </Stack>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
