const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())

// Initialize DB
require('./initDB')();
const PORT = process.env.PORT || 3000;

const DataRouter = require('./api/routes/dataRouter');
const UserRouter = require('./api/routes/userRoutes');
const AdminRouter = require('./api/routes/adminRouter');


app.use('/data', DataRouter);
app.use('/user', UserRouter);
app.use('/admin', AdminRouter);


//404 handler and pass to error handler
app.use((req, res, next) => {
    /*
    const err = new Error('Not found');
    err.status = 404;
    next(err);
    */
    // You can use the above code if your not using the http-errors module
    next(createError(404, 'Not found'));
  });
  
  //Error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message
      }
    });
  });
  
  app.listen(PORT, () => {
    console.log('Server started on port ' + PORT + '...');
  });