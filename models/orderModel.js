import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  orderItems: [
    {
      qty: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
  ],
  totalDue: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
