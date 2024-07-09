const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth-middlaware');
const taskController = require('../controllers/task-controller');

// GET
// POST
// PUT | PATCH
// DELETE

router.get('/getStatuses', authMiddleware, taskController.getStatuses);
router.post('/postStatus', authMiddleware, taskController.postStatus);
router.get('/getTasks', authMiddleware, taskController.getTasks);
router.post('/postTask', authMiddleware, taskController.postTask);
router.put('/updateTaskStatus/:taskId', authMiddleware, taskController.updateTaskStatus);

module.exports = router;
