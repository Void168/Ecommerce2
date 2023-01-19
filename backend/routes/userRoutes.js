const router = require('express').Router()
const User = require('../models/userModel.js')

//Sign Up

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.create({ name, email, password })
    res.json(user)
  } catch (e) {
    if (e.code === 11000) return res.statusCode(400).send('Email đã tồn tại')
    res.status(400).send(e.message)
  }
})

export default router
