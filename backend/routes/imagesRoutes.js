import cloudinary from 'cloudinary'
import express from 'express';
import dotenv from 'dotenv';

const imagesRouter = express.Router();
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

imagesRouter.delete('/:public_id', async (req, res) => {
  const { public_id } = req.params
  try {
    await cloudinary.uploader.destroy(public_id)
    res.status(200).send()
  } catch (e) {
    res.status(400).send(e.message)
  }
})

export default imagesRouter;