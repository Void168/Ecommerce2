import React from 'react'
import { Link } from 'react-router-dom'

function WatchedProduct(props) {
  const { product } = props
  return (
    <Link to={`/product/${product._id}`}>
      <div className="p-4 shadow-sm rounded-lg bg-[#D8E3E7] max-w-full">
        <img
          variant="top"
          className="shadow-sm rounded-lg mb-4 tablet:w-full tablet:h-full"
          src={product.pictures[0]?.url}
          alt="product-pic"
        />
        <h1 className="font-bold truncate">{product.name}</h1>
        <div bg="warning" text="dark">
          {product.category}
        </div>
        <div className='truncate'>
          {(product.price * 24000).toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })}
        </div>
      </div>
    </Link>
  )
}

export default WatchedProduct
