import React from 'react'
import { Link } from 'react-router-dom'

function ViewedProduct({ _id, name, category, price, pictures, discount }) {
  return (
    <Link to={`/san-pham/${_id}`}>
      <div className="p-4 shadow-sm rounded-lg bg-[#D8E3E7] max-w-full">
        {/* Viewed product image */}
        <img
          variant="top"
          className="shadow-sm rounded-lg mb-4 tablet:w-full tablet:h-full"
          src={pictures[0]?.url}
          alt="product-pic"
        />

        {/* Viewed product name */}
        <p className="truncate">{name}</p>

        {/* Viewed product category */}
        <p className="truncate">{category}</p>

        {/* Viewed product price change to VND */}
        <p className="truncate line-through">
          {(price * 24000).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </p>

        {/* Viewed product price discount to VND*/}
        <p className="truncate text-red-500">
          {((price * 24000 * (100 - discount)) / 100).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      </div>
    </Link>
  );
}

export default ViewedProduct;
