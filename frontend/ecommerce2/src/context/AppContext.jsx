import { createContext, useState } from 'react'
import { useSelector } from 'react-redux'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [value, setValue] = useState([0, 100000000])
  const [page, setPage] = useState(1)
  const products = useSelector((state) => state.products)

  const count = Math.ceil(
    products.filter(
      (filteredProduct) =>
        value[0] / 24000 <= filteredProduct.price &&
        filteredProduct.price <= value[1] / 24000,
    ).length / 8,
  )

  const minDistance = 100000

  const changeIndex = (event, index) => {
    setPage(index)
  }

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
    }

    if (page - count === 1) setPage(count)
  }

  return (
    <AppContext.Provider
      value={{ value, handleChange, page, changeIndex, count }}
    >
      {children}
    </AppContext.Provider>
  )
}
