const router = require('express').Router();

const cardsRouter = require('./card.js');
const usersRouter = require('./user.js');
const notFound = require('./not-found.js');

router.use(
  usersRouter,
  cardsRouter,
  notFound
);

module.exports = router;