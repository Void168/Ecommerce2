import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "../axios";
import Loading from "../components/Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const articles = useSelector((state) => state.articles);
  const products = useSelector((state) => state.products);
  const [loading, setLoading] = useState(false);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const currentMonth = new Date().getMonth().toString();
  const currentYear = new Date().getFullYear().toString();
  const today = new Date().toISOString().split("T")[0];

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
    axios
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Biểu đồ doanh thu ngày",
      },
    },
  };

  let labels = [];
  const listTotal = orders
    .filter(
      (order) =>
        order.date.slice(5, 7) === filterMonth &&
        order.date.slice(0, 4) === filterYear
    )
    .map((order) => order.total);
  const listTotalLastMonth = orders
    .filter(
      (order) =>
        order.date.slice(5, 7) === "0" + (Number(filterMonth) - 1).toString() &&
        order.date.slice(0, 4) === filterYear
    )
    .map((order) => order.total);

  const groupByDate = orders.reduce((group, order) => {
    const { date } = order;
    group[date] = group[date] ?? [];
    group[date].push(order);
    return group;
  }, {});

  const arrayDate = Object.keys(groupByDate);
  const filterDay = arrayDate
    .filter(
      (s) => s.slice(5, 7) === filterMonth && s.slice(0, 4) === filterYear
    )
    .map((s) => s.slice(8, 10));
  labels = filterDay;

  let array = [];
  labels.forEach((item) => {
    const total = orders
      .filter((order) => Number(order.date.slice(8, 10)) === Number(item))
      .map((order) => order.total)
      .reduce((a, c) => a + c, 0);
    array.push(total);
  });

  const data = {
    labels,
    datasets: [
      {
        data: array,
        label: `Doanh thu tháng ${filterMonth} năm ${filterYear}`,
        borderColor: "rgb(81, 196, 211)",
        backgroundColor: "rgba(81, 196, 211, 0.5)",
      },
    ],
  };

  const totalArray = Object.values(orders.map((order) => order.total));
  console.log(totalArray);

  return (
    <>
      <div className="grid big-desktop:grid-cols-5 gap-5 shadow-sm bg-[#132C33] p-8">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="big-phone:hidden small-phone:block text-white h-screen">
              <p>Dùng thiết bị lớn hơn để quản lý</p>
            </div>
            <div className="bg-[#126E82] rounded-lg p-4 text-white big-desktop:col-span-1 small-phone:col-span-4 shadow-sm big-phone:block small-phone:hidden">
              <div>
                <span>Doanh thu theo tháng: {""}</span>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" className="my-4">
                      Tháng
                    </InputLabel>
                    <Select
                      defaultValue={`${currentMonth + 1}`}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={filterMonth}
                      label="Tháng"
                      onChange={(e) => setFilterMonth(e.target.value)}
                      className="my-4"
                    >
                      <MenuItem value="01">Tháng 1</MenuItem>
                      <MenuItem value="02">Tháng 2</MenuItem>
                      <MenuItem value="03">Tháng 3</MenuItem>
                      <MenuItem value="04">Tháng 4</MenuItem>
                      <MenuItem value="05">Tháng 5</MenuItem>
                      <MenuItem value="06">Tháng 6</MenuItem>
                      <MenuItem value="07">Tháng 7</MenuItem>
                      <MenuItem value="08">Tháng 8</MenuItem>
                      <MenuItem value="09">Tháng 9</MenuItem>
                      <MenuItem value="10">Tháng 10</MenuItem>
                      <MenuItem value="11">Tháng 11</MenuItem>
                      <MenuItem value="12">Tháng 12</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div>
                <span>Doanh thu theo năm: {""}</span>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" className="my-4">
                      Tháng
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={currentYear}
                      value={filterYear}
                      label="Tháng"
                      onChange={(e) => setFilterYear(e.target.value)}
                      className="my-4"
                    >
                      <MenuItem value="2022">2022</MenuItem>
                      <MenuItem value="2023">2023</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div>
                <span>Doanh thu hôm nay: {""}</span>
                <div className="bg-white px-2 py-1 text-black shadow-sm rounded-md my-4">
                  {orders
                    .filter((order) => order.date === today)
                    .map((order) => order.total)
                    .reduce((a, c) => a + c, 0)
                    .toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                </div>
              </div>
              <div>
                <span>Số đơn hàng hôm nay: {""}</span>
                <div className="bg-white px-2 py-1 text-black shadow-sm rounded-md my-4">
                  {orders.filter((order) => order.date === today).length} đơn
                  hàng
                </div>
              </div>
              <div>
                <span>Số sản phẩm được bán hôm nay: {""}</span>
                <div className="bg-white px-2 py-1 text-black shadow-sm rounded-md my-4">
                  {orders
                    .filter((order) => order.date === today)
                    .map((order) => order.count)
                    .reduce((a, c) => a + c, 0)}{" "}
                  sản phẩm
                </div>
              </div>
              <div>
                <span>Số bài viết mới: {""}</span>
                <div className="bg-white px-2 py-1 text-black shadow-sm rounded-md my-4">
                  {articles.filter((article) => article.date === today).length}{" "}
                  bài viết
                </div>
              </div>
            </div>
            <div className="col-span-4 grid big-desktop:grid-rows-4 small-phone:grid-rows-1 gap-4 big-phone:block small-phone:hidden">
              <div className="row-span-1 grid big-desktop:grid-cols-4 small-phone:grid-cols-2 small-phone:grid-rows-2 big-desktop:grid-rows-1 gap-2 mb-4">
                <div className="dashboard__month">
                  <p className="text-center">
                    Tổng doanh thu tháng {filterMonth}:
                  </p>
                  <p className="big-desktop:text-2xl mt-4">
                    <i className="fa-solid fa-wallet text-amber-300"></i>{" "}
                    {listTotal
                      .reduce((a, c) => a + c, 0)
                      .toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                  </p>
                  <p className="text-base">
                    {listTotal.reduce((a, c) => a + c, 0) >
                    listTotalLastMonth.reduce((a, c) => a + c, 0) ? (
                      <p className="big-desktop:text-base big-tablet:text-sm">
                        <i className="fa-solid fa-up-right text-green-500"></i>(
                        +{" "}
                        {Math.round(
                          (listTotal.reduce((a, c) => a + c, 0) /
                            listTotalLastMonth.reduce((a, c) => a + c, 0)) *
                            100
                        )}{" "}
                        % so với tháng trước )
                      </p>
                    ) : listTotal.reduce((a, c) => a + c, 0) <
                      listTotalLastMonth.reduce((a, c) => a + c, 0) ? (
                      <p className="big-desktop:text-base big-tablet:text-sm">
                        <i className="fa-regular fa-down"></i>( -{" "}
                        {100 -
                          Math.round(
                            (listTotal.reduce((a, c) => a + c, 0) /
                              listTotalLastMonth.reduce((a, c) => a + c, 0)) *
                              100
                          )}{" "}
                        % so với tháng trước )
                      </p>
                    ) : (
                      <p> 0 %</p>
                    )}
                  </p>
                </div>
                <div className="dashboard__month">
                  <p className="text-center">Số đơn hàng đã giao:</p>
                  <p className="big-desktop:text-2xl mt-4">
                    <i className="fa-solid fa-cart-shopping text-red-500"></i>{" "}
                    <span>
                      {
                        orders.filter(
                          (order) =>
                            order.date.slice(5, 7) === filterMonth &&
                            order.date.slice(0, 4) === filterYear
                        ).length
                      }{" "}
                      đơn hàng
                    </span>
                    <p className="big-desktop:text-base big-tablet:text-sm">
                      ( Với{" "}
                      {orders
                        .filter(
                          (order) =>
                            order.date.slice(5, 7) === filterMonth &&
                            order.date.slice(0, 4) === filterYear
                        )
                        .map((order) => order.count)
                        .reduce((a, c) => a + c, 0)}{" "}
                      sản phẩm được bán )
                    </p>
                  </p>
                </div>
                <div className="dashboard__month">
                  <p className="text-center">Trung bình một đơn hàng:</p>{" "}
                  <p className="big-desktop:text-2xl mt-4">
                    <i className="fa-solid fa-person text-[#132C33]"></i>{" "}
                    {(
                      listTotal.reduce((a, c) => a + c, 0) / users.length
                    ).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <p className="big-desktop:text-base big-tablet:text-sm mt-4">
                    Đơn hàng lớn nhất:{" "}
                    {Math.max(...totalArray).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <p className="big-desktop:text-base big-tablet:text-sm mt-4">
                    Đơn hàng bé nhất:{" "}
                    {Math.min(...totalArray).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div className="dashboard__month">
                  <p className="text-center">Người dùng mới:</p>
                  <p className="big-desktop:text-2xl mt-4">
                    +{" "}
                    {
                      users.filter(
                        (user) =>
                          user.createAt.slice(5, 7) === filterMonth &&
                          user.createAt.slice(0, 4) === filterYear
                      ).length
                    }
                  </p>
                </div>
              </div>
              <div className=" p-8 bg-[#D8E3E7] rounded-lg big-desktop:row-span-3 small-phone:row-span-1 shadow-sm">
                <div className="w-full max-h-min">
                  <Line options={options} data={data} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Chart;
