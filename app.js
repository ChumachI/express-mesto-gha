const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const app = express();
const router = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(errors());
app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  const errorMessage = statusCode === 500 ? `На сервере произошла ошибка ${err.name} ${err.message}` : message;
  res.status(statusCode).send({ message: errorMessage });
});

app.listen(PORT, () => {
});
