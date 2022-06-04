import mongoose from 'mongoose';

import catchAsync from '../utils/catchAsync.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

export const createOrder = catchAsync(async (req, res) => {
  const session = await mongoose.startSession();

  // Start the transaction
  session.startTransaction();

  try {
    // Make the order creation part of the transaction
    const orderDoc = await Order.create([req.body], { session });

    for (const item of orderDoc[0].orderItems) {
      const product = await Product.findById(item.product).session(session);

      if (product.stock - item.qty < 0) {
        throw new Error('Order quantity is more than stock');
      }

      const query = {
        $inc: { stock: -item.qty },
      };

      // Make the product update part of the transaction
      await Product.findByIdAndUpdate(item.product, query, {
        new: true,
        runValidators: true,
      }).session(session);
    }

    // If no error, commit the transaction and reflect changes in database
    await session.commitTransaction();

    res.status(201).json({
      status: 'success',
      data: orderDoc,
    });
  } catch (err) {
    // Abort all transactions if error occurred
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
});
