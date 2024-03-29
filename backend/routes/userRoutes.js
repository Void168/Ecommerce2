const userRouter = express.Router()
import express from 'express'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken, isAdmin, isAuth } from '../utils.js';

//Sign Up

userRouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await User.create({ name, email, password })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          phone: user.phone,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
  } catch (e) {
    if (e.code === 11000) return res.status(401).send('Email đã tồn tại')
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
    const hashPassword = async (password) => {
      const salt = await bcrypt.genSalt(10)
      password = await bcrypt.hash(password, salt)
      return password
    }
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password)
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
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
    res.status(200).send({ message: "Xóa người dùng thành công" })
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
      notif.status = 'Đã đọc'
    })
    user.markModified('notifications')
    await user.save()
    res.status(200).send()
  } catch (e) {
    res.status(400).send(e.message)
  }
})

export default userRouter
