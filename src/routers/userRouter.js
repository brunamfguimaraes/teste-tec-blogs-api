const express = require('express');
const userController = require('../controllers/userController');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = express.Router();

router.get('/user/:id', jwtValidation, userController.getById);
router.get('/user', jwtValidation, userController.getUsers);
router.post('/user', userController.create);
router.post('/login', userController.createLogin);
router.delete('/user/me', jwtValidation, userController.removeUser);

module.exports = router;