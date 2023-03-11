import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useCreateOrderMutation } from "../services/appApi";
import SelectAddress from "./SelectAddress";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paying, setPaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { number, chosenProvince, chosenDistrict, chosenWard } =
    useContext(AppContext);
  const fullAddress =
    number + ", " + chosenWard + ", " + chosenDistrict + ", " + chosenProvince;
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || user.cart.count <= 0) return;
    setPaying(true);
    try {
      const { client_secret } = await fetch(
        "http://localhost:8080/create-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_CLIENT_STRIPE_SECRET}`,
          },
          body: JSON.stringify({ amount: Math.round(user.cart.total / 24000) }),
        }
      ).then((res) => res.json());

      const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      setPaying(false);

      if (paymentIntent && isOpen === false) {
        createOrder({
          userId: user._id,
          cart: user.cart,
          address,
          phone,
          name,
          email,
        }).then((res) => {
          if (!isLoading && !isError) {
            setAlertMessage(`Thanh toán ${paymentIntent.status}`);
            setTimeout(() => {
              navigate("/orders");
            }, 2000);
          }
        });
      } else {
        createOrder({
          userId: user._id,
          cart: user.cart,
          address: fullAddress,
          phone,
          name,
          email,
        }).then((res) => {
          if (!isLoading && !isError) {
            setAlertMessage(`Thanh toán ${paymentIntent.status}`);
            setTimeout(() => {
              navigate("/orders");
            }, 2000);
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(fullAddress);
  return (
    <div className="big-tablet:my-4 p-2">
      <form
        onSubmit={handlePay}
        className="flex flex-col w-full px-8 shadow-sm rounded-lg cart-payment"
      >
        {alertMessage && <p>{alertMessage}</p>}
        <div md={6}>
          <label>Họ tên</label>
          <br />
          <input
            type="text"
            placeholder="First Name"
            value={user.name}
            disabled
            className="w-6/12 bg-white small-phone:w-full"
          />
        </div>
        <div md={6}>
          <label>Email</label>
          <br />
          <input
            type="text"
            placeholder="Email"
            value={user.email}
            disabled
            className="w-6/12 bg-white small-phone:w-full"
          />
        </div>
        <div>
          {isOpen === false ? (
            <>
              <label>Địa chỉ</label>
              <div className="flex flex-row">
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={user.address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-6/12 small-phone:w-full"
                />
                <span
                  className={
                    !isOpen
                      ? "mx-4 px-2 py-1 bg-[#132C33] text-white shadow-sm rounded-lg text-center cursor-pointer"
                      : "hidden"
                  }
                  onClick={handleOpen}
                >
                  Chọn địa chỉ khác
                </span>
              </div>
            </>
          ) : (
            <>
              <SelectAddress />
              <label>Địa chỉ</label>
              <input
                className="w-full bg-white"
                type="text"
                placeholder="Nhập địa chỉ"
                value={fullAddress}
                disabled
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="flex flex-row items-center justify-center">
                <div
                  className="m-4 p-2 bg-[#132C33] text-white shadow-sm text-center rounded-lg cursor-pointer big-phone:w-4/12 small-phone:w-/12"
                  onClick={handleOpen}
                >
                  Bỏ qua
                </div>
              </div>
            </>
          )}
        </div>
        <div md={5}>
          <label className="small-phone:text-gray-400 tablet:text-black">
            Điện thoại
          </label>
          <br />
          <input
            type="phone"
            placeholder="Số điện thoại"
            value={user.phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-6/12 small-phone:w-full"
          />
        </div>
        <label
          htmlFor="card-element"
          className="small-phone:text-gray-400 tablet:text-black"
        >
          Thông tin thanh toán
        </label>
        <CardElement className="w-6/12 shadow-sm p-2 rounded-md bg-white small-phone:w-full" />
        {user ? (
          <div className="text-center">
            <button
              className="my-3 bg-[#132C33] big-phone:w-4/12 small-phone:w-/12 button"
              type="submit"
              disabled={user.cart.count <= 0 || paying || isSuccess}
            >
              {paying ? "Đang tiến hành..." : "Thanh toán"}
            </button>
          </div>
        ) : (
          <button className="mt-3 button">
            <Link to="/login">Đăng nhập để thanh toán.</Link>
          </button>
        )}
      </form>
    </div>
  );
}

export default CheckoutForm;
