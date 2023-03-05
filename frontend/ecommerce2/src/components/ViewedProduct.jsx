import React from 'react'
import { Link } from 'react-router-dom'

function ViewedProduct({ _id, name, category, price, pictures, discount }) {
  return (
    <Link to={`/san-pham/${_id}`}>
      <div className="p-4 shadow-sm rounded-lg bg-[#D8E3E7] max-w-full">
        <img
          variant="top"
          className="shadow-sm rounded-lg mb-4 tablet:w-full tablet:h-full"
          src={pictures[0]?.url}
          alt="product-pic"
        />
        <p className="truncate">{name}</p>
        <p className="truncate">
          {category}
        </p>
        <p className="truncate">
          {(price * 24000).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      </div>
    </Link>
  );
}

export default ViewedProduct;
