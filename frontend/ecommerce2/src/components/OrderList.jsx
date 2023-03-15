import React, { useContext, useEffect, useState } from "react";
import axios from "../axios";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Loading from "./Loading";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { products } = useContext(AppContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders")
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  // Get shipping status
  const markShipped = (orderId, ownerId) => {
    axios
      .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
      .then(({ data }) => setOrders(data))
      .catch((e) => console.log(e));
  };

  const showOrder = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <p className="tablet:hidden small-phone:block h-screen">
        Vui lòng sử dụng thiết bị lớn hơn để quản lý
      </p>
      <div className="tablet:block small-phone:hidden">
        {orders.length === 0 ? (
          <p className="text-center pt-4">Chưa có đơn hàng nào</p>
        ) : (
          <>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="my-4">
                  <p className="text-3xl">Chi tiết đơn hàng</p>
                </div>
                <div className="overflow-y-auto max-h-max">
                  <table className="w-full my-4 table-fixed tablet:text-xs big-tablet:text-sm laptop:text-base">
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
                          {orders
                            .slice(orders.length - 8, orders.length)
                            .map((order) => (
                              <tr key={order}>
                                <td className="truncate">{order._id}</td>
                                <td className="truncate">
                                  {order.owner?.name}
                                </td>
                                <td className="truncate">{order.count}</td>
                                <td className="truncate">
                                  {order.total.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </td>
                                <td>{order.address}</td>
                                <td className="tablet:pr-2">
                                  {/* Button mark shipped */}
                                  {order.status === "Đang xử lý" ? (
                                    <>
                                      <button
                                        onClick={() =>
                                          markShipped(
                                            order._id,
                                            order.owner?._id
                                          )
                                        }
                                        className="bg-[#132C33] tablet:hidden big-tablet:block button"
                                      >
                                        Đánh giấu đã vận chuyển
                                      </button>
                                      <button
                                        onClick={() =>
                                          markShipped(
                                            order._id,
                                            order.owner?._id
                                          )
                                        }
                                        className="bg-[#132C33] tablet:block big-tablet:hidden button"
                                      >
                                        <CheckCircleIcon />
                                      </button>
                                    </>
                                  ) : (
                                    <div bg="success">Đã giao hàng</div>
                                  )}
                                </td>

                                {/* Watch product */}
                                <td>
                                  <Link to={`/order/${order._id}`}>
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() => showOrder(products)}
                                    >
                                      Xem đơn hàng <i className="fa fa-eye"></i>
                                    </span>
                                  </Link>
                                </td>
                              </tr>
                            ))
                            .reverse()}
                        </>
                      ) : (
                        <>
                          {/* Display list of orders */}
                          {orders
                            .slice(
                              8 * (Math.round(orders.length / 8) - page),
                              8 * (Math.round(orders.length / 8) - page + 1)
                            )
                            .map((order) => (
                              <tr key={order}>
                                <td className="truncate">{order._id}</td>
                                <td className="truncate">
                                  {order.owner?.name}
                                </td>
                                <td className="truncate">{order.count}</td>
                                <td className="truncate">
                                  {order.total.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </td>
                                <td>{order.address}</td>
                                <td>
                                  {order.status === "Đang xử lý" ? (
                                    <>
                                      <button
                                        onClick={() =>
                                          markShipped(
                                            order._id,
                                            order.owner?._id
                                          )
                                        }
                                        className="bg-[#132C33] tablet:hidden big-tablet:block button"
                                      >
                                        Đánh giấu đã vận chuyển
                                      </button>
                                      <button
                                        onClick={() =>
                                          markShipped(
                                            order._id,
                                            order.owner?._id
                                          )
                                        }
                                        className="bg-[#132C33] tablet:block big-tablet:hidden button"
                                      >
                                        <CheckCircleIcon />
                                      </button>
                                    </>
                                  ) : (
                                    <div bg="success">Đã giao hàng</div>
                                  )}
                                </td>
                                <td>
                                  <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => showOrder(products)}
                                  >
                                    Xem đơn hàng <i className="fa fa-eye"></i>
                                  </span>
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
        )}
      </div>
    </>
  );
}

export default OrderList;
