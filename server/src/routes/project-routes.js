const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth-middlaware');
const projectController = require('../controllers/project-controller');

// Project task routes
router.get('/getTasks/:projectId', authMiddleware, projectController.getTasks);
router.post('/postProjectTask/:projectId', authMiddleware, projectController.postProjectTask);
router.post('/editProjectTask/:taskId', authMiddleware, projectController.editProjectTask);
router.post('/deleteProjectTask/:taskId', authMiddleware, projectController.deleteProjectTask);

// Project routes
router.get('/getProject/:projectId', authMiddleware, projectController.getProject);
router.get('/getProjects', authMiddleware, projectController.getProjects);
router.post('/postProject', authMiddleware, projectController.postProject);
router.post('/searchUsersId', authMiddleware, projectController.searchUsersId);
router.post('/addUserToProject/:projectId', authMiddleware, projectController.addUserToProject);
router.post('/editProject/:projectId', authMiddleware, projectController.editProject);
router.post('/deleteProject/:projectId', authMiddleware, projectController.deleteProject);

module.exports = router;
