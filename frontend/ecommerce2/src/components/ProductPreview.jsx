import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

function ProductPreview(props) {
  const { product } = props
  return (
    <Link to={`/product/${product._id}`}>
      <div className="p-4 shadow-sm rounded-lg bg-[#D8E3E7] w-full min-h-full">
        <img
          variant="top"
          className="shadow-sm rounded-lg max-h-84 mb-4 w-full"
          src={product.pictures[0]?.url}
          alt="product-pic"
        />
        <h1 className="font-bold">{product.name}</h1>
        <div bg="warning" text="dark">
          {product.category}
        </div>
        <div>
          {(product.price * 24000).toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })}
        </div>
      </div>
    </Link>
  )
}

export default ProductPreview
