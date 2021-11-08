const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;