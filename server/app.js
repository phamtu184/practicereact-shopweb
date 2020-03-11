var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

require('dotenv').config()

var usersRouter = require('./src/routes/user.route');
var authRouter = require('./src/routes/auth.route');
var productRouter = require('./src/routes/product.route');

var app = express();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify:false});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Mongoose success connect")
})

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);

module.exports = app;
