const db = require('../models');
const Comment = db.comments;
const Post = db.posts;
const User = db.users;

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    textComment: req.body.textComment,
    PostId: req.body.postId,
    UserId: req.body.userId
  });
  comment.save()
    .then(() => res.status(201).json({Message: 'Commentaire enregistré !'}))
    .catch(error => res.status(500).json({error}));
};

exports.getAllComment = (req, res, next) => {
  Comment.findAll({
    where: {PostId: req.params.id},
    include: {model: User, required: true, attributes: ["id", "userName", "imageUrl"]},
    order: [["id", "ASC"]],
  })
    .then(comment => {
      const list = comment.map(comment => {
        return Object.assign({},
          {
            id: comment.id,
            createdAt: comment.createdAt,
            textComment: comment.textComment,
            userName: comment.User.userName,
            userId: comment.User.id,
            userImageUrl: comment.User.imageUrl
          }
        )
      })
      res.status(200).json({ list })
    })
    .catch(error => res.status(500).json({error}));
};

exports.getNbComment = (req, res, next) => {
  Comment.findAndCountAll({
    where:{
      PostId: req.params.id
    }
  })
  .then(count => res.status(200).json(count))
  .catch(error => res.status(500).json({error}))
};

exports.deleteComment = (req, res, next) => {
  console.log(req.body);
  console.log(req.body.userId + ' | ' + req.body.userMadeId);
  if(req.body.userId==req.body.userMadeId||req.body.userId==1){
    console.log('bonjour')
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => res.status(200).json({Message: 'Commentaire Supprimé !'}))
    .catch(error => res.status(500).json({error}));
  }else{
    return res.status(500).json({Message: 'Vous n\'êtes pas autorisé à supprimer ce commentaire !'});
  }
  
};