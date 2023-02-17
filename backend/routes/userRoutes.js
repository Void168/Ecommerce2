const userRouter = express.Router()
import express from 'express';;
import User from '../models/userModel.js';
//Sign Up

userRouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.create({ name, email, password })
    res.json(user)
  } catch (e) {
    if (e.code === 11000) return res.status(400).send('Email đã tồn tại')
    res.status(400).send(e.message)
  }
})

// Login
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findByCredentials(email, password)
    res.json(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// Get users
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).populate('orders')
    res.json(users)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// get user orders
userRouter.get('/:id/orders', async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id).populate('orders')
    res.json(user.orders)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// update user notifcations
userRouter.post('/:id/updateNotifications', async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    user.notifications.forEach((notif) => {
      notif.status = 'read'
    })
    user.markModified('notifications')
    await user.save()
    res.status(200).send()
  } catch (e) {
    res.status(400).send(e.message)
  }
})

export default userRouter;
