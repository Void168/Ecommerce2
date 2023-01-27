import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { useRemoveFromCartMutation } from '../services/appApi'

function Cart() {
  const user = useSelector((state) => state.user)
  const products = useSelector((state) => state.products)
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState(null)
  const userCartObj = user.cart
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation()
  let cart = products.filter((product) => userCartObj[product._id] != null)

  const subTotal = user.cart.total.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  })

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [])

  return (
    <div className="container">
      <div>
        <p className="text-3xl">Giỏ hảng</p>
        {loading ? (
          <Loading />
        ) : (
          <>
            {cart.length === 0 ? (
              <p className="text-xl">
                Giỏ hàng trống. <Link to="/">Tiếp tục mua hàng</Link>
              </p>
            ) : (
              <>
                <table responsive="sm" className="cart-table">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>Sản phẩm</th>
                      <th>Giá tiền</th>
                      <th>Số lượng</th>
                      <th>Tổng cộng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* loop through cart products */}
                    {cart.map((item) => (
                      <tr>
                        <td>&nbsp;</td>
                        <td>
                          {!isLoading && (
                            <i
                              className="fa fa-times"
                              style={{ marginRight: 10, cursor: 'pointer' }}
                              onClick={() =>
                                removeFromCart({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                            ></i>
                          )}
                          <img
                            src={item.pictures[0].url}
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: 'cover',
                            }}
                            alt="cart-item"
                          />
                        </td>
                        <td>
                          {item.price.toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </td>
                        <td>
                          <span className="quantity-indicator">
                            <i className="fa fa-minus-circle"></i>
                            <span>{user.cart[item._id]}</span>
                            <i className="fa fa-plus-circle"></i>
                          </span>
                        </td>
                        <td>
                          {(item.price * user.cart[item._id]).toLocaleString(
                            'it-IT',
                            {
                              style: 'currency',
                              currency: 'VND',
                            },
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <h3 className="h4 pt-4">Tổng trả: {subTotal}</h3>
                </div>
              </>
            )}{' '}
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
