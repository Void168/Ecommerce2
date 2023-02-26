import { Pagination, Stack } from "@mui/material";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-date-picker";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../axios";
import Loading from "../components/Loading";
import { AppContext } from "../context/AppContext";

function Order() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dayStart, setDayStart] = useState(new Date());
  const [dayEnd, setDayEnd] = useState(new Date());
  const { page, changeIndex } = useContext(AppContext);
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [user._id]);
  let count = Math.ceil(orders.length / 8);

  if (orders.length === 0) {
    return <div className="text-center pt-3 h-screen">Bạn chưa có đơn hàng nào</div>;
  }

  const setDay = () => {
    count = Math.ceil(
      orders.filter(
        (filteredProduct) =>
          filteredProduct.date >= dayStart && filteredProduct.date <= dayEnd
      ).length / 8
    );
    setSubmit(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="big-tablet:container big-tablet:mx-auto">
      <p className="text-center text-3xl mb-4">Đơn hàng của bạn</p>
      <div className="grid grid-cols-4">
        <div className="container mx-auto laptop:col-span-1 small-phone:col-span-4 flex laptop:flex-col laptop:justify-start big-phone:flex-row small-phone:flex-col small-phone:justify-center">
          <div className="mx-4">
            <p>Chọn ngày bắt đầu</p>
            <DatePicker
              value={dayStart}
              selected={dayStart}
              onChange={setDayStart}
              className="w-full my-4"
            />
          </div>
          <div className="mx-4">
            <p>Chọn ngày kết thúc</p>
            <DatePicker
              value={dayEnd}
              selected={dayEnd}
              onChange={setDayEnd}
              className="w-full my-4"
            />
          </div>
          <div className="text-center">
            <button
              onClick={setDay}
              className="button laptop:w-full big-phone:w-full small-phone:w-8/12 my-4 small-phone:mx-4 big-phone:my-11 laptop:mx-0"
            >
              Xác nhận
            </button>
          </div>
        </div>
        <div className="laptop:col-span-3 small-phone:col-span-4 px-4">
          {loading ? (
            <Loading />
          ) : (
            <div className="overflow-x-auto">
              <table
                responsive
                striped
                bordered
                hover
                className="w-full big-tablet:text-base tablet:text-sm"
              >
                <thead>
                  <tr>
                    <th className="tablet:w-8">#</th>
                    <th>Trạng thái</th>
                    <th>Ngày đặt</th>
                    <th>Tổng cộng</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {submit === false ? (
                    <>
                      {page === 1 ? (
                        <>
                          {orders
                            .slice(orders.length - 8, orders.length)
                            .map((order) => (
                              <tr>
                                <td className="truncate big-tablet:w-64 tablet:w-8">
                                  {order._id}
                                </td>
                                <td>
                                  <div
                                    bg={`${
                                      order.status === "đang xử lý"
                                        ? "lỗi"
                                        : "đã thanh toán"
                                    }`}
                                    text="white"
                                  >
                                    {order.status}
                                  </div>
                                </td>
                                <td>
                                  {order.date
                                    .slice(0, 10)
                                    .toString()
                                    .split("-")
                                    .reverse()
                                    .join("-")}
                                </td>

                                <td>
                                  {order.total.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </td>
                                <td>
                                  <button className="bg-[#132C33] button">
                                    <Link to={`/order/${order._id}`}>
                                      Chi tiết
                                    </Link>
                                  </button>
                                </td>
                              </tr>
                            ))
                            .reverse()}
                        </>
                      ) : (
                        <>
                          {orders
                            .slice(
                              8 * (Math.round(orders.length / 8) - page),
                              8 * (Math.round(orders.length / 8) - page + 1)
                            )
                            .map((order) => (
                              <tr>
                                <td className="truncate big-tablet:w-64 tablet:w-8">
                                  {order._id}
                                </td>
                                <td>
                                  <div
                                    bg={`${
                                      order.status === "đang xử lý"
                                        ? "lỗi"
                                        : "đã thanh toán"
                                    }`}
                                    text="white"
                                  >
                                    {order.status}
                                  </div>
                                </td>
                                <td>
                                  {order.date
                                    .slice(0, 10)
                                    .toString()
                                    .split("-")
                                    .reverse()
                                    .join("-")}
                                </td>

                                <td>
                                  {order.total.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </td>
                                <td>
                                  <button className="bg-[#132C33] button">
                                    <Link to={`/order/${order._id}`}>
                                      Chi tiết
                                    </Link>
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {orders
                        .slice(0, 8)
                        .filter(
                          (order) =>
                            order.date > dayStart.toISOString().split("T")[0] &&
                            order.date < dayEnd.toISOString().split("T")[0]
                        )
                        .map((order) => (
                          <tr>
                            <td className="truncate">{order._id}</td>
                            <td>
                              <div
                                bg={`${
                                  order.status === "đang xử lý"
                                    ? "lỗi"
                                    : "đã thanh toán"
                                }`}
                                text="white"
                              >
                                {order.status}
                              </div>
                            </td>
                            <td>
                              {order.date
                                .slice(0, 10)
                                .toString()
                                .split("-")
                                .reverse()
                                .join("-")}
                            </td>

                            <td>
                              {order.total.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>
                            <td>
                              <button className="bg-[#132C33] button">
                                <Link to={`/order/${order._id}`}>Chi tiết</Link>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </>
                  )}
                </tbody>
              </table>
              {dayStart > dayEnd ? (
                <div className="w-full">
                  Ngày bắt đầu phải nhỏ hơn ngày kết thúc
                </div>
              ) : orders.filter(
                  (order) =>
                    dayStart.toISOString().split("T")[0] <= order.date &&
                    order.date <= dayEnd.toISOString().split("T")[0]
                ).length === 0 ? (
                <p className="w-full">Bạn chưa có đơn hàng nào</p>
              ) : null}
              <Stack spacing={2} className="p-4 rounded-lg">
                <Pagination
                  count={count}
                  color="primary"
                  onChange={changeIndex}
                />
              </Stack>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
