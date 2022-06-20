const router = require('express').Router();
const {createCard, getAllCards, deleteCard, likeCard, dislikeCard} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:userId', deleteCard);
router.put('/:cardId/likes',likeCard);
router.delete('/:cardId/likes', dislikeCard);


module.exports = router;