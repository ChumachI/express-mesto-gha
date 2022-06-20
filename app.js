const {PORT=3000} = process.env;
const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '62b053818a2c51f4248354b7'
  };

  next();
});
app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  const errorMessage = (statusCode === 500) ? 'На сервере произошла ошибка' : message;
  res.status(statusCode).send({ message: errorMessage });
});


app.listen(PORT, ()=>{
  console.log(`App listening on port ${PORT}`);
});