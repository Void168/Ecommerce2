import { Pagination, Stack } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function Paginate() {
  const { count, changeIndex } = useContext(AppContext)

  return (
    <Stack spacing={2} className="p-1 rounded-lg">
      <Pagination count={count} color="primary" onChange={changeIndex} />
    </Stack>
  )
}

export default Paginate
