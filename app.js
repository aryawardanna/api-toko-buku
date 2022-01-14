const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./app/api/auth/router');
const categoryRouter = require('./app/api/category/router');
const booksRouter = require('./app/api/books/router');
const uploadsRouter = require('./app/api/uploads/router');
const checkoutsRouter = require('./app/api/checkouts/router');

const URL = `/api/v1`;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${URL}`, authRouter);
app.use(`${URL}`, categoryRouter);
app.use(`${URL}`, booksRouter);
app.use(`${URL}`, uploadsRouter);
app.use(`${URL}`, checkoutsRouter);

module.exports = app;
