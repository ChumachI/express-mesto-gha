const router = require("express").Router();

router.all("*", (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: "Страница не найдена" });
});

module.exports = router;
