import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import {
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useRemoveFromCartMutation,
} from '../services/appApi'

function Cart(props) {
  const user = useSelector((state) => state.user)
  const products = useSelector((state) => state.products)
  const [loading, setLoading] = useState(false)
  const userCartObj = user.cart
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation()
  const [increaseCart] = useIncreaseCartProductMutation()
  const [decreaseCart] = useDecreaseCartProductMutation()
  const navigate = useNavigate()

  let cart = products.filter((product) => userCartObj[product._id] != null)

  const subTotal = (user.cart.total - 18000).toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  })

  const handleDecrease = (product) => {
    const quantity = user.cart.count
    if (quantity <= 0) return alert('Số lượng phải lớn hơn 0')
    decreaseCart(product)
  }

  const checkoutHandler = () => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [])

  return (
    <div className="container mx-auto">
      <p className="text-3xl">Giỏ hàng</p>
      {loading ? (
        <Loading />
      ) : (
        <>
          {cart.length === 0 ? (
            <p className="text-xl">
              Giỏ hàng trống. <Link to="/">Tiếp tục mua hàng</Link>
            </p>
          ) : (
            <div className="flex flex-row">
              <div className="w-8/12">
                <table
                  responsive="sm"
                  className="cart-table shadow-sm w-10/12 my-4"
                >
                  <thead>
                    <tr className="text-xl">
                      <th>Sản phẩm</th>
                      <th>Giá tiền</th>
                      <th>Số lượng</th>
                      <th>Tổng giá</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* loop through cart products */}
                    {cart.map((item) => (
                      <tr key={item}>
                        <td>
                          <img
                            src={item.pictures[0].url}
                            className="ml-10 shadow-sm w-24 h-24 object-cover"
                            alt="cart-item"
                          />
                        </td>
                        <td>
                          {(item.price * 24000).toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </td>
                        <td>
                          <span className="flex justify-around">
                            <i
                              className="fa fa-minus-circle pt-1 cursor-pointer"
                              onClick={() =>
                                handleDecrease({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                            ></i>
                            <span>{user.cart[item._id]}</span>
                            <i
                              className="fa fa-plus-circle pt-1 cursor-pointer"
                              onClick={() =>
                                increaseCart({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                            ></i>
                          </span>
                        </td>
                        <td>
                          {(
                            item.price *
                            24000 *
                            user.cart[item._id]
                          ).toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </td>
                        <td>
                          {!isLoading && (
                            <button
                              onClick={() =>
                                removeFromCart({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                              className="bg-[#132C33]"
                            >
                              Hủy bỏ
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Link to="/" className="text-[#126E82] mb-4">
                  Tiếp tục mua hàng
                </Link>
              </div>
              <div className="w-4/12 relative">
                <span className="absolute">
                  <img src="/images/pencil.png" alt="pencil" />
                </span>
                <ul className="shadow-sm mb-8 ">
                  <li className="h4 pt-4 text-3xl text-center pb-4 bg-[#132C33] text-white">
                    Tổng cộng
                  </li>
                  <li className="py-2 px-4 border-b-2 border-[#132C33] text-xl">
                    Tổng giá: {subTotal}
                  </li>
                  {cart.map((item) => (
                    <li className="py-2 px-4 border-b-2 border-[#132C33] text-xl">
                      Số sản phẩm: {user.cart[item._id]}
                    </li>
                  ))}

                  <li className="p-2 border-b-2 border-[#132C33] h-32"></li>
                </ul>
                <button
                  type="button"
                  onClick={checkoutHandler}
                  disabled={cart.length === 0}
                >
                  Tiến hành kiểm tra
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Cart
