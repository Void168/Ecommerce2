require('dotenv').config()
require('./connection')
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')

const server = http.createServer(app)
const { Server } = require('socket.io')

const io = new Server(server, {
  cors: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
})
const stripe = require('stripe')(process.env.CLIENT_STRIPE_SECRET)

const userRoutes = require('./routes/userRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const imagesRoutes = require('./routes/imagesRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')
const articleRoutes = require('./routes/articleRoutes.js')

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
app.use('/orders', orderRoutes)
app.use('/articles', articleRoutes)

app.post('/create-payment', cors(), async (req, res) => {
  const { amount } = req.body
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

app.set('socketio', io)
