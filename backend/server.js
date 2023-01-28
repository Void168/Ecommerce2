require('dotenv').config()
require('./connection')
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const stripe = require('stripe')(process.env.CLIENT_STRIPE_SECRET)
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
})

const User = require('./models/userModel.js')
const userRoutes = require('./routes/userRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const imagesRoutes = require('./routes/imagesRoutes.js')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Server is ready')
})

// Use routes
app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/images', imagesRoutes)

app.post('/create-payment', async (req, res) => {
  const { amount } = req.body
  console.log(amount)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    })
    res.status(200).json(paymentIntent)
  } catch (e) {
    console.log(e.message)
    res.status(400).json(e.message)
  }
})

server.listen(8080, () => {
  console.log('listening on port', 8080)
})
