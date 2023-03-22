import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { AppContext } from "../context/AppContext";

function ProductList() {
  const { user, products, USD_VND_EXCHANGE_RATE } = useContext(AppContext);
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  const [page, setPage] = useState(1);

  // Handle delete product
  const handleDeleteProduct = (id) => {
    if (window.confirm("Chắc chắn xóa sản phẩm này?")) {
      deleteProduct({ product_id: id, user_id: user._id });
    }
  };
  return (
    <>
      <p className="big-phone:hidden small-phone:block">
        Vui lòng sử dụng thiết bị lớn hơn để quản lý
      </p>
      <div className="big-phone:container big-phone:mx-auto small-phone:m-0 big-phone:block small-phone:hidden">
        {/* Create product button*/}
        <button className="bg-[#132C33] button">
          <Link to="/new-product">Tạo sản phẩm mới</Link>
        </button>

        {/* Table list of products */}
        <div className="overflow-x-auto h-screen my-8">
          <table className="w-full my-4 table-fixed tablet:text-base small-phone:text-xs">
            <thead>
              <tr>
                <th className="big-tablet:block small-phone:hidden border-none"></th>
                <th>ID sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Giá sản phẩm</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* First page of pagination */}
              {page === 1 ? (
                <>
                  {products
                    .slice(products.length - 8, products.length)
                    .reverse()
                    .map((product) => (
                      <tr key={product}>
                        <td className="big-tablet:block small-phone:hidden border-none">
                          <img
                            src={product.pictures[0].url}
                            alt="product-pic"
                            className="w-32 h-32 mx-auto"
                          />
                        </td>
                        <td className="truncate">{product._id}</td>
                        <td className="truncate">{product.name}</td>
                        <td className="truncate">
                          {(
                            product.price * USD_VND_EXCHANGE_RATE
                          ).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td>
                          <div className="flex flex-col">
                            <button
                              onClick={() =>
                                handleDeleteProduct(product._id, user._id)
                              }
                              disabled={isLoading}
                              className="bg-[#132C33] button"
                            >
                              Xóa sản phẩm
                            </button>
                            <button className="bg-[#132C33] mt-6 button">
                              <Link to={`/san-pham/${product._id}/chinh-sua`}>
                                Chỉnh sửa
                              </Link>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </>
              ) : (
                <>
                  {/* Other page of pagination */}
                  {products
                    .slice(
                      8 * (Math.round(products.length / 8) - page),
                      8 * (Math.round(products.length / 8) - page + 1)
                    )
                    .map((product) => (
                      <tr key={product}>
                        <td>
                          <img
                            src={product.pictures[0].url}
                            alt="product-pic"
                            className="laptop:w-32 laptop:h-32 big-tablet:h-16 big-tablet:w-16 mx-auto"
                          />
                        </td>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>
                          <div className="flex flex-col">
                            {/* Delete product button */}
                            <button
                              onClick={() =>
                                handleDeleteProduct(product._id, user._id)
                              }
                              disabled={isLoading}
                              className="bg-[#132C33] button"
                            >
                              Xóa sản phẩm
                            </button>

                            {/* Edit product button */}
                            <Link to={`/product/${product._id}/edit`}>
                              <button className="bg-[#132C33] mt-6 button w-full">
                                Chỉnh sửa
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                    .reverse()}
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Stack
          spacing={2}
          className="p-1 rounded-lg big-phone:block small-phone:hidden"
        >
          <Pagination
            count={Math.round(products.length / 8)}
            color="primary"
            onChange={(e, value) => setPage(value)}
          />
        </Stack>
      </div>
    </>
  );
}

export default ProductList;
