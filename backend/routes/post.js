const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer-config');

router.post('/', multer, postCtrl.createPost);
router.get('/', postCtrl.getAllPost);

module.exports = router;