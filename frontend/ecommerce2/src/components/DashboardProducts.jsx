import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDeleteProductMutation } from '../services/appApi'

function DashboardProducts() {
  const products = useSelector((state) => state.products)
  const user = useSelector((state) => state.user)
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation()

  const handleDeleteProduct = (id) => {
    if (window.confirm('Chắc chắn xóa sản phẩm này?')) {
      deleteProduct({ product_id: id, user_id: user._id })
    }
  }
  return (
    <table>
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
          <tr>
            <td>
              <img src={product.pictures[0].url} alt="product-pic" />
            </td>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <button
                onClick={() => handleDeleteProduct(product._id, user._id)}
                disabled={isLoading}
              >
                Xóa sản phẩm
              </button>
              <button>
                <Link to={`/product/${product._id}/edit`}>Chỉnh sửa</Link>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DashboardProducts
