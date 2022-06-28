const router = require('express').Router();

const cardsRouter = require('./card');
const usersRouter = require('./user');
const notFound = require('./not-found');

router.use(
  notFound,
  usersRouter,
  cardsRouter,
);

module.exports = router;
