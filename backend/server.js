import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import http from 'http';
import Stripe from 'stripe';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import imagesRouter from './routes/imagesRoutes.js';
import articleRouter from './routes/articleRoutes.js';
import { Server } from 'socket.io';

const app = express()
dotenv.config();

const server = http.createServer(app)
const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.wuclx.mongodb.net/test`

mongoose
  .connect(connectionString, { useNewUrlparser: true })
  .then(() => console.log('connected to MongoDB'))
  .catch((err) => console.log(err))

mongoose.connection.on('error', (err) => console.log(err))

const io = new Server(server, {
  cors: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
})

const stripe = new Stripe(`${process.env.CLIENT_STRIPE_SECRET}`);

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Server is ready')
})

// Use routes
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/images', imagesRouter)
app.use('/orders', orderRouter)
app.use('/articles', articleRouter)

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
