import axios from 'axios'
import React from 'react'
import { useEffect, useContext } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ProductPreview from '../components/ProductPreview'
import { updateProducts } from '../features/productSlice'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import FilterPrice from '../components/FilterPrice'
import { AppContext } from '../context/AppContext'

function Category() {
  const { category } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const products = useSelector((state) => state.products)
  const [searchTerm, setSearchTerm] = useState('')
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)
  const { value, page, count, changeIndex, resetPage } = useContext(AppContext)

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
    resetPage()
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
          <div className="container mx-auto grid grid-flow-row-dense grid-cols-4 my-8">
            <div className="w-full bg-[#126E82] col-span-1 rounded-lg shadow-sm">
              <FilterPrice />
              <p className="text-white px-4 mt-8 text-2xl text-center">
                Có{' '}
                {
                  products.filter(
                    (filteredProduct) =>
                      value[0] / 24000 <= filteredProduct.price &&
                      filteredProduct.price <= value[1] / 24000,
                  ).length
                }{' '}
                sản phẩm
              </p>
            </div>
            <div className="container mx-auto col-span-3 px-4">
              <div className="">
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    {productsSearch.length === 0 ? (
                      <p>Không tìm thấy sản phẩm phù hợp</p>
                    ) : (
                      <div className="rounded-lg shadow-sm bg-[#126E82] py-4">
                        <div className="grid lg:grid-cols-4 gap-4 p-4 sm:grid-cols-3 h-256">
                          {page === 1 ? (
                            <>
                              {productsSearch
                                .filter(
                                  (product) =>
                                    product.category === categoryName,
                                )
                                .slice(0, 8)
                                .map((filteredProduct) => (
                                  <ProductPreview
                                    key={filteredProduct}
                                    product={filteredProduct}
                                  />
                                ))}
                            </>
                          ) : (
                            <>
                              {productsSearch
                                .filter(
                                  (product) =>
                                    product.category === categoryName,
                                )
                                .slice(8 * (page - 1), 8 * page)
                                .map((filteredProduct) => (
                                  <ProductPreview
                                    key={filteredProduct}
                                    product={filteredProduct}
                                  />
                                ))}
                            </>
                          )}
                        </div>
                        <Stack spacing={2} className="p-4 rounded-lg">
                          <Pagination
                            count={Math.round(
                              productsSearch.filter(
                                (product) => product.category === categoryName,
                              ).length / 8,
                            )}
                            color="primary"
                            onChange={changeIndex}
                          />
                        </Stack>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Category
