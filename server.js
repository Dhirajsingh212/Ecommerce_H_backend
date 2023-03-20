// Main file which will run using nodemon
// requiring app from app.js
const app = require('./app');
const dotenv = require('dotenv');

// 1)config the dotenv file specified path
dotenv.config({ path: './config.env' });

// 2)listening for connections on the port 8000
app.listen(process.env.PORT, () =>
  console.log(`server is running on the port ${process.env.PORT}....`)
);
