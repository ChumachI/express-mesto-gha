const User = require('../models/user');
const {
  STATUS_OK,
  STATUS_CREATED,
  ERROR_SERVER,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
} = require('../utils/constants')

module.exports.getAllUsers = (req,res) => {
  User.find({})
  .then(users => {
    res.status(STATUS_OK).send({data: users})
  })
  .catch(() => res.status(ERROR_SERVER));
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(STATUS_CREATED).send({ data: user }))
    .catch(() => res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' }));
};

module.exports.getOneUser = (req,res) => {
  const userId = req.params.userId;
  User.findById(userId)
  .then(user => {
    if(data === null){
      res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.'})
    }
    else{
      res.status(STATUS_OK).send({data: user})
    }

  })
  .catch((err) => res.status(ERROR_BAD_REQUEST).send({ message: 'Пользователь по указанному _id не найден.' }));
}



module.exports.updateMyInfo = (req, res) => {
  const userId = req.user._id;
  const { name, about} = req.body;
  if(!userId || !name || !about){
    res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
    return;
  }

  User.findByIdAndUpdate(userId, {name, about}, { new: true })
  .then((user)=>{
    res.status(STATUS_OK).send({data:user})
  })
  .catch(()=>{
    res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' })
  })
}

module.exports.updateMyAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar} = req.body;
  if(!userId || !avatar){
    res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
    return;
  }
  User.findByIdAndUpdate(userId, {avatar}, { new: true })
  .then((user)=>{
    res.status(STATUS_OK).send({data:user})
  })
  .catch(()=>{
    res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' })
  })
}