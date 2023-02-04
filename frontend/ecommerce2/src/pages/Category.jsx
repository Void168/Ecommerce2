import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ProductPreview from '../components/ProductPreview'
import { updateProducts } from '../features/productSlice'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'

function Category() {
  const { category } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const products = useSelector((state) => state.products)
  const [searchTerm, setSearchTerm] = useState('')
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

  useEffect(() => {
    axios.get('/products').then(({ data }) => dispatch(updateProducts(data)))
  }, [dispatch])

  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }

  useEffect(() => {
    setLoading(true)
    setPage(1)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [categoryName])

  return (
    <div className="container mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            <p className="text-center font-bold text-3xl my-2">
              {categoryName}
            </p>
          </div>
          <div className="text-center">
            <input
              value={searchTerm}
              className="w-6/12 px-4"
              type="search"
              placeholder="Tìm kiếm"
              onChange={handleSearch}
            />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              {productsSearch.length === 0 ? (
                <p>Không tìm thấy sản phẩm phù hợp</p>
              ) : (
                <>
                  {page === 1 ? (
                    <div className="my-8 grid lg:grid-cols-4 gap-4 bg-[#126E82] p-4 sm:grid-cols-3">
                      {productsSearch
                        .filter((product) => product.category === categoryName)
                        .slice(0, 8)
                        .map((filteredProduct) => (
                          <ProductPreview
                            key={filteredProduct}
                            product={filteredProduct}
                          />
                        ))}
                    </div>
                  ) : (
                    <div className="my-8 grid lg:grid-cols-4 gap-4 bg-[#126E82] p-4 sm:grid-cols-3">
                      {productsSearch
                        .filter((product) => product.category === categoryName)
                        .slice(8 * (page - 1), 8 * page)
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
            </>
          )}
          <Stack spacing={2} className="p-1 rounded-lg">
            <Pagination
              count={Math.round(
                productsSearch.filter(
                  (product) => product.category === categoryName,
                ).length / 8,
              )}
              color="primary"
              onChange={(e, value) => setPage(value)}
            />
          </Stack>
        </>
      )}
    </div>
  )
}

export default Category
