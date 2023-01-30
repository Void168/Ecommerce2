import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useCreateOrderMutation } from '../services/appApi'

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [alertMessage, setAlertMessage] = useState('')
  const [
    createOrder,
    { isLoading, isError, isSuccess },
  ] = useCreateOrderMutation()
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [paying, setPaying] = useState(false)

  const handlePay = async (e) => {
    e.preventDefault()
    if (!stripe || !elements || user.cart.count <= 0) return
    setPaying(true)
    try {
      const { client_secret } = await fetch(
        'http://localhost:8080/create-payment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_CLIENT_STRIPE_SECRET}`,
          },
          body: JSON.stringify({ amount: Math.round(user.cart.total / 24000) }),
        },
      ).then((res) => res.json())

      const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      setPaying(false)

      if (paymentIntent) {
        createOrder({ userId: user._id, cart: user.cart, address, phone }).then(
          (res) => {
            if (!isLoading && !isError) {
              setAlertMessage(`Thanh toán ${paymentIntent.status}`)
              setTimeout(() => {
                navigate('/orders')
              }, 2000)
            }
          },
        )
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="cart-payment-container">
      <form onSubmit={handlePay} className="flex flex-col w-6/12">
        {alertMessage && <p>{alertMessage}</p>}
        <div md={6}>
          <label>Họ tên</label>
          <input
            type="text"
            placeholder="First Name"
            value={user.name}
            disabled
          />
        </div>
        <div md={6}>
          <label>Email</label>
          <input type="text" placeholder="Email" value={user.email} disabled />
        </div>
        <div md={7}>
          <label>Địa chỉ</label>
          <input
            type="text"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div md={5}>
          <label>Điện thoại</label>
          <input
            type="phone"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <label htmlFor="card-element">Thông tin thanh toán</label>
        <CardElement className="w-full" />
        {user ? (
          <button
            className="mt-3"
            type="submit"
            disabled={user.cart.count <= 0 || paying || isSuccess}
          >
            {paying ? 'Đang tiến hành...' : 'Thanh toán'}
          </button>
        ) : (
          <button className="mt-3">
            <Link to="/login">Đăng nhập để thanh toán.</Link>
          </button>
        )}
      </form>
    </div>
  )
}

export default CheckoutForm
