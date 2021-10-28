const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

router.post('/', commentCtrl.createComment);
router.get('/:id', commentCtrl.getAllComment);
router.get('/count/:id', commentCtrl.getNbComment);

module.exports = router;