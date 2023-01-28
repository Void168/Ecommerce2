import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCreateOrderMutation } from '../services/appApi'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(`${process.env.STRIPE_KEY}`)

function Checkout() {
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
    const { client_secret } = await fetch(
      'http://localhost:8080/create-payment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ',
        },
        body: JSON.stringify({ amount: user.cart.total }),
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
            setAlertMessage(`Payment ${paymentIntent.status}`)
            setTimeout(() => {
              // navigate("/orders");
            }, 3000)
          }
        },
      )
    }
  }
  return (
    <div className="cart-payment-container">
      <form onSubmit={handlePay} className="flex flex-col w-6/12">
        {alertMessage && <alert>{alertMessage}</alert>}
        <div md={6}>
          <form className="mb-3">
            <label>Họ tên</label>
            <input
              type="text"
              placeholder="First Name"
              value={user.name}
              disabled
            />
          </form>
        </div>
        <div md={6}>
          <form className="mb-3">
            <label>Email</label>
            <input
              type="text"
              placeholder="Email"
              value={user.email}
              disabled
            />
          </form>
        </div>
        <div md={7}>
          <form className="mb-3">
            <label>Địa chỉ</label>
            <input
              type="text"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </form>
        </div>
        <div md={5}>
          <form className="mb-3">
            <label>Điện thoại</label>
            <input
              type="phone"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </form>
        </div>
        <label htmlFor="card-element">Thông tin thanh toán</label>
        <CardElement className="w-full" />
        <button
          className="mt-3"
          type="submit"
          disabled={user.cart.count <= 0 || paying || isSuccess}
        >
          {paying ? 'Đang tiến hành...' : 'Thanh toán'}
        </button>
      </form>
    </div>
  )
}

function MyComponent(props) {
  return (
    <Elements stripe={stripePromise}>
      <Checkout {...props} />
    </Elements>
  )
}

export default MyComponent
