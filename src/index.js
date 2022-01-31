const express = require('express');
const path = require('path');
const createHttpErrors = require('http-errors');
const ApiRouter = require('./routers/api');
const cors = require('cors');
const jwt = require('jsonwebtoken'); 

// The web server
const app = express();
app.use(cors());

// To handle body
app.use(express.json());

// Console.log all requests
app.use((req, res, next) => {
  // console.log(req);
  next();
});

// Web Server
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

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// Listen to port 8000
const port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log('App listening on port 8000');
});