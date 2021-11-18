const db = require('../models');
const fs = require('fs');
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
  if(req.params.id==1){
    return res.status(401).json({Message: 'Le compte administrateur ne peut pas être supprimé !'});
  };
  Post.findAll({
    where: {
      UserId: req.params.id
    }
  })
  .then(posts => {
    posts.forEach(post => {
      const imageUrl = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${imageUrl}`, () => {
        Post.destroy({
          where: {
            UserId: post.id
          }
        })
      })
    });
  })
  .catch(error => res.status(500).json({error})); 
  Comment.destroy({where:{UserId: req.params.id}});
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(user => {
    const imageUrl = user.imageUrl.split('/images/')[1];
    console.log(imageUrl);
    if(imageUrl != 'unknown.png'){
      fs.unlink(`images/${imageUrl}`, () => {
        User.destroy({
          where:{
            id: req.params.id
          }
        })
        .then(() => res.status(200).json({Message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(500).json({error}));
      })
    }else{
      User.destroy({
        where:{
          id: req.params.id
        }
      })
      .then(() => res.status(200).json({Message: 'Utilisateur supprimé !'}))
      .catch(error => res.status(500).json({error}));
    }
  })
};
