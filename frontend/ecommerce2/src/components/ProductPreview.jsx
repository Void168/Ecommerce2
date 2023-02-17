import React from "react";
import { Link } from "react-router-dom";

function ProductPreview(props) {
  const { product } = props;
  return (
    <Link to={`/san-pham/${product._id}`}>
      <div className="p-4 shadow-sm rounded-lg bg-[#D8E3E7] w-full max-h-xl">
        <div className="relative hover:scale-105 ease-in-out duration-300">
          <span className="absolute right-0 bg-[#132C33] text-white p-1 rounded-bl-lg rounded-tr-lg z-30">
            -{product.discount}%
          </span>
          <img
            variant="top"
            className="shadow-sm rounded-lg max-h-84 mb-4 w-full bg-white"
            src={product.pictures[0]?.url}
            alt="product-pic"
          />
        </div>

        <h1 className="font-bold truncate">{product.name}</h1>
        <div
          bg="warning"
          text="dark"
          className="galaxy-fold:truncate
        "
        >
          {product.category}
        </div>
        <div className="truncate">
          {(product.price * 24000).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </div>
      </div>
    </Link>
  );
}

export default ProductPreview;
