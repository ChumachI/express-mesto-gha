const router = require('express').Router();

const cardsRouter = require('./card.js');
const usersRouter = require('./user.js');
const not_found = require('./not-found');

router.use(
  usersRouter,
  cardsRouter,
  not_found
);

module.exports = router;