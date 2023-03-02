import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
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
  const [loading, setLoading] = useState(false);
  const [revenue, setRevenue] = useState([]);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const currentMonth = new Date().getMonth().toString()
  const currentYear = new Date().getFullYear().toString();

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
        label: "Doanh so",
        borderColor: "rgb(81, 196, 211)",
        backgroundColor: "rgba(81, 196, 211, 0.5)",
      },
    ],
  };

  return (
    <div className="grid grid-cols-5 gap-5 container mx-auto h-screen">
      <div className="bg-[#132C33] rounded-lg p-4 text-white">
        <div>
          <span>Doanh thu theo tháng: {""}</span>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
              <Select
                defaultValue={`${currentMonth + 1}`}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterMonth}
                label="Tháng"
                onChange={(e) => setFilterMonth(e.target.value)}
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
              <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={currentYear}
                value={filterYear}
                label="Tháng"
                onChange={(e) => setFilterYear(e.target.value)}
              >
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          Tổng doanh thu tháng:{" "}
          {listTotal
            .reduce((a, c) => a + c, 0)
            .toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
        </div>
      </div>
      <div className="col-span-4">
        <div className=" p-8 bg-[#132C33] rounded-lg">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

export default Chart;
