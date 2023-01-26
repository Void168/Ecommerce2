import React from 'react'
import { Link } from 'react-router-dom'

function SimilarProduct({ _id, name, category, pictures }) {
  return (
    <Link to={`/products/${_id}`}>
      <div className="p-2 shadow-sm rounded-lg bg-[#D8E3E7]">
        <img
          variant="top"
          className="max-w-xs shadow-sm max-h-72 rounded-lg ml-1"
          src={pictures[0].url}
          alt="product-pic"
        />
        <h1 className="font-bold">{name}</h1>
        <div bg="warning" text="dark">
          {category}
        </div>
      </div>
    </Link>
  )
}

export default SimilarProduct
