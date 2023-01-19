const { Schema } = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Bắt buộc'],
    },
    email: {
      type: String,
      required: [true, 'Bắt buộc'],
      unique: true,
      index: true,
      validate: {
        validator: function (str) {
          return /^[\w-\.]+@([\w-\]+\.)+[\w-]{2,4}$/g.test(str)
        },
        message: (props) => `Email ${props.value} không phù hợp`,
      },
    },
    password: {
      type: String,
      required: [true, 'Bắt buộc'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Object,
      default: {
        total: 0,
        count: 0,
      },
    },
    notifications: {
      type: Array,
      default: [],
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  },
  { minimize: false },
)

const Users = mongoose.model('User', UserSchema)

export default Users
