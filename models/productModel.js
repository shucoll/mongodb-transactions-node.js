import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      validate: {
        validator: function (el) {
          return el >= 0;
        },
        message: 'stock cannot be below 0',
      },
    },
    price: {
      type: Number,
      required: true,
    }
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
