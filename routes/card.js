const router = require('express').Router();
const {
  createCard, getAllCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const {
  checkNewCard, checkCardId,
} = require('../utils/validation');

router.get('/cards', auth, getAllCards);
router.post('/cards', auth, checkNewCard, createCard);
router.delete('/cards/:cardId', auth, checkCardId, deleteCard);
router.put('/cards/:cardId/likes', auth, checkCardId, likeCard);
router.delete('/cards/:cardId/likes', auth, checkCardId, dislikeCard);

module.exports = router;
