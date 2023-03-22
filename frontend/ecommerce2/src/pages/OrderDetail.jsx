import axios from "../axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { AppContext } from "../context/AppContext";

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pId, setId] = useState([]);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState([]);
  const {
    USD_VND_EXCHANGE_RATE,
  } = useContext(AppContext);

  useEffect(() => {
    axios.get("/orders/" + id).then(({ data }) => {
      setOrder(data.order);
    });
  }, [id]);

  useEffect(() => {
    const idList = async () => {
      const idList = Object.keys(order?.products).filter((id) =>
        id.includes("63d")
      );
      setId([...idList]);
    };
    idList();

    const listCount = async () => {
      const deleteProperty = { ...order?.products };
      delete deleteProperty.total;
      delete deleteProperty.count;

      const arrayNumber = Object.entries(deleteProperty)
        .flat()
        .slice(
          products.length * 2,
          Object.entries(deleteProperty).flat().length
        )
        .filter((element) => typeof element === "number");
        for (let i = 0; i < arrayNumber.length; i++) {
          arrayNumber.splice(i + 1, 1);
        }
      setCount([...arrayNumber]);
    };
    listCount();
  }, [order?.products, products.length]);

  useEffect(() => {
    if (pId) {
      Promise.all(pId.map((item) => axios.get("/products/" + item)))
        .then((products) => setProducts(products))
        .catch((error) => console.log(error));
    }
  }, [pId]);

  const listProduct = products?.map((product) => product.data.product);
  listProduct.forEach((element, index) => {
    element.count = count[index];
  });

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="big-phone:container big-phone:mx-auto">
          <div className="w-full p-4 desktop:grid desktop:grid-cols-3 small-phone:flex small-phone:flex-col gap-8">
            <div className="col-span-2">
              <p className="text-2xl text-white text-center bg-[#132C33] py-4">
                Địa chỉ giao hàng
              </p>
              <div className="bg-[#D8E3E7] p-4 shadow-sm">
                <p className="truncate my-4">Tên khách hàng: {order?.name}</p>
                <p className="truncate my-4">Email: {order?.email}</p>
                <p className="truncate my-4">
                  Số điện thoại:{" "}
                  {order?.phone?.replace(order?.phone?.slice(2, 8), "******")}
                </p>
                <p className="truncate my-4">Địa chỉ: {order?.address}</p>
                <div className=" my-4">
                  <span>Trạng thái: </span>
                  <span className="truncate">{order?.status}</span>
                </div>
              </div>
              <div className="my-8">
                <p className="text-2xl text-white text-center bg-[#132C33] py-4">
                  Sản phẩm đã đặt
                </p>
                <div className="bg-[#D8E3E7] p-4 shadow-sm">
                  {listProduct.map((product) => (
                    <div className="flex big-tablet:flex-row small-phone:flex-col big-tablet:justify-between border-b border-[#132C33] mt-4">
                      <Link to={`/san-pham/${product._id}`}>
                        <div className="flex flex-row max-w-max">
                          <img
                            src={product.pictures[0].url}
                            alt="product-pic"
                            className="shadow-sm rounded-lg max-h-max mb-4 w-32 bg-white"
                          />
                          <div className="mx-8 truncate">
                            <p className="truncate my-4">{product.name}</p>
                            <p className="truncate my-4">
                              Đơn giá:{" "}
                              {(
                                (product.price *
                                  USD_VND_EXCHANGE_RATE *
                                  (100 - product.discount)) /
                                100
                              ).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </p>
                          </div>
                        </div>
                      </Link>

                      <div>
                        <p className="truncate my-4">
                          Số lượng: {product.count}
                        </p>
                        <p className="truncate my-4">
                          Tổng cộng:{" "}
                          {(
                            (product.count *
                              product.price *
                              USD_VND_EXCHANGE_RATE *
                              (100 - product.discount)) /
                            100
                          ).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-[#D8E3E7] shadow-sm">
                <p className="text-3xl text-white text-center bg-[#132C33] py-4">
                  Thông tin đơn hàng
                </p>
                <div className="p-4 flex flex-row justify-around">
                  <div>
                    <p className="truncate my-4">Mã đơn hàng: </p>
                    <p className="truncate my-4">Mã khách hàng: </p>
                    <p className="truncate my-4">Tổng hóa đơn: </p>
                    <p className="truncate my-4">Số lượng mặt hàng: </p>
                    <p className="truncate my-4">Ngày đặt: </p>
                  </div>
                  <div>
                    <p className="truncate my-4">{order?._id}</p>
                    <p className="truncate my-4">{order?.owner}</p>
                    <p className="truncate my-4">
                      {order?.products.total.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                    <p className="truncate my-4">{order?.products.count}</p>
                    <p className="truncate">
                      {order?.date
                        .slice(0, 10)
                        .toString()
                        .split("-")
                        .reverse()
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;
