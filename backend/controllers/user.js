const db = require('../models');
const User = db.users;
const Post = db.posts;
const Comment = db.comments;

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({error}));
};

exports.getOneUser = (req, res, next) => {
  User.findOne({
    where: {id: req.params.id}
  })
  .then(user => res.status(200).json(user))
  .catch(error => res.status(500).json({error}))
};

exports.deleteOneUser = (req, res, next) => {
  Post.destroy({where:{UserId: req.params.id}});
  Comment.destroy({where:{UserId: req.params.id}});
  User.destroy({where:{id: req.params.id}})
    .then(() => res.status(200).json({Message: 'Utilisateur supprimé !'}))
    .catch(error => res.status(500).json({error}));
};