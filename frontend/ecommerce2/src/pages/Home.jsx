import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppContext } from '../context/AppContext'
import axios from '../axios'
import ProductPreview from '../components/ProductPreview'
import { updateProducts } from '../features/productSlice'
import { useState } from 'react'
import Loading from '../components/Loading'
import Paginate from '../components/Paginate'
import WatchedProduct from '../components/WatchedProduct'
import FilterPrice from '../components/FilterPrice'

function Home() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const lastProducts = products.slice(0, 8)
  const [loading, setLoading] = useState(false)
  const { value, page, gender, sortPrice, sortAlphabet } = useContext(
    AppContext,
  )

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
                        {gender === 'newest' ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000,
                              )
                              .slice(0, 8)
                              .map((product) => (
                                <ProductPreview
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))}
                          </>
                        ) : gender === 'oldest' ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000,
                              )
                              .slice(products.length - 8, products.length)
                              .map((product) => (
                                <ProductPreview
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))
                              .reverse()}
                          </>
                        ) : gender === 'lowtohigh' ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000,
                              )
                              .sort(sortPrice)
                              .slice(0, 8)
                              .map((product) => (
                                <ProductPreview
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))}
                          </>
                        ) : gender === 'hightolow' ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000,
                              )
                              .sort(sortPrice)
                              .reverse()
                              .slice(0, 8)
                              .map((product) => (
                                <ProductPreview
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))}
                          </>
                        ) : gender === 'atoz' ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000,
                              )
                              .sort(sortAlphabet)
                              .slice(0, 8)
                              .map((product) => (
                                <ProductPreview
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))}
                          </>
                        ) : gender === 'ztoa' ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000,
                              )
                              .slice(0, 8)
                              .sort(sortAlphabet)
                              .reverse()
                              .map((product) => (
                                <ProductPreview
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))}
                          </>
                        ) : null}
                      </>
                    ) : products.filter(
                        (filteredProduct) =>
                          value[0] / 24000 <=
                          filteredProduct.price <=
                          value[1] / 24000,
                      ).length === 0 ? (
                      <div>Bạn hãy điều chỉnh lại giá nhé</div>
                    ) : (
                      <>
                        {gender === 'newest' ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000,
                              )
                              .slice(8 * (page - 1), 8 * page)
                              .map((product) => (
                                <ProductPreview
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))}
                          </>
                        ) : gender === 'oldest' ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000,
                              )
                              .slice(
                                8 * (Math.round(products.length / 8) - page),
                                8 *
                                  (Math.round(products.length / 8) - page + 1),
                              )
                              .map((product) => (
                                <ProductPreview
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))
                              .reverse()}
                          </>
                        ) : gender === 'lowtohigh' ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000,
                              )
                              .sort(sortPrice)
                              .slice(8 * (page - 1), 8 * page)
                              .map((product) => (
                                <ProductPreview
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))}
                          </>
                        ) : gender === 'hightolow' ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000,
                              )
                              .sort(sortPrice)
                              .reverse()
                              .slice(8 * (page - 1), 8 * page)
                              .map((product) => (
                                <ProductPreview
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))}
                          </>
                        ) : gender === 'atoz' ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000,
                              )
                              .sort(sortAlphabet)
                              .slice(8 * (page - 1), 8 * page)
                              .map((product) => (
                                <ProductPreview
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))}
                          </>
                        ) : gender === 'ztoa' ? (
                          <>
                            {products
                              .filter(
                                (filteredProduct) =>
                                  value[0] / 24000 <= filteredProduct.price &&
                                  filteredProduct.price <= value[1] / 24000,
                              )
                              .sort(sortAlphabet)
                              .reverse()
                              .slice(8 * (page - 1), 8 * page)
                              .map((product) => (
                                <ProductPreview
                                  {...product}
                                  key={product._id}
                                  product={product}
                                />
                              ))}
                          </>
                        ) : null}
                      </>
                    )}
                  </>
                )}
              </div>
              <Paginate />
            </div>
          </div>
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
              {lastProducts?.map((lastProduct) => (
                <WatchedProduct
                  {...lastProduct}
                  key={lastProduct._id}
                  product={lastProduct}
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
