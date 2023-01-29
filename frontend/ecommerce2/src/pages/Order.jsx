import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
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
    <div className="container">
      <h1 className="text-center">Đơn hàng của bạn</h1>
      {loading ? (
        <Loading />
      ) : (
        <table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Tổng cộng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td>
                  <badge
                    bg={`${
                      order.status === 'đang xử lý' ? 'lỗi' : 'đã thanh toán'
                    }`}
                    text="white"
                  >
                    {order.status}
                  </badge>
                </td>
                <td>{order.date}</td>

                <td>${order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Order
