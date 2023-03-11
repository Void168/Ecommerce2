import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { Navigate, useNavigate } from 'react-router-dom'
import Loading from "../components/Loading";
import {
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useRemoveFromCartMutation,
} from "../services/appApi";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import CartResponsive from "../components/CartResponsive";
import { AppContext } from "../context/AppContext";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

function Cart() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [loading, setLoading] = useState(false);
  const userCartObj = user.cart;
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const {
    setNumber,
    setChosenProvince,
    setChosenDistrict,
    setChosenWard,
  } = useContext(AppContext); 

  let cart = products.filter((product) => userCartObj[product._id] != null);

  const subTotal = user.cart.total.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

  const handleDecrease = (product) => {
    const quantity = user.cart.count;
    if (quantity <= 0) return alert("Số lượng phải lớn hơn 0");
    decreaseCart(product);
  };

  useEffect(() => {
    setLoading(true);
    setNumber("")
    setChosenProvince("");
    setChosenDistrict("");
    setChosenWard("");
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <>
      <div className="big-phone:container big-phone:mx-auto laptop:hidden h-screen overflow-y-auto">
        <CartResponsive />
      </div>
      <div className="container mx-auto small-phone:hidden laptop:block">
        <p className="text-3xl">Giỏ hàng</p>

        {loading ? (
          <Loading />
        ) : (
          <>
            {cart.length === 0 ? (
              <div className="h-screen">
                <p className="text-xl mt-8">
                  Giỏ hàng trống.{" "}
                  <Link to="/" className="text-[#126E82]">
                    Tiếp tục mua hàng
                  </Link>
                </p>
              </div>
            ) : (
              <div className=" grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                  {cart.length > 0 && (
                    <div className="flex flex-row px-2">
                      <div className="w-full">
                        <table
                          responsive="sm"
                          className="cart-table shadow-sm w-full my-4"
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
                                  <Link to={`/san-pham/${item._id}`}>
                                    <img
                                      src={item.pictures[0].url}
                                      className="desktop:ml-10 shadow-sm w-24 h-24 object-cover"
                                      alt="cart-item"
                                    />
                                  </Link>
                                </td>
                                <td>
                                  {(
                                    ((item.price * (100 - item.discount)) /
                                      100) *
                                    24000
                                  ).toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
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
                                    ((item.price * (100 - item.discount)) /
                                      100) *
                                    24000
                                  ).toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
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
                                      className="bg-[#132C33] button"
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
                    </div>
                  )}
                </div>
                <div className="col-span-1">
                  <div className="relative">
                    <span className="absolute">
                      <img src="/images/pencil.png" alt="pencil" />
                    </span>
                    <ul className="shadow-sm mb-8 bg-[#D8E3E7]">
                      <li className="h4 pt-4 text-3xl text-center pb-4 bg-[#132C33] text-white">
                        Tổng cộng
                      </li>
                      <li className="py-2 px-4 border-b-2 border-[#132C33] text-xl">
                        Tổng giá: {subTotal}
                      </li>
                      {cart.map((item) => (
                        <li
                          className="py-2 px-4 border-b-2 border-[#132C33] text-xl"
                          key={item}
                        >
                          <div className="grid grid-cols-5">
                            <div className="col-span-4">
                              <img
                                src={item.pictures[0].url}
                                className="shadow-sm w-24 h-24 object-cover"
                                alt="cart-item"
                              />
                              <p className="text-sm my-2 item__name font-bold">
                                {item.name}
                              </p>
                            </div>
                            <div className="col-span-1 text-base">
                              Số lượng: {user.cart[item._id]}
                            </div>
                          </div>
                        </li>
                      ))}

                      <li className="p-2 border-b-2 border-[#132C33] h-32"></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
