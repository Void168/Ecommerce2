const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
require('./connection')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: '*',
  methods: '*',
})

const User = require('./models/userModel.js')
const userRoutes = require('./routes/userRoutes.js')
const productRoutes = require('./routes/productRoutes.js')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Server is ready')
})

// Use routes
app.use('/users', userRoutes)
app.use('/products', productRoutes)

server.listen(8080, () => {
  console.log('listening on port', 8080)
})
