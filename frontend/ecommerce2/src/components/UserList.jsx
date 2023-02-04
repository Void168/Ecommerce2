import React, { useEffect, useState } from 'react'
import axios from '../axios'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    axios
      .get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data)
      })
      .catch((e) => {
        setLoading(false)
        console.log(e)
      })
  }, [])

  return (
    <>
      {users?.length === 0 ? (
        <h2 className="py-2 text-center">Chưa có tài khoản nào</h2>
      ) : (
        <table className="w-full my-4">
          <thead>
            <tr>
              <th>Client Id</th>
              <th>Client Name</th>
              <th>Email</th>
              <th>Các đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            {page === 1 ? (
              <>
                {users.slice(0, 8).map((user) => (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {users.slice(8 * (page - 1), 8 * page).map((user) => (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      )}
      <Stack spacing={2} className="p-1 rounded-lg">
        <Pagination
          count={Math.round(users.length / 8)}
          color="primary"
          onChange={(e, value) => setPage(value)}
        />
      </Stack>
    </>
  )
}

export default UserList
