import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../axios'
import ProductPreview from '../components/ProductPreview'
import { updateProducts } from '../features/productSlice'
import { useState } from 'react'
import Loading from '../components/Loading'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import WatchedProduct from '../components/WatchedProduct'

function Home() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const lastProducts = products.slice(0, 8)
  const [page, setPage] = useState(1)
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
    <>
      {loading ? (
        <Loading />
      ) : (
        <img
          src="https://wallpapers.com/images/featured/oculus-quest-2-ra1bss24xaa87lrh.jpg"
          alt="banner"
        />
      )}

      <div className="container mx-auto grid grid-flow-row-dense grid-cols-4 my-8">
        <div className="w-full bg-[#126E82] col-span-1 rounded-lg"></div>

        <div className="col-span-3 px-4">
          <div className="container mx-auto">
            <div className="bg-[#126E82] p-4 rounded-lg shadow-sm">
              <div className="grid lg:grid-cols-4 gap-4 my-4 sm:grid-cols-3 h-256">
                {loading ? (
                  <div className=" col-span-4 relative h-screen flex justify-center items-center text-center w-full">
                    <Loading />
                  </div>
                ) : (
                  <>
                    {page === 1 ? (
                      <>
                        {products.slice(0, 8).map((newProduct) => (
                          <ProductPreview
                            {...newProduct}
                            key={newProduct._id}
                            product={newProduct}
                          />
                        ))}
                      </>
                    ) : (
                      <>
                        {products
                          .slice(8 * (page - 1), 8 * page)
                          .map((newProduct) => (
                            <ProductPreview
                              {...newProduct}
                              key={newProduct._id}
                              product={newProduct}
                            />
                          ))}
                      </>
                    )}
                  </>
                )}
              </div>
              <Stack spacing={2} className="p-1 rounded-lg">
                <Pagination
                  count={Math.round(products.length / 8)}
                  color="primary"
                  onChange={(e, value) => setPage(value)}
                />
              </Stack>
            </div>
          </div>

          {/* <div>
              <Link to="/category/all">Xem thêm {'>>'}</Link>
            </div> */}
        </div>
      </div>
      {/* last products */}
      <div className="container mx-auto">
        <h2 className="text-2xl">Sản phẩm đã xem</h2>
        <div className="grid lg:grid-cols-8 gap-4 bg-[#126E82] p-4 my-4 sm:grid-cols-4 rounded-lg shadow-sm">
          {loading ? (
            <Loading />
          ) : (
            <>
              {lastProducts?.map((product) => (
                <WatchedProduct
                  {...product}
                  key={product._id}
                  product={product}
                  className="min-h-max"
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
