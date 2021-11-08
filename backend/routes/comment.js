const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const commentCtrl = require('../controllers/comment');

router.post('/', auth, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getAllComment);
router.get('/count/:id', auth, commentCtrl.getNbComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;