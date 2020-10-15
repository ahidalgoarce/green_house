const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

router.get('/', UserController.getAllUsers);

router.post('/', UserController.createNewUser);

router.get('/:id', UserController.findUserById);

router.patch('/:id', UserController.updateAnUser);

router.delete('/:id', UserController.deleteAnUser);

module.exports = router;