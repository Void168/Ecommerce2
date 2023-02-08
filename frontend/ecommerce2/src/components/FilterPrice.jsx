import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import sort from '../sort.js'

function valuetext(value) {
  return value
}

function FilterPrice() {
  const { value, handleChange } = useContext(AppContext)
  return (
    <>
      <p className="text-3xl text-center mt-4 text-white">Sắp xếp</p>
      <div className="container mx-auto my-8 rounded-lg">
        <div className="container mx-auto flex flex-col">
          {sort.map((radio) => (
            <div key={radio.id}>
              <input
                className="sort__radio"
                type="radio"
                name={radio.name}
                value={radio.value}
                id={radio.id}
              />
              <label htmlFor={radio.id} className="sort__label">
                {radio.title}
              </label>
            </div>
          ))}
        </div>
      </div>
      <p className="text-2xl text-center my-4 text-white">
        Kéo để chọn mức giá
      </p>
      <Box className="bg-[#D8E3E7] p-4 w-full my-4">
        <Slider
          max={100000000}
          step={10000}
          getAriaLabel={() => 'Minimum distance'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
      </Box>
      <div className="container mx-auto flex flex-col items-center text-white px-4">
        <div className="flex flex-row justify-between w-full mb-4">
          <span className="pt-2">Từ</span>
          <input
            type="text"
            disabled
            value={value[0].toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
            className="w-8/12 text-right"
          />
        </div>
        <div className="flex flex-row justify-between w-full">
          <span className="pt-2">Đến</span>
          <input
            type="text"
            disabled
            value={value[1].toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
            className="w-8/12 text-right"
          />
        </div>
      </div>
    </>
  )
}

export default FilterPrice
