import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import { useState } from "react";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

function CartResponsive() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [loading, setLoading] = useState(false);
  const userCartObj = user.cart;
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();

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
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <p className="text-center text-3xl mb-8">Giỏ hàng của bạn</p>
          <Accordion className="bg-[#D8E3E7]">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Thông tin sản phẩm trong giỏ hàng</Typography>
            </AccordionSummary>
            <AccordionDetails className="overflow-y-auto h-96">
              <Typography>
                {cart.length > 0 && (
                  <div className="px-2">
                    <div className="w-full big-phone:container big-phone:mx-auto relative">
                      <table className="shadow-sm w-full small-phone:text-xs tablet:text-base my-4">
                        <thead>
                          <tr className="big-tablet:text-xl small-phone:text-base">
                            <th>Sản phẩm</th>
                            <th className="big-phone:block small-phone:hidden border-none">
                              Giá tiền
                            </th>
                            <th>Số lượng</th>
                            <th>Tổng giá</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* loop through cart products */}
                          {cart.map((item) => (
                            <tr key={item}>
                              <td className="small-phone:p-1">
                                <img
                                  src={item.pictures[0].url}
                                  className="big-tablet:ml-10 tablet:ml-5 shadow-sm big-tablet:w-24 big-tablet:h-24 tablet:h-16 tablet:w-16 small-phone:h-24 small-phone:w-24 object-cover"
                                  alt="cart-item"
                                />
                              </td>
                              <td className="big-phone:block small-phone:hidden border-none big-tablet:my-6 tablet:my-2 big-phone:my-10">
                                {(item.price * 24000).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </td>
                              <td className="small-phone:p-1">
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
                              <td className="small-phone:p-1">
                                {(
                                  item.price *
                                  24000 *
                                  user.cart[item._id]
                                ).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </td>
                              <td className="small-phone:p-1">
                                {!isLoading && (
                                  <button
                                    onClick={() =>
                                      removeFromCart({
                                        productId: item._id,
                                        price: item.price,
                                        userId: user._id,
                                      })
                                    }
                                    className="bg-[#132C33]"
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
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className="bg-[#D8E3E7]">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Thông tin đơn hàng</Typography>
            </AccordionSummary>
            <AccordionDetails className="overflow-y-auto h-96">
              <Typography>
                <div className="relative">
                  <span className="absolute">
                    <img
                      src="/images/pencil.png"
                      alt="pencil"
                      className="shadow-none"
                    />
                  </span>
                  <ul className="shadow-sm mb-8 bg-[#D8E3E7]">
                    <li className="h4 pt-4 text-3xl text-center pb-4 bg-[#132C33] text-white">
                      Tổng cộng
                    </li>

                    {cart.map((item) => (
                      <li
                        className="py-2 px-4 border-b-2 border-[#132C33] text-xl"
                        key={item}
                      >
                        <div className="grid grid-cols-6">
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
                          <div className="col-span-2 text-base">
                            <p>Số lượng: {user.cart[item._id]}</p>
                            <p className="small-phone:text-xs big-phone:text-base">
                              x{" "}
                              {(item.price * 24000).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                    <li className="py-2 px-4 border-b-2 border-[#132C33] text-xl">
                      Tổng giá: {subTotal}
                    </li>
                  </ul>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className="bg-[#D8E3E7]">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>Thanh toán</Typography>
            </AccordionSummary>
            <AccordionDetails className="overflow-y-auto h-96">
              <Typography>
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </div>
  );
}

export default CartResponsive;
