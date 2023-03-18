import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  // owner: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: true,
  //   },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  date: {
    type: String,
    default: new Date().toISOString().split('T')[0],
  },
})

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Không được để trống'],
    },
    description: {
      type: String,
      required: [true, 'Không được để trống'],
    },
    specifications: {
      type: String,
      required: [true, 'Không được để trống'],
    },
    longDescription: {
      type: String,
      required: [true, 'Không được để trống'],
    },
    price: {
      type: Number,
      required: [true, 'Không được để trống'],
    },
    category: {
      type: String,
      require: [true, 'Không được để trống'],
    },
    pictures: {
      type: Array,
      require: true,
    },
    brand: { type: String, required: true },
    discount: { type: Number, required: false, default: 0 },
    rating: { type: Number, required: false, default: 0 },
    numReview: { type: Number, required: false, default: 0 },
    reviews: [reviewSchema],
    status: { type: String, required: true, default: 'Còn hàng' },
  },
  { minimize: false },
)

const Product = mongoose.model('Product', ProductSchema)

export default Product
