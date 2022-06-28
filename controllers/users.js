const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

const {
  STATUS_OK,
  STATUS_CREATED,
} = require('../utils/constants');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(STATUS_OK).send({ data: users });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    try {
      throw new BadRequestError('Переданы некорректные данные при создании пользователя.');
    } catch (e) {
      next(e);
    }
  }
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          const { _id } = user;
          res.status(STATUS_CREATED).send({
            _id, email, name, about, avatar,
          });
        })
        .catch(() => {
          next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
        });
    });
};

module.exports.getOneUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((data) => {
      if (data === null) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.status(STATUS_OK).send({ data });
      }
    })
    .catch(next);
};

module.exports.updateMyInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((data) => {
      if (data === null) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.status(STATUS_OK).send({ data });
      }
    })
    .catch(next);
};

module.exports.updateMyAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (data === null) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      } else {
        res.status(STATUS_OK).send({ data });
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { password, email } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Неправильные почта или пароль');
      }
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getMyInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};
