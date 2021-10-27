const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

router.post('/', commentCtrl.createComment);
router.get('/:id', commentCtrl.getAllComment);

module.exports = router;