import mongoose from "mongoose"
const OrderSchema = mongoose.Schema(
  {
    products: { type: Object },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    status: {
      type: String,
      default: 'Đang xử lý',
    },
    total: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: new Date().toISOString().split('T')[0],
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { minimize: false },
)

const Order = mongoose.model('Order', OrderSchema)

export default Order
