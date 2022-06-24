const User = require('../models/user');
const {
  STATUS_OK,
  STATUS_CREATED,
  ERROR_SERVER,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
} = require('../utils/constants');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(STATUS_OK).send({ data: users });
    })
    .catch(() => res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      } else {
        res
          .status(ERROR_SERVER)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getOneUser = (req, res) => {
  User.findById(req.params.userId)
    .then((data) => {
      if (data === null) {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.status(STATUS_OK).send({ data });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные.',
        });
      } else {
        res
          .status(ERROR_SERVER)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateMyInfo = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((data) => {
      if (data === null) {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.status(STATUS_OK).send({ data });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении профиля. ',
        });
      } else if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении профиля. ',
        });
      } else {
        res
          .status(ERROR_SERVER)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateMyAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (data === null) {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(STATUS_OK).send({ data });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
      } else if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
      } else {
        res
          .status(ERROR_SERVER)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};
