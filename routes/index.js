const router = require('express').Router();

const cardsRouter = require('./card');
const usersRouter = require('./user');
const notFound = require('./not-found');

router.use(
  usersRouter,
  cardsRouter,
  notFound,
);

module.exports = router;
