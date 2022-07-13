const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const app = express();
const router = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
const allowedCors = [
  'https://mesto.ilya.chumak.nomoredomains.xyz',
  'http://mesto.ilya.chumak.nomoredomains.xyz',
  'http://localhost:3000',
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: allowedCors,
  credentials: true,
}));
app.use(router);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  const errorMessage = statusCode === 500 ? 'На сервере произошла ошибка' : message;
  res.status(statusCode).send({ message: errorMessage });
  next();
});

app.listen(PORT, () => {
});
