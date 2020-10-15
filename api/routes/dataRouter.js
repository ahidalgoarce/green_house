const express = require('express');
const router = express.Router();

const DataController = require('../controllers/dataController');

router.all('/', DataController.getAllData);

router.post('/', DataController.createNewData);

router.get('/:id', DataController.findDataById);

router.patch('/:id', DataController.updateData);

router.delete('/:id', DataController.deleteData);

module.exports = router;