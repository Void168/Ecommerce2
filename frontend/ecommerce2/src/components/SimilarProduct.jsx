import React from 'react'
import { Link } from 'react-router-dom'

function SimilarProduct({ _id, name, category, pictures }) {
  return (
    <Link to={`/product/${_id}`}>
      <div className="px-2 py-4 shadow-sm bg-[#D8E3E7]  flex flex-col justify-center">
        <img
          variant="top"
          className="shadow-sm rounded-lg max-h-56 mb-4 max-w-xs"
          src={pictures[0].url}
          alt="product-pic"
        />
        <h1 className="font-bold truncate">{name}</h1>
        <div bg="warning" text="dark">
          {category}
        </div>
      </div>
    </Link>
  )
}

export default SimilarProduct
