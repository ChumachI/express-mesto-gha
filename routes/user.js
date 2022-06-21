const router = require('express').Router();
const {getAllUsers, getOneUser, createUser, updateMyInfo, updateMyAvatar} = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:userId', getOneUser);
router.post('/users', createUser);
router.patch('/users/me', updateMyInfo);
router.patch('/users/me/avatar', updateMyAvatar);

module.exports = router;