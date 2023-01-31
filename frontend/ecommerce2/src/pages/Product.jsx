import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { useEffect } from 'react'
import axios from '../axios'
import Loading from '../components/Loading'
import SimilarProduct from '../components/SimilarProduct'
import { useAddToCartMutation } from '../services/appApi'
import ToastMessage from '../components/ToastMessage'

function Product() {
  const { id } = useParams()
  const user = useSelector((state) => state.user)
  const [product, setProduct] = useState(null)
  const [similar, setSimilar] = useState(null)
  const [addToCart, { isSuccess }] = useAddToCartMutation()
  const navigate = useNavigate()
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
    return (
      <div className="container mx-auto">
        <Loading />
      </div>
    )
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
      <div className="container mx-auto" data-value={index} key={product}>
        <SimilarProduct {...product} />
      </div>
    ))
  }

  const navigateToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="container mx-auto">
      <div className="my-8 grid grid-cols-2">
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
            <p>
              {(product.price * 24000).toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </p>
            <strong>{product.description}</strong>
          </div>
          <div className="flex justify-around">
            {!user ? (
              <button className="bg-[#132C33]" onClick={navigateToLogin}>
                Đăng nhập để mua hàng
              </button>
            ) : (
              <button
                className="w-3/12 bg-[#132C33]"
                onClick={(e) =>
                  addToCart({
                    userId: user._id,
                    productId: id,
                    price: product.price,
                    image: product.pictures[0].url,
                  })
                }
              >
                Thêm vào giỏ
              </button>
            )}
          </div>
          {user && user.isAdmin && (
            <Link to={`/product/${product._id}/edit`}>
              <button>Sửa thông tin sản phẩm</button>
            </Link>
          )}
          {isSuccess && (
            <ToastMessage
              bg="info"
              title="Thông báo"
              body={`${product.name} đã được thêm vào giỏ hàng`}
            >
              <Link to="/cart"></Link>
            </ToastMessage>
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
    </div>
  )
}

export default Product
