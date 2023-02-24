import axios from '../axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'

function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`/orders/${id}`)
      .then(({ data }) => {
        setLoading(false)
        setOrder(data)
      })
      .catch((e) => {
        setLoading(false)
      })
  }, [id])

  console.log(order)
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div>{order?.total}</div>
          <div>{order?.status}</div>
          <div>{order?.address}</div>
          <div>{order?.phone}</div>
          <div>{order?.owner}</div>
          <div>{order?.date}</div>
        </div>
      )}
    </div>
  );
}

export default OrderDetail
