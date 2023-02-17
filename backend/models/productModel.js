import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

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
    brand: {type: String, required: true},
    discount:{ type: Number, required: false, min: 0},
    rating: { type: Number, required: false, min: 0},
    numReview: { type: Number, required: false, min: 0 },
    reviews: [reviewSchema],
  },
  { minimize: false },
)

const Product = mongoose.model('Product', ProductSchema)

export default Product
