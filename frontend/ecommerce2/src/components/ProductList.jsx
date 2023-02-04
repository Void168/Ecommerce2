import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDeleteProductMutation } from '../services/appApi'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'

function ProductList() {
  const products = useSelector((state) => state.products)
  const user = useSelector((state) => state.user)
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation()
  const [page, setPage] = useState(1)

  const handleDeleteProduct = (id) => {
    if (window.confirm('Chắc chắn xóa sản phẩm này?')) {
      deleteProduct({ product_id: id, user_id: user._id })
    }
  }
  return (
    <div className="container mx-auto">
      <button className="bg-[#132C33]">
        <Link to="/new-product">Tạo sản phẩm mới</Link>
      </button>
      <table className="w-full my-4">
        <thead>
          <tr>
            <th></th>
            <th>ID sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Giá sản phẩm</th>
          </tr>
        </thead>
        <tbody>
          {page === 1 ? (
            <>
              {products.slice(0, 8).map((product) => (
                <tr key={product}>
                  <td>
                    <img
                      src={product.pictures[0].url}
                      alt="product-pic"
                      className="w-32 h-32 mx-auto"
                    />
                  </td>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <div className="flex flex-col">
                      <button
                        onClick={() =>
                          handleDeleteProduct(product._id, user._id)
                        }
                        disabled={isLoading}
                        className="bg-[#132C33]"
                      >
                        Xóa sản phẩm
                      </button>
                      <button className="bg-[#132C33] mt-6">
                        <Link to={`/product/${product._id}/edit`}>
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
              {products.slice(8 * (page - 1), 8 * page).map((product) => (
                <tr key={product}>
                  <td>
                    <img
                      src={product.pictures[0].url}
                      alt="product-pic"
                      className="w-32 h-32 mx-auto"
                    />
                  </td>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <div className="flex flex-col">
                      <button
                        onClick={() =>
                          handleDeleteProduct(product._id, user._id)
                        }
                        disabled={isLoading}
                        className="bg-[#132C33]"
                      >
                        Xóa sản phẩm
                      </button>
                      <button className="bg-[#132C33] mt-6">
                        <Link to={`/product/${product._id}/edit`}>
                          Chỉnh sửa
                        </Link>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <Stack spacing={2} className="p-1 rounded-lg">
        <Pagination
          count={Math.round(products.length / 8)}
          color="primary"
          onChange={(e, value) => setPage(value)}
        />
      </Stack>
    </div>
  )
}

export default ProductList
