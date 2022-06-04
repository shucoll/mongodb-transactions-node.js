# MongoDB transactions using Node.js

A demo application showing the order placing feature for E-commerce applications using MongoDB transactions.

### Please refer refer to my [blog](https://www.shucoll.com/blog/mongodb-transactions-using-nodejs-and-mongoose) to understand how to setup the database for transactions.

## Installation and Usage

Clone the repo

```bash
git clone https://github.com/shucoll/mongodb-transactions-node.js
```

Install the dependencies

```bash
npm install
```

Create a .env file in the root of the application and add the following

```env
NODE_ENV=development
PORT=5000
DATABASE=mongodb://localhost:27017/mongodb-transactions
```


Run the app in the development mode.
Send requests to http://localhost:5000 to create products and orders.

```bash
npm start
```