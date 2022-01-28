require('dotenv').config();

const express = require('express');
const path = require('path');
const createHttpErrors = require('http-errors');
const cors = require('cors');
const ApiRouter = require('./controllers/api');

// The web server
const app = express();

// Middlewares
app.use(cors());
app.use(express.json({}));
app.use(express.static(path.join(__dirname, 'public')));

// APIs
app.use('/api', ApiRouter);

// 404 Handler
app.use((req, res, next) => {
  next(
    createHttpErrors(404, `Unknown Resource ${req.method} ${req.originalUrl}`),
  );
});

// Error Handler
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(error.status || 500).json({
    error: error.message || `Unknown Error!`,
  });
});

// Listen to port 8000
const port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log('App listening on port 8000');
});
