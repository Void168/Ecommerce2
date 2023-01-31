import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../axios'
import ProductPreview from '../components/ProductPreview'
import { updateProducts } from '../features/productSlice'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../components/Loading'

function Home() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const lastProducts = products.slice(0, 8)
  const [visible, setVisible] = useState(12)
  const [loading, setLoading] = useState(false)

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 12)
    return <Loading />
  }

  useEffect(() => {
    axios.get('/products').then(({ data }) => dispatch(updateProducts(data)))
  }, [dispatch])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [])

  return (
    <div className=" container mx-auto">
      <h2 className="text-2xl">Sản phẩm đã xem</h2>
      {/* last products */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-4 gap-4 bg-[#126E82] p-4 my-4 sm:grid-cols-3">
              {loading ? (
                <Loading />
              ) : (
                <>
                  {lastProducts?.map((product) => (
                    <ProductPreview
                      {...product}
                      key={product}
                      product={product}
                    />
                  ))}
                </>
              )}
            </div>
            <h2 className="text-2xl">Sản phẩm mới</h2>
            <div className="grid lg:grid-cols-4 gap-4 bg-[#126E82] p-4 my-4 sm:grid-cols-3">
              {loading ? (
                <Loading />
              ) : (
                <>
                  {products.slice(0, visible).map((newProduct) => (
                    <ProductPreview
                      {...newProduct}
                      key={newProduct}
                      product={newProduct}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
          {products.length <= visible ? null : (
            <button onClick={showMoreItems}>Xem thêm</button>
          )}

          <div>
            <Link to="/category/all">Xem thêm {'>>'}</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
