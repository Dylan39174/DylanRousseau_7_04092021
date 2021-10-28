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
    include: {model: User, required: true, attributes: ["userName", "imageUrl"]},
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