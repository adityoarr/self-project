const express = require('express');
const router = express.Router();
const readController = require('../controllers/readController');

// All products routes
router.post('/', readController.createReadList);
router.get('/', readController.getReadList);
router.get('/:id', readController.getReadListById);
router.put('/:id', readController.updateReadList);
router.delete('/:id', readController.deleteReadList);

module.exports = router;