import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAddToCartMutation } from "../services/appApi";
import Rating from "./Rating";
import ToastMessage from "./ToastMessage";

function ProductPreview({
  _id,
  name,
  category,
  price,
  pictures,
  discount,
  rating,
}) {
  const user = useSelector((state) => state.user);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  return (
    <>
      {isSuccess && (
        <ToastMessage
          bg="info"
          title="Thông báo"
          body={`${name} đã được thêm vào giỏ hàng`}
        >
          <Link to="/cart"></Link>
        </ToastMessage>
      )}
      <div className="relative card p-4 shadow-sm rounded-lg bg-[#D8E3E7] w-full small-phone:text-xs big-phone:text-base">
        <Link to={`/san-pham/${_id}`}>
          <div className="relative hover:scale-105 ease-in-out duration-300">
            {discount > 0 ? (
              <span className="absolute right-0 bg-red-500 text-[#D8E3E7] p-1 rounded-bl-lg rounded-tr-lg z-30">
                -{discount}%
              </span>
            ) : null}

            <img
              variant="top"
              className="shadow-sm rounded-lg max-h-max mb-4 w-full bg-white"
              src={pictures[0]?.url}
              alt="product-pic"
            />
          </div>

          <p className="font-bold truncate">{name}</p>
          <div
            bg="warning"
            text="dark"
            className="galaxy-fold:truncate
        "
          >
            {category}
          </div>
          <div className="truncate">
            {(price * 24000).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </div>
          <Rating rating={rating}></Rating>
        </Link>
        <div className="laptop:block small-phone:hidden">
          <Link to={`/san-pham/${_id}`}>
            <div className="add-to-cart container mx-auto absolute top-0 left-0 w-full h-full bg-black rounded-lg inset-4 opacity-50 hover:duration-150 ease-in-out"></div>
          </Link>
          <button
            className="button absolute inset-x-10 inset-y-36 max-h-max"
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
