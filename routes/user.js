const router = require('express').Router();
const {
  getAllUsers, getOneUser, createUser, updateMyInfo, updateMyAvatar, login, getMyInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { checkUser, checkUserId, checkAvatar } = require('../utils/validation');

router.get('/users', auth, getAllUsers);
router.get('/users/:userId', auth, checkUserId, getOneUser);
router.get('/users/me', auth, getMyInfo);
router.post('/signin', checkUser, login);
router.post('/signup', checkUser, createUser);
router.patch('/users/me', auth, updateMyInfo);
router.patch('/users/me/avatar', auth, checkAvatar, updateMyAvatar);

module.exports = router;
