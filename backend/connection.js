require('dotenv').config()

const mongoose = require('mongoose')

const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.wuclx.mongodb.net/test`

mongoose
  .connect(connectionString, { useNewUrlparser: true })
  .then(() => console.log('connected to MongoDB'))
  .catch((err) => console.log(err))

mongoose.connection.on('error', (err) => console.log(err))
