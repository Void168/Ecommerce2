import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios.get("/orders/" + id).then(({ data }) => {
      setOrder(data.order);
    });
  }, [id, order]);

  // const object = JSON.parse(JSON.stringify(order?.products));
  // console.log(object);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="big-phone:container big-phone:mx-auto flex justify-center">
          <div className="w-8/12 bg-[#D8E3E7] p-4">
            <div className="truncate">{order?._id}</div>
            <div className="truncate">{order?.status}</div>
            <div className="truncate">{order?.owner}</div>
            <div className="truncate">{order?.name}</div>
            <div className="truncate">
              {order?.products.total.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </div>
            <div className="truncate">{order?.products.count}</div>
            <div className="truncate">{order?.products.cart}</div>
            <div>{order?.email}</div>
            <div>{order?.address}</div>
            <div className="truncate">{order?.phone}</div>
            <div className="truncate">
              {order?.date
                .slice(0, 10)
                .toString()
                .split("-")
                .reverse()
                .join("-")}
            </div>
            {/* <div>{array[0]}</div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;
