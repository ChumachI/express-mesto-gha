const router = require('express').Router();

const cardsRouter = require('./card');
const usersRouter = require('./user');
// eslint-disable-next-line spaced-comment
//const notFound = require('./not-found');

router.use(
  usersRouter,
  cardsRouter,
);

module.exports = router;
