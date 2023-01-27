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
  const [loading, setLoading] = useState(false)

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
          <div className="flex flex-wrap bg-[#126E82] p-4 my-4 justify-between">
            {lastProducts?.map((product) => (
              <ProductPreview {...product} key={product} product={product} />
            ))}
          </div>
          <div>
            <Link to="/category/all">Xem thêm {'>>'}</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
