const express = require('express');
const cors = require("cors");
var logger = require('morgan');
const cookieParser = require("cookie-parser");
const app = express()
const path = require('path');
const { port } = require('./config');

const mongodb = require('./connection');
const userRoutes = require('./Routes/users')
const catalogRoutes = require('./Routes/catalog');
const adminRoutes = require('./Routes/admin');
mongodb();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/symbol', express.static(path.join(__dirname, 'symbol')));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/elections/admin', catalogRoutes);

// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  console.error('Hello' + err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

const { Server } = require("socket.io");
const httpServer = require('http').createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("connect", () => {
    console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
  });
  socket.on("newCandidateRequest", () => {
    console.log('New candidate request comes');
    io.emit("newNotification");

  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`App listening on port ${port}`)
})