import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../axios'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'

function OrderList() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const products = useSelector((state) => state.products)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    axios
      .get('/orders')
      .then(({ data }) => {
        setLoading(false)
        setOrders(data)
      })
      .catch((e) => {
        setLoading(false)
      })
  }, [])

  const markShipped = (orderId, ownerId) => {
    axios
      .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
      .then(({ data }) => setOrders(data))
      .catch((e) => console.log(e))
  }

  const showOrder = (e) => {
    e.preventDefault()
  }
  console.log(orders)

  return (
    <>
      {orders.length === 0 ? (
        <p className="text-center pt-4">Chưa có đơn hàng nào</p>
      ) : (
        <>
          <div className="my-4">
            <p className="text-3xl">Chi tiết đơn hàng</p>
          </div>
          <table className="w-full my-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên khách hàng</th>
                <th>Số sản phẩm</th>
                <th>Tổng cộng</th>
                <th>Địa chỉ</th>
              </tr>
            </thead>
            <tbody>
              {page === 1 ? (
                <>
                  {orders.slice(0, 8).map((order) => (
                    <tr key={order}>
                      <td>{order._id}</td>
                      <td>{order.owner?.name}</td>
                      <td>{order.count}</td>
                      <td>
                        {order.total.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </td>
                      <td>{order.address}</td>
                      <td>
                        {order.status === 'Đang xử lý' ? (
                          <button
                            size="sm"
                            onClick={() =>
                              markShipped(order._id, order.owner?._id)
                            }
                            className="bg-[#132C33]"
                          >
                            Đánh giấu đã vận chuyển
                          </button>
                        ) : (
                          <div bg="success">Đã giao hàng</div>
                        )}
                      </td>
                      <td>
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={() => showOrder(products)}
                        >
                          Xem đơn hàng <i className="fa fa-eye"></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {orders.slice(8 * (page - 1), 8 * page).map((order) => (
                    <tr key={order}>
                      <td>{order._id}</td>
                      <td>{order.owner?.name}</td>
                      <td>{order.count}</td>
                      <td>
                        {order.total.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </td>
                      <td>{order.address}</td>
                      <td>
                        {order.status === 'Đang xử lý' ? (
                          <button
                            size="sm"
                            onClick={() =>
                              markShipped(order._id, order.owner?._id)
                            }
                            className="bg-[#132C33]"
                          >
                            Đánh giấu đã vận chuyển
                          </button>
                        ) : (
                          <div bg="success">Đã giao hàng</div>
                        )}
                      </td>
                      <td>
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={() => showOrder(products)}
                        >
                          Xem đơn hàng <i className="fa fa-eye"></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
          <Stack spacing={2} className="p-1 rounded-lg">
            <Pagination
              count={Math.round(orders.length / 8)}
              color="primary"
              onChange={(e, value) => setPage(value)}
            />
          </Stack>
        </>
      )}
    </>
  )
}

export default OrderList
