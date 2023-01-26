import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { useEffect } from 'react'
import axios from '../axios'
import Loading from '../components/Loading'
import SimilarProduct from '../components/SimilarProduct'

function Product() {
  const { id } = useParams()
  const user = useSelector((state) => state.user)
  const [product, setProduct] = useState(null)
  const [similar, setSimilar] = useState(null)

  const handleDragStart = (e) => {
    e.preventDefault()
  }
  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product)
      setSimilar(data.similar)
    })
  }, [id])

  if (!product) {
    return <Loading />
  }

  const responsive = {
    0: { items: 1 },
    768: { items: 2 },
    1024: { items: 3 },
  }

  const images = product.pictures.map((picture) => (
    <img src={picture.url} alt="product-pic" onDragStart={handleDragStart} />
  ))

  let similarProducts = []
  if (similar) {
    similarProducts = similar.map((product, index) => (
      <div className="" data-value={index} key={product}>
        <SimilarProduct {...product} />
      </div>
    ))
  }

  return (
    <>
      <div className="container mx-auto my-8 grid grid-cols-2">
        <div>
          <AliceCarousel
            mouseTracking
            items={images}
            controlsStrategy="alternate"
          />
        </div>
        <div>
          <p className="text-4xl text-center">Thông tin sản phẩm</p>
          <div className="text-center">
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{product.price}</p>
            <strong>{product.description}</strong>
          </div>
          <div className="flex justify-around">
            <select className="w-3/12 px-2 rounded-md">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button className="w-3/12 bg-[#132C33]">Thêm vào giỏ</button>
          </div>
          {user && user.isAdmin && (
            <Link to={`/product/${product.id}/edit`}>
              <button>Sửa thông tin sản phẩm</button>
            </Link>
          )}
        </div>
      </div>
      <div>
        <p>Sản phẩm tương tự</p>
        <div className="flex justify-center items-center flex-wrap">
          <AliceCarousel
            mouseTracking
            items={similarProducts}
            responsive={responsive}
            controlsStrategy="alternate"
          />
        </div>
      </div>
    </>
  )
}

export default Product
