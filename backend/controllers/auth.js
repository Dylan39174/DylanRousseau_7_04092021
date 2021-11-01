const db = require('../models');
const User = db.users;
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const passwordShema = new passwordValidator;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

passwordShema
.is().min(6)
.is().max(30)
.is().uppercase()
.is().lowercase()
.is().digits()
.has().not().spaces();

exports.signup = (req, res, next) => {
  let imageName = ``;
  console.log(req.body);
  if(req.file){
    imageName = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }else{
    imageName = `${req.protocol}://${req.get('host')}/images/unknown.png`;
  }
  if(emailValidator.validate(req.body.email) == false){
    return res.status(401).json({Message: 'Adresse email non conforme !'});
  }
  if(passwordShema.validate(req.body.password) == false){
    return res.status(401).json({Message: 'Mot de passe non sécurisé !'});
  }
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        userName: req.body.userName.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: hash,
        imageUrl: imageName
      })
      user.save()
        .then(() => res.status(201).json({Message: 'Utilisateur enregistré !'}))
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
  console.log(req.body);
  User.findOne({
    where:{
      email: req.body.email
    }
  })
  .then(user => {
    if(!user){
      return res.status(401).json({Message: 'Identifiants incorrects !'});
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if(!valid){
          return res.status(401).json({Message: 'Identifiants incorrects !'});
        }
        res.status(200).json({
          userId: user.id,
          userName: user.userName,
          email: user.email,
          imageUrl: user.imageUrl,
          token: jwt.sign(
            {userId: user.id},
            process.env.TOKEN_KEY,
            {expiresIn: '24h'}
          )
        })
      })
      .catch(error => res.status(500).json({error}));
  })
  .catch(error => res.status(500).json({error}));
};