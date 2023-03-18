import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function SimilarProduct({ _id, name, category, price, pictures, discount }) {
  const { USD_VND_EXCHANGE_RATE, exchangePrice } = useContext(AppContext);
  const exchangedPrice = exchangePrice(price * USD_VND_EXCHANGE_RATE);
  return (
    <Link to={`/san-pham/${_id}`}>
      <div className="px-2 py-4 shadow-sm bg-[#D8E3E7]  flex flex-col justify-center big-phone:text-base small-phone:text-xs">
        <div className="relative hover:scale-105 ease-in-out duration-300">
          {/* Similar product discount */}
          <span className="absolute right-0 bg-[#132C33] text-white p-1 rounded-bl-lg rounded-tr-lg z-30">
            -{discount}%
          </span>

          {/* Similar product image */}
          <img
            variant="top"
            className="shadow-sm rounded-lg max-h-84 mb-4 w-full bg-white"
            src={pictures[0]?.url}
            alt="product-pic"
          />
        </div>

        {/* Similar product name */}
        <p className="font-bold truncate">{name}</p>

        {/* Similar product category */}
        <div className="truncate">{category}</div>

        {/* Similar product price change to VND */}
        <p className="truncate line-through">{exchangedPrice}</p>
        <p className="truncate text-red-500">
          {(
            (price * USD_VND_EXCHANGE_RATE * (100 - discount)) /
            100
          ).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      </div>
    </Link>
  );
}

export default SimilarProduct;
