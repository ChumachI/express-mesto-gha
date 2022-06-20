const router = require('express').Router();
const {getAllUsers, getOneUser, createUser, updateMyInfo, updateMyAvatar} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getOneUser);
router.post('/', createUser);
router.patch('/me', updateMyInfo);
router.patch('/me/avatar', updateMyAvatar);

module.exports = router;