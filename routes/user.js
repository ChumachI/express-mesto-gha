const router = require('express').Router();
const {
  getAllUsers, getOneUser, createUser, updateMyInfo, updateMyAvatar, login, getMyInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { checkUser, checkUserId, checkUserData } = require('../utils/validation');

router.get('/users', auth, getAllUsers);
router.get('/users/me', auth, getMyInfo);
router.get('/users/:userId', auth, checkUserId, getOneUser);

router.post('/signin', checkUser, login);
router.post('/signup', checkUser, createUser);

router.patch('/users/me', auth, checkUserData, updateMyInfo);
router.patch('/users/me/avatar', auth, checkUserData, updateMyAvatar);

module.exports = router;
