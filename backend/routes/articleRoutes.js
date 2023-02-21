import express from 'express';
const articleRouter = express.Router()
import Article from '../models/articleModel.js'
import User from'../models/userModel.js'

// Get Articles
articleRouter.get('/', async (req, res) => {
  try {
    const articles = await Article.find()
    res.status(200).json(articles)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// Get single product
articleRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const article = await Article.findById(id)
    res.status(200).json({ article })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// create Articles
articleRouter.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      images: pictures,
      content,
      date,
      expire,
    } = req.body
    const article = await Article.create({
      title,
      description,
      pictures,
      content,
      date,
      expire,
    })
    const articles = await Article.find()
    res.status(200).json(articles)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// update article
articleRouter.patch('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const {
      title,
      description,
      content,
      date,
      expire,
      images: pictures,
    } = req.body
    const article = await Article.findByIdAndUpdate(id, {
      title,
      description,
      content,
      date,
      expire,
      pictures,
    })
    const articles = await Article.find()
    res.status(200).json(articles)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// delete article
articleRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const { user_id } = req.body
  try {
    const user = await User.findById(user_id)
    if (!user.isAdmin) return res.status(401).json('Bạn không có quyền')
    await Article.findByIdAndDelete(id)
    const articles = await Article.find()
    res.status(200).json(articles)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

export default articleRouter
