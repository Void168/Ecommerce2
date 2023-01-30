import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDeleteProductMutation } from '../services/appApi'

function ProductList() {
  const products = useSelector((state) => state.products)
  const user = useSelector((state) => state.user)
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation()

  const handleDeleteProduct = (id) => {
    if (window.confirm('Chắc chắn xóa sản phẩm này?')) {
      deleteProduct({ product_id: id, user_id: user._id })
    }
  }
  return (
    <div className="container mx-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th></th>
            <th>ID sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Giá sản phẩm</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
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
                    onClick={() => handleDeleteProduct(product._id, user._id)}
                    disabled={isLoading}
                    className="bg-[#132C33]"
                  >
                    Xóa sản phẩm
                  </button>
                  <button className="bg-[#132C33] mt-6">
                    <Link to={`/product/${product._id}/edit`}>Chỉnh sửa</Link>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList
