const mongoose = require('mongoose')
const ArticleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Không được để trống'],
    },
    description: {
      type: String,
      required: [true, 'Không được để trống'],
    },
    content: {
      type: String,
      require: [true, 'Không được để trống'],
    },
    pictures: {
      type: Array,
      require: true,
    },
    date: {
      type: String,
      default: new Date().toISOString().split('T')[0],
    },
    expire: {
      type: String,
      default: new Date().toISOString().split('T')[0],
    },
  },
  { minimize: false },
)

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
