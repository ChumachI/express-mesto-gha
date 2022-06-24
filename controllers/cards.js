const Card = require('../models/card');
const {
  STATUS_OK,
  STATUS_CREATED,
  ERROR_SERVER,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
} = require('../utils/constants');

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(STATUS_CREATED).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при создании карточки.',
          });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(STATUS_OK).send({ data: cards });
    })
    .catch(() => res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card === null) {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.status(STATUS_OK).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные для удаления карточки.' });
      } else {
        res
          .status(ERROR_SERVER)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.status(STATUS_OK).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_BAD_REQUEST)
          .send({
            message:
              'Переданы некорректные данные для постановки/снятии лайка.',
          });
      } else {
        res
          .status(ERROR_SERVER)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.status(STATUS_OK).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_BAD_REQUEST)
          .send({
            message:
              'Переданы некорректные данные для постановки/снятии лайка.',
          });
      } else {
        res
          .status(ERROR_SERVER)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};
