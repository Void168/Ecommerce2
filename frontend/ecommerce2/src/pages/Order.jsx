import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from '../axios'
import Loading from '../components/Loading'

function Order() {
  const user = useSelector((state) => state.user)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false)
        setOrders(data)
      })
      .catch((e) => {
        setLoading(false)
        console.log(e)
      })
  }, [user._id])

  if (orders.length === 0) {
    return <h1 className="text-center pt-3">Bạn chưa có đơn hàng nào</h1>
  }

  return (
    <div className="container mx-auto">
      <p className="text-center text-3xl mb-4">Đơn hàng của bạn</p>
      <div className="grid grid-cols-3">
        <div className="col-span-1 h-screen bg-white"></div>
        <div className="col-span-2 px-4">
          {loading ? (
            <Loading />
          ) : (
            <table responsive striped bordered hover className="w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Trạng thái</th>
                  <th>Ngày đặt</th>
                  <th>Tổng cộng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .map((order) => (
                    <tr>
                      <td>{order._id}</td>
                      <td>
                        <div
                          bg={`${
                            order.status === 'đang xử lý'
                              ? 'lỗi'
                              : 'đã thanh toán'
                          }`}
                          text="white"
                        >
                          {order.status}
                        </div>
                      </td>
                      <td>{order.date}</td>

                      <td>
                        {order.total.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </td>
                      <td>
                        <button className="bg-[#132C33]">
                          <Link to={`/order/${order._id}`}>Chi tiết</Link>
                        </button>
                      </td>
                    </tr>
                  ))
                  .reverse()}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Order
