import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../axios'
import ProductPreview from '../components/ProductPreview'
import { updateProducts } from '../features/productSlice'
import { Link } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const lastProducts = products?.slice(0, 8)

  useEffect(() => {
    axios.get('/products').then(({ data }) => dispatch(updateProducts(data)))
  }, [])

  console.log(products)
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div className="">
        <h2>Sản phẩm đã xem</h2>
        {/* last products */}
        <div className="flex justify-center flex-wrap">
          {lastProducts?.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>
        <div>
          <Link to="/category/all">Xem thêm {'>>'}</Link>
        </div>
      </div>
    </Suspense>
  )
}

export default Home
