import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Bắt buộc'],
       max:32
    },
    email: {
      type: String,
      required: [true, 'Bắt buộc'],
      unique: true,
      index: true,
      validate: {
        validator: function (str) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str)
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
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  },
  { minimize: false },
)

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Sai thông tin đăng nhập')
  const isSamePassword = bcrypt.compareSync(password, user.password)
  if (isSamePassword) return user
  throw new Error('Sai thông tin đăng nhập')
}

UserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  return userObject
}

// Hash the password to 8 letter before saving
UserSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(8, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

UserSchema.pre('remove', (next) => {
  this.model('Order').remove({ owner: this._id }, next)
})

const User = mongoose.model('User', UserSchema)

export default User;
