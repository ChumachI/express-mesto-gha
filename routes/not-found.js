const router = require('express').Router();
const { ERROR_NOT_FOUND } = require('../utils/constants');

router.all('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;
