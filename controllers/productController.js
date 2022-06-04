import Product from '../models/productModel.js';

import catchAsync from '../utils/catchAsync.js';

export const createProduct = catchAsync(async (req, res) => {
  const doc = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: doc,
  });
});
