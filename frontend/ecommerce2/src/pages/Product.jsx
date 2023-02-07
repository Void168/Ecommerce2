import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from '../axios'
import Loading from '../components/Loading'
import SimilarProduct from '../components/SimilarProduct'
import { useAddToCartMutation } from '../services/appApi'
import ToastMessage from '../components/ToastMessage'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from '../image'

function Product() {
  const { id } = useParams()
  const user = useSelector((state) => state.user)
  const [product, setProduct] = useState(null)
  const [similar, setSimilar] = useState(null)
  const [selected, setSelected] = useState(Image[1])
  const [loading, setLoading] = useState(false)

  const [addToCart, { isSuccess }] = useAddToCartMutation()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product)
      setSimilar(data.similar)
    })
  }, [id])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [id])

  if (!product) {
    return (
      <div className="container mx-auto">
        <Loading />
      </div>
    )
  }

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
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="my-8 grid grid-cols-5">
            <div className="col-span-2">
              <div className="text-black mb-8">
                Trang chủ <i className="fas fa-caret-right"></i>
                <Link to={`/category/${product.category.toLocaleLowerCase()}`}>
                  {' '}
                  {product.category}{' '}
                </Link>
                <i className="fas fa-caret-right"></i>
                {/* {product.type} <i class="fas fa-caret-right"></i> */}{' '}
                {product.name}
              </div>
              <div className="p-4">
                <img
                  src={product.pictures[0].url}
                  alt={product.name}
                  className="w-full bg-[#fff] hover:scale-105 ease-in-out duration-300"
                />
                <div className="flex flex-row justify-between my-8">
                  {Image.map((img, index) => (
                    <div>
                      <img
                        key={index}
                        src={img}
                        alt="gallery"
                        style={{
                          border: selected === img ? '3px solid #132C33' : '',
                        }}
                        onClick={() => setSelected(img)}
                        className="hover:cursor-pointer w-24 h-24"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <p className="text-4xl text-center mb-4">Thông tin sản phẩm</p>
              <div className=" py-4 px-8">
                <div className="text-xl">
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
                <div className="my-4">
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
                    <button className="bg-[#132C33]">
                      Sửa thông tin sản phẩm
                    </button>
                  </Link>
                )}
              </div>

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
            <div className="flex justify-center items-center flex-wrap w-full">
              <Swiper
                watchSlidesProgress={true}
                slidesPerView={4}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="shadow-sm outline-0"
              >
                {similarProducts.map((product) => (
                  <SwiperSlide key={product.id}>{product}</SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Product
