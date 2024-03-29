import express from 'express'
const productRouter = express.Router()

import Product from '../models/productModel.js'
import User from '../models/userModel.js'

// Get Products
productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// Get single product
productRouter.get('/:id', async (req, res) => {
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
productRouter.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      longDescription,
      specifications,
      price,
      category,
      brand,
      discount,
      rating,
      numReview,
      images: pictures,
      status
    } = req.body
    const product = await Product.create({
      name,
      description,
      longDescription,
      specifications,
      price,
      category,
      pictures,
      brand,
      discount,
      rating,
      numReview,
      status
    })
    const products = await Product.find()
    res.status(200).json(products)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// update product
productRouter.patch('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const {
      name,
      description,
      longDescription,
      specifications,
      price,
      category,
      brand,
      discount,
      rating,
      numReview,
      images: pictures,
      status,
    } = req.body
    const product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      longDescription,
      specifications,
      price,
      category,
      pictures,
      brand,
      discount,
      rating,
      numReview,
      status
    })
    const products = await Product.find()
    res.status(200).json(products)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// delete product
productRouter.delete('/:id', async (req, res) => {
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

// cart routes
productRouter.post('/add-to-cart', async (req, res) => {
  const { userId, productId, price } = req.body
  try {
    const user = await User.findById(userId)
    const product = await Product.findById(productId)
    const userCart = user.cart
    if (userCart[productId]) {
      userCart[productId] += 1
      userCart[product.name] += 1
    } else {
      userCart[product.name] = 1
      userCart[productId] = 1
    }
    userCart[product.price] = 1
    userCart.count += 1
    userCart.total = Number(userCart.total) + Number(price * 24000 * (100 - product.discount) / 100)
    user.cart = userCart
    user.markModified('cart')
    await user.save()
    res.status(200).json(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

productRouter.post('/remove-from-cart', async (req, res) => {
  const { userId, productId, price } = req.body
  try {
    const user = await User.findById(userId)
    const product = await Product.findById(productId)
    const userCart = user.cart
    userCart.total -= Number(userCart[productId]) * Number(price * 24000 * (100 - product.discount) / 100)
    userCart.count -= userCart[productId]
    delete userCart[productId]
    user.cart = userCart
    user.markModified('cart')
    await user.save()
    res.status(200).json(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

productRouter.post('/increase-cart', async (req, res) => {
  const { userId, productId, price } = req.body
  try {
    const product = await Product.findById(productId)
    const user = await User.findById(userId)
    const userCart = user.cart
    userCart.total += Number(price * 24000)
    userCart.count += 1
    userCart[productId] += 1
    userCart[product.name] += 1
    user.cart = userCart
    user.markModified('cart')
    await user.save()
    res.status(200).json(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

productRouter.post('/decrease-cart', async (req, res) => {
  const {userId, productId, price } = req.body
  try {
    const product = await Product.findById(productId)
    const user = await User.findById(userId)
    const userCart = user.cart
    userCart.total -= Number(price * 24000)
    userCart.count -= 1
    userCart[product.name] -= 1
    userCart[productId] -= 1
    user.cart = userCart
    user.markModified('cart')
    await user.save()
    res.status(200).json(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

productRouter.post('/:id/reviews', async (req, res) => {
  const { id } = req.params
  const { name, comment, rating } = req.body
  try {
    const product = await Product.findById(id)
    if (product) {
      if (product.reviews.find((x) => x.name === name)) {
        return res
          .status(400)
          .send({ message: 'Bạn đã bình luận về sản phẩm này rồi' });
      }
      const review = {
        name,
        rating,
        comment,
      }
      product.reviews.push(review)
      product.numReview = product.reviews.length
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length
      const updatedProduct = await product.save()
      res.status(201).send({
        message: 'Đã nhận xét',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      })
    } else {
      res.status(404).send({ message: 'Không tìm thấy sản phẩm' })
    }
  } catch (e) {
    res.status(400).send(e.message)
  }
})

export default productRouter
