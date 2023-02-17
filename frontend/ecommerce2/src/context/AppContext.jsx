import { createContext, useState } from 'react'
import { useSelector } from 'react-redux'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [value, setValue] = useState([0, 100000000])
  const [page, setPage] = useState(1)
  const products = useSelector((state) => state.products)
  const [gender, setGender] = useState('newest')
  
  const isChecked = (e) => {
    setGender(e.target.value)
  }

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

  const resetPage = () => {
    setPage(1)
  }

  const sortPrice = (a, b) => {
    if (a.price < b.price) {
      return -1
    }
    if (a.price > b.price) {
      return 1
    }
    return 0
  }

  const sortAlphabet = (a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  }

  return (
    <AppContext.Provider
      value={{
        value,
        handleChange,
        page,
        changeIndex,
        count,
        resetPage,
        gender,
        isChecked,
        sortPrice,
        sortAlphabet,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
