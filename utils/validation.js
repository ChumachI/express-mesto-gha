const { celebrate, Joi } = require('celebrate');

const checkUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www.)?[\w-._~:/?#[\]@!$&'()*+,;=]+#?\b/),
  }),
});

const checkUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
  }),
});

const checkAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^https?:\/\/(www.)?[\w-._~:/?#[\]@!$&'()*+,;=]+#?\b/),
  }),
});

const checkNewCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/(www.)?[\w-._~:/?#[\]@!$&'()*+,;=]+#?\b/),
  }),
});

const checkCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const checkDeletedCardId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  checkUser, checkUserId, checkAvatar, checkNewCard, checkCardId, checkDeletedCardId,
};
