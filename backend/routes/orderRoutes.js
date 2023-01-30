const router = require('express').Router()

const Order = require('../models/orderModel.js')
const User = require('../models/userModel.js')

//creating an order

router.post('/', async (req, res) => {
  const io = req.app.get('socketio')
  const { userId, cart, phone, address } = req.body
  try {
    const user = await User.findById(userId)
    const order = new Order({
      owner: user._id,
      products: cart,
      phone,
      address,
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
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('owner', ['email', 'name'])
    res.status(200).json(orders)
  } catch (e) {
    res.status(400).json(e.message)
  }
})

//shipping order

router.patch('/:id/mark-shipped', async (req, res) => {
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

module.exports = router
