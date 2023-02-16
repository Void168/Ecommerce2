import React from "react";
import { Link } from "react-router-dom";

function SearchProducts(props) {
  const { product } = props;
  return (
    <Link to={`/product/${product._id}`}>
      <div className="p-4 shadow-sm rounded-lg bg-[#D8E3E7] w-full max-h-max">
        <img
          variant="top"
          className="shadow-sm rounded-lg mb-4 w-full hover:scale-105 ease-in-out duration-300"
          src={product.pictures[0]?.url}
          alt="product-pic"
        />
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

export default SearchProducts;
