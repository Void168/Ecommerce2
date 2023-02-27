import React from "react";
import { Link } from "react-router-dom";

function SimilarProduct({ _id, name, category, price, pictures, discount }) {
  return (
    <Link to={`/san-pham/${_id}`}>
      <div className="px-2 py-4 shadow-sm bg-[#D8E3E7]  flex flex-col justify-center big-phone:text-base small-phone:text-xs">
        <div className="relative hover:scale-105 ease-in-out duration-300">
          <span className="absolute right-0 bg-[#132C33] text-white p-1 rounded-bl-lg rounded-tr-lg z-30">
            -{discount}%
          </span>
          <img
            variant="top"
            className="shadow-sm rounded-lg max-h-84 mb-4 w-full bg-white"
            src={pictures[0]?.url}
            alt="product-pic"
          />
        </div>
        <p className="font-bold truncate">{name}</p>
        <div className="truncate">{category}</div>
        <div className="truncate">
          {(price * 24000).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </div>
      </div>
    </Link>
  );
}

export default SimilarProduct;
