const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const database = require('./models');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const commentRoute = require('./routes/comment');

database.sequelize.sync();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);

module.exports = app;