const mongoose = require('mongoose')
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
  },
  { minimize: false },
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
