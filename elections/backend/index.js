const express = require('express');
const cors = require("cors");
var logger = require('morgan');
const cookieParser = require("cookie-parser");
const app = express()
const { port } = require('./config');

const mongodb = require('./connection');
const userRoutes = require('./Routes/users')
const catalogRoutes = require('./Routes/catalog');
const adminRoutes = require('./Routes/catalog');
mongodb();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/elections/admin', catalogRoutes);

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