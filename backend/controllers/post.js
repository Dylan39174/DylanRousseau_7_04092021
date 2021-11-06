const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;

exports.createPost = (req, res, next) => {
  console.log(req.body);
  let postUrl = '';
  if(req.file){
    postUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }
  const post = new Post({
    textPost: req.body.textPost,
    imageUrl: postUrl,
    UserId: req.body.userId
  });
  post.save()
    .then(() => res.status(201).json({Message: 'Post enregistré !'}))
    .catch(error => res.status(500).json({error}));
};

exports.getAllPost = (req, res, next) => {
  Post.findAll({
    include: {model: User, required: true, attributes: ["userName", "imageUrl"]},
    order: [["id", "DESC"]],
  })
    .then(post => {
      const list = post.map(post => {
        return Object.assign({},
          {
            id: post.id,
            createdAt: post.createdAt,
            textPost: post.textPost,
            imagePostUrl: post.imageUrl,
            userId: post.UserId,
            userName: post.User.userName,
            userImageUrl: post.User.imageUrl,
          }
        )
      })
      res.status(200).json({ list })
    })
    .catch(error => res.status(500).json({error}));
};

exports.deletePost = (req, res, next) => {
  console.log(req.body);
  if(req.body.userId==req.body.userMadeId){
    Comment.destroy({where:{PostId: req.params.id}});
    Post.destroy({where:{id: req.params.id}})
    .then(() => res.status(200).json({Message: 'Post supprimé !'}))
    .catch(error => res.status(500).json({error}));
  }else{
    res.status(401).json({Message: 'Non autorisé !'});
  }
};