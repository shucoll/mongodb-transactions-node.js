import mongoose from 'mongoose';
import dotenv from 'dotenv';

import express from 'express';
import morgan from 'morgan';

import cors from 'cors';

//import routes here
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';

import globalErrorHandler from './controllers/errorController.js';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log('DB connected'));

const app = express();

app.use(express.json());

app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Define the routes here
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
  next(new Error(`Cant find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
