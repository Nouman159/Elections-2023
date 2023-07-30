const express = require('express');
const cors = require("cors");
var logger = require('morgan');
const app = express()
const { port } = require('./config');

const mongodb = require('./connection');
const userRoutes = require('./Routes/users')
const catalogRoutes = require('./Routes/catalog');

mongodb();       // connecting to mongodb atlas

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

app.use('/', userRoutes);
app.use('/elections/admin', catalogRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})