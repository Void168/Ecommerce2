import express from 'express'
const orderRouter = express.Router()

import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'

//creating an order

orderRouter.post('/', async (req, res) => {
  const io = req.app.get('socketio')
  const { userId, cart } = req.body
  try {
    const user = await User.findById(userId)
    const order = new Order({
      owner: user._id,
      name: user.name,
      email: user.email,
      products: cart,
      phone: user.phone || req.body.phone,
      address: user.address || req.body.address,
    })
    order.count = cart.count
    order.total = cart.total
    await order.save()
    user.cart = { total: 0, count: 0 }
    user.orders.push(order)
    const notification = {
      status: 'Chưa xem',
      message: `Có đơn hàng mới của ${user.name}`,
      time: new Date(),
    }
    io.sockets.emit('Đơn hàng mới', notification)
    user.markModified('orders')
    await user.save()
    res.status(200).json(user)
  } catch (e) {
    res.status(400).json(e.message)
  }
})

// getting all orders;
orderRouter.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('owner', ['email', 'name'])
    res.status(200).json(orders)
  } catch (e) {
    res.status(400).json(e.message)
  }
})

// Get single order
orderRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const order = await Order.findById(id)
    res.status(200).json({ order })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

//shipping order

orderRouter.patch('/:id/mark-shipped', async (req, res) => {
  const io = req.app.get('socketio')
  const { ownerId } = req.body
  const { id } = req.params
  try {
    const user = await User.findById(ownerId)
    await Order.findByIdAndUpdate(id, { status: 'Đã giao hàng' })
    const orders = await Order.find().populate('owner', ['email', 'name'])
    const notification = {
      status: 'chưa đọc',
      message: `Đơn hàng ${id} đã vận chuyển thành công`,
      time: new Date(),
    }
    io.sockets.emit('notification', notification, ownerId)
    user.notifications.push(notification)
    await user.save()
    res.status(200).json(orders)
  } catch (e) {
    res.status(400).json(e.message)
  }
})

export default orderRouter
