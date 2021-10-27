require('dotenv').config();
const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_LANG,
    port: process.env.DB_PORT})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./user')(sequelize, Sequelize);
db.posts = require('./post')(sequelize, Sequelize);
db.comments = require("./comment.js")(sequelize, Sequelize)

db.posts.belongsTo(db.users);
db.users.hasMany(db.posts);

db.comments.belongsTo(db.users);
db.comments.belongsTo(db.posts);

db.users.hasMany(db.posts);
db.users.hasMany(db.comments);

module.exports = db;