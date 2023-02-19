const userRouter = express.Router()
import express from 'express'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt';

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

// Get single user
userRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    res.status(200).json({ user })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// update user
userRouter.patch('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { password, phone, avatar, address } = req.body
    const user = await User.findByIdAndUpdate(
      id,
      {
        password: bcrypt.hashSync(password, 8),
        phone,
        avatar,
        address,
      },
      { new: true },
    )
    res.status(200).json(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// delete user
userRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await User.findByIdAndDelete(id)
    const users = await User.find()
    res.status(200).json(users)
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

export default userRouter
