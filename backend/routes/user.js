const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/user');

router.get('/update', userCtrl.getAllUsersUpdating);
router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/update/:id', userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteOneUser);


module.exports = router;