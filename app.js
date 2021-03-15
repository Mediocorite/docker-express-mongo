var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ~~~~~~~~~~~~~~~~~~~

// Added by us to test docker
var itemStack = require('./models/itemstack');
var mongoose = require('mongoose');
const PORT = `3000`;
const connString = 'mongodb://mongo:27017/cinema'; 
mongoose
  .connect(
    connString,
    { useNewUrlParser: true,
      useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
const database = mongoose.connection;

// ~~~~~~~~~~~~~~~~~~


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// ~~~~~~~~~~~~~~~~~~~~~~

app.get('/item', (req, res) => {
  itemStack.find()
    .then(items => res.render('item', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});
app.post('/item/add', (req, res) => {
  const newItem = new itemStack({
    name: req.body.name
  });
  newItem.save().then(item => res.redirect('/item'));
});

// ~~~~~~~~~~~~~~~~~~~~~~


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));




