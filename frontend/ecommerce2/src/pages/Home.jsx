import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../axios'
import ProductPreview from '../components/ProductPreview'
import { updateProducts } from '../features/productSlice'
import { Link } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const lastProducts = products.slice(0, 8)

  useEffect(() => {
    axios.get('/products').then(({ data }) => dispatch(updateProducts(data)))
  }, [dispatch])
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div className=" container mx-auto">
        <h2 className="text-2xl">Sản phẩm đã xem</h2>
        {/* last products */}
        <div className="flex flex-wrap bg-[#132C33] p-4 my-4 justify-between">
          {lastProducts?.map((product) => (
            <ProductPreview {...product} key={product} />
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
