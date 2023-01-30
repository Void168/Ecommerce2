import React, { useEffect, useState } from 'react'
import axios from '../axios'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

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
        <table className="w-full">
          <thead>
            <tr>
              <th>Client Id</th>
              <th>Client Name</th>
              <th>Email</th>
              <th>Các đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default UserList
