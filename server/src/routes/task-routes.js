const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller');

router.get('/getStatuses', taskController.getStatuses);
router.get('/getTasks', taskController.getTasks);
router.post('/postTask', taskController.postTask);

module.exports = router;
