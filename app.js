const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const UserRoutes = require('./routes/UserRoutes');
const app = express();

dotenv.config({ path: './config.env' });

// 1)connecting to the mongodb database using mongoose
mongoose
  .connect(process.env.DB_LOCAL)
  .then(() => {
    console.log('db connected sucessfully');
  })
  .catch((err) => {
    console.log(err);
  });

// 2)3rd party middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 3)api routes declared here
app.use('/', UserRoutes);

// 4)exporting the app module
module.exports = app;
