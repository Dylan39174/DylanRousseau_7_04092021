const db = require('../models');
const User = db.users;

exports.getAllUsers = (req, res, next) => {
  console.log(req.body);
  User.findAll()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({error}));
};

exports.getOneUser = (req, res, next) => {
  console.log(req.params.id);
  User.findOne({
    where: {id: req.params.id}
  })
  .then(user => res.status(200).json(user))
  .catch(error => res.status(500).json({error}))
};