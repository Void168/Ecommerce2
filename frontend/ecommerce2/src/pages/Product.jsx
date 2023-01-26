import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AliceCarousel from 'react-alice-carousel'
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
    <div className="container">
      <div>
        <AliceCarousel
          mouseTracking
          items={images}
          controlsStrategy="alternate"
        />
      </div>
      <div>
        <h1>{product.name}</h1>
        <p>{product.category}</p>
        <p>{product.price}</p>
        <strong>{product.description}</strong>
      </div>
    </div>
  )
}

export default Product
