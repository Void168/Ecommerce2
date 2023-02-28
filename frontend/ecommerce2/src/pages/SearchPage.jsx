import { Pagination, Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SearchProducts from "../components/SearchProducts";
import { AppContext } from "../context/AppContext";

function SearchPage() {
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const { page, changeIndex } = useContext(AppContext);
  const { searchName } = useParams();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const convertVietnamese = searchName
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    .replace(/ì|í|ị|ỉ|ĩ/g, "i")
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    .replace(/đ/g, "d")
    .replace(/\s/g, "")
    .replaceAll("-", "");

  return (
    <div className="big-phone:container big-phone:mx-auto">
      <div className="container mx-auto">
        {loading ? (
          <Loading />
        ) : (
          <div>
            {products.filter(
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
                  .includes(convertVietnamese) ||
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
                  .includes(convertVietnamese) ||
                convertVietnamese
                  .toLocaleLowerCase()
                  .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
                  .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                  .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                  .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
                  .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                  .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                  .replace(/đ/g, "d")
                  .replace(/\s/g, "")
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
                  .includes(convertVietnamese)
            ).length === 0 ? (
              <div className="h-screen">
                <p>Hãy tìm kiếm lại và chắc chắn là bạn nhập từ có nghĩa ^^</p>
              </div>
            ) : (
              <>
                <p>
                  Có{" "}
                  {
                    products.filter(
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
                          .includes(convertVietnamese) ||
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
                          .includes(convertVietnamese) ||
                        convertVietnamese
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
                          .includes(
                            filteredProduct.category.toLocaleLowerCase()
                          ) ||
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
                          .includes(convertVietnamese)
                    ).length
                  }{" "}
                  kết quả cho {searchName.replaceAll("-"," ")}
                </p>
                <div className="grid gap-4 my-4 big-tablet:grid-cols-4 small-phone:grid-cols-2 galaxy-fold:grid-cols-1 bg-[#132C33] p-4 shadow-sm rounded-lg">
                  {page === 1 ? (
                    <>
                      {products
                        .filter(
                          (filteredProduct) =>
                            filteredProduct.name
                              .toLocaleLowerCase()
                              .replace(
                                /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
                                "a"
                              )
                              .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                              .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                              .replace(
                                /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
                                "o"
                              )
                              .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                              .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                              .replace(/đ/g, "d")
                              .replace(/\s/g, "")
                              .includes(convertVietnamese) ||
                            filteredProduct.category
                              .toLocaleLowerCase()
                              .replace(
                                /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
                                "a"
                              )
                              .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                              .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                              .replace(
                                /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
                                "o"
                              )
                              .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                              .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                              .replace(/đ/g, "d")
                              .replace(/\s/g, "")
                              .includes(convertVietnamese) ||
                            convertVietnamese
                              .toLocaleLowerCase()
                              .replace(
                                /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
                                "a"
                              )
                              .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                              .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                              .replace(
                                /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
                                "o"
                              )
                              .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                              .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                              .replace(/đ/g, "d")
                              .replace(/\s/g, "")
                              .replaceAll("-", "")
                              .includes(
                                filteredProduct.category.toLocaleLowerCase()
                              ) ||
                            filteredProduct.brand
                              .toLocaleLowerCase()
                              .replace(
                                /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
                                "a"
                              )
                              .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                              .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                              .replace(
                                /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
                                "o"
                              )
                              .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                              .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                              .replace(/đ/g, "d")
                              .replace(/\s/g, "")
                              .includes(convertVietnamese)
                        )
                        .slice(0, 8)
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
                      {products
                        .filter(
                          (filteredProduct) =>
                            filteredProduct.name
                              .toLocaleLowerCase()
                              .replace(
                                /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
                                "a"
                              )
                              .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                              .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                              .replace(
                                /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
                                "o"
                              )
                              .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                              .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                              .replace(/đ/g, "d")
                              .replace(/\s/g, "")
                              .includes(convertVietnamese) ||
                            filteredProduct.category
                              .toLocaleLowerCase()
                              .replace(
                                /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
                                "a"
                              )
                              .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                              .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                              .replace(
                                /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
                                "o"
                              )
                              .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                              .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                              .replace(/đ/g, "d")
                              .replace(/\s/g, "")
                              .includes(convertVietnamese) ||
                            convertVietnamese
                              .toLocaleLowerCase()
                              .replace(
                                /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
                                "a"
                              )
                              .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                              .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                              .replace(
                                /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
                                "o"
                              )
                              .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                              .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                              .replace(/đ/g, "d")
                              .replace(/\s/g, "")
                              .replaceAll("-", "")
                              .includes(
                                filteredProduct.category.toLocaleLowerCase()
                              ) ||
                            filteredProduct.brand
                              .toLocaleLowerCase()
                              .replace(
                                /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
                                "a"
                              )
                              .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                              .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                              .replace(
                                /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
                                "o"
                              )
                              .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                              .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                              .replace(/đ/g, "d")
                              .replace(/\s/g, "")
                              .includes(convertVietnamese)
                        )
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
                <Stack spacing={2} className="p-4 rounded-lg">
                  <Pagination
                    count={Math.ceil(
                      products.filter(
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
                            .includes(convertVietnamese) ||
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
                            .includes(convertVietnamese) ||
                          convertVietnamese
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
                            .includes(
                              filteredProduct.category.toLocaleLowerCase()
                            ) ||
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
                            .includes(convertVietnamese)
                      ).length / 8
                    )}
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
