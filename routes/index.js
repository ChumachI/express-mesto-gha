const router = require('express').Router();

const cardsRouter = require('./card.js');
const usersRouter = require('./user.js');

router.use(
  usersRouter,
  cardsRouter,
);

module.exports = router;