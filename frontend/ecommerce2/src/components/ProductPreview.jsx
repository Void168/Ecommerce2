import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useAddToCartMutation } from "../services/appApi";
import Rating from "./Rating";
import ToastMessage from "./ToastMessage";

function ProductPreview({
  _id,
  name,
  description,
  price,
  pictures,
  discount,
  rating,
}) {
  const { user, USD_VND_EXCHANGE_RATE, exchangePrice } = useContext(AppContext);
  const priceByVND = exchangePrice(price * USD_VND_EXCHANGE_RATE);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  return (
    <>
      {/* Toast message when add to cart successfully */}
      {isSuccess && (
        <ToastMessage
          bg="info"
          title="Thông báo"
          body={`${name} đã được thêm vào giỏ hàng`}
        >
          <Link to="/cart"></Link>
        </ToastMessage>
      )}

      {/* Card product */}
      <div className="relative card p-4 shadow-sm rounded-lg bg-[#D8E3E7] w-full small-phone:text-xs big-phone:text-base">
        <Link to={`/san-pham/${_id}`}>
          {/* Product image */}
          <div className="relative hover:scale-105 ease-in-out duration-300">
            <img
              variant="top"
              className="shadow-sm rounded-lg max-h-max mb-4 w-full bg-white"
              src={pictures[0]?.url}
              alt="product-pic"
            />
          </div>

          {/* Product name */}
          <p className="font-bold truncate">{name}</p>

          {/* Product description */}
          <div
            bg="warning"
            text="dark"
            className="galaxy-fold:truncate
        "
          >
            {description}
          </div>

          {/* Product price change to VND */}
          <div className="flex big-desktop:flex-row big-tablet:flex-col tablet:flex-row small-phone:flex-col tablet:justify-between small-phone:justify-start small-phone:items-center">
            <div className="big-phone:py-4 flex flex-col big-desktop:justify-start big-tablet:justify-center big-tablet:items-center">
              <div className="truncate line-through">{priceByVND}</div>
              <div className="truncate text-red-500">
                {(
                  (price * USD_VND_EXCHANGE_RATE * (100 - discount)) /
                  100
                ).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              {/* Product rating */}
              <Rating rating={rating}></Rating>
              {/* Product discount */}
              {discount > 0 ? (
                <div className="p-1 text-xs border-t border-[#132C33]">
                  Giảm giá {discount}%
                </div>
              ) : null}
            </div>
          </div>
        </Link>

        <div className="laptop:block small-phone:hidden">
          <Link to={`/san-pham/${_id}`}>
            <div className="add-to-cart container mx-auto absolute top-0 left-0 w-full h-full bg-black rounded-lg inset-4 opacity-50 hover:duration-150 hover:shadow-slate-100 hover:shadow-xl ease-in-out"></div>
          </Link>

          {/* Add to cart button */}
          <button
            className="button1 absolute inset-x-10 inset-y-36 max-h-max"
            onClick={(e) =>
              addToCart({
                userId: user._id,
                productId: _id,
                price: price,
                image: pictures[0].url,
              })
            }
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductPreview;
