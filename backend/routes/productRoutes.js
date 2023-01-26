const router = require('express').Router()
const Product = require('../models/productModel.js')
const User = require('../models/userModel.js')

// Get Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// Get single product
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    const similar = await Product.find({ category: product.category }).limit(5)
    res.status(200).json({ product, similar })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// create products
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, images: pictures } = req.body
    const product = await Product.create({
      name,
      description,
      price,
      category,
      pictures,
    })
    const products = await Product.find()
    res.status(200).json(products)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// update product
router.patch('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { name, description, price, category, images: pictures } = req.body
    const product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      pictures,
    })
    const products = await Product.find()
    res.status(200).json(products)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// delete product
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const { user_id } = req.body
  try {
    const user = await User.findById(user_id)
    if (!user.isAdmin) return res.status(401).json('Bạn không có quyền')
    await Product.findByIdAndDelete(id)
    const products = await Product.find()
    res.status(200).json(products)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// get category
// router.get('/category/:category', async (req, res) => {
//   const { category } = req.params
//   try {
//     let products
//     const sort = { _id: -1 }
//     if (category == 'tất cả') {
//       products = await Product.find().sort(sort)
//     } else {
//       products = await Product.find({ category }).sort(sort)
//     }
//     res.status(200).json(products)
//   } catch (e) {
//     res.status(400).send(e.message)
//   }
// })

module.exports = router
