const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: false,
    default: ''
  },
  description: {
    type: String,
    required: false,
    default: "Một sản phẩm từ XYZ"
  },
  price: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  availability: {
    type: Boolean,
    required: true,
    default: true
  },
  buyCounts: {
    type: Number,
    required: true,
    default: 0
  },
  viewCounts: {
    type: Number,
    required: true,
    default: 0
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  comment: {
    total: {
      type: Number,
      require: false,
      default: 0
    },
    items: [
      {
        content: {
          type: String
        },
        name: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        },
        star: {
          type: Number
        }
      }
    ]
  }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;