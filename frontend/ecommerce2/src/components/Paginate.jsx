import { Pagination, Stack } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function Paginate() {
  const { count, changeIndex, page } = useContext(AppContext)

  return (
    <Stack spacing={2} className="p-1 rounded-lg">
      <Pagination
        count={count}
        page={page}
        color="primary"
        onChange={changeIndex}
      />
    </Stack>
  );
}

export default Paginate
