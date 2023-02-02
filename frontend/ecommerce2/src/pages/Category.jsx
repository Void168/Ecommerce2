import axios from 'axios'
import React, { Suspense } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ProductPreview from '../components/ProductPreview'
import { updateProducts } from '../features/productSlice'

function Category() {
  const { category } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(4)
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4)
    return <Loading />
  }
  const products = useSelector((state) => state.products)
  const [searchTerm, setSearchTerm] = useState('')
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

  useEffect(() => {
    axios.get('/products').then(({ data }) => dispatch(updateProducts(data)))
  }, [dispatch])

  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [])

  return (
    <div className="container mx-auto">
      <div>
        <p className="text-center font-bold text-3xl my-2">{categoryName}</p>
      </div>
      <div className="text-center">
        <input
          className="w-6/12 px-4"
          type="search"
          placeholder="Tìm kiếm"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          {productsSearch.length === 0 ? (
            <p>Không tìm thấy sản phẩm phù hợp</p>
          ) : (
            <>
              {loading ? (
                <Loading />
              ) : (
                <div className="my-8 grid lg:grid-cols-4 gap-4 bg-[#126E82] p-4 sm:grid-cols-3">
                  {productsSearch
                    .filter((product) => product.category === categoryName)
                    .map((filteredProduct) => (
                      <ProductPreview
                        key={filteredProduct}
                        product={filteredProduct}
                      />
                    ))}
                </div>
              )}
            </>
          )}
          {products.length <= visible ? null : (
            <button onClick={showMoreItems}>Xem thêm</button>
          )}
        </Suspense>
      )}
    </div>
  )
}

export default Category
