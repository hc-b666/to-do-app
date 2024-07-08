const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth-middlaware');
const taskController = require('../controllers/task-controller');

router.get('/getStatuses', authMiddleware, taskController.getStatuses);
router.get('/getTasks', authMiddleware, taskController.getTasks);
router.post('/postTask', authMiddleware, taskController.postTask);

module.exports = router;
