const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth-middlaware');
const projectController = require('../controllers/project-controller');

// Project task routes
router.get('/getTasks/:projectId', authMiddleware, projectController.getTasks);
router.post('/postProjectTask/:projectId', authMiddleware, projectController.postProjectTask);
router.put('/editProjectTask/:taskId', authMiddleware, projectController.editProjectTask);
router.delete('/deleteProjectTask/:taskId', authMiddleware, projectController.deleteProjectTask);

// Project routes
router.get('/getProject/:projectId', authMiddleware, projectController.getProject);
router.get('/getProjects', authMiddleware, projectController.getProjects);
router.post('/postProject', authMiddleware, projectController.postProject);
router.post('/searchUsersId/:search', authMiddleware, projectController.searchUsersId);
router.post('/addUserToProject/:projectId', authMiddleware, projectController.addUserToProject);
router.put('/editProject/:projectId', authMiddleware, projectController.editProject);
router.delete('/deleteProject/:projectId', authMiddleware, projectController.deleteProject);

module.exports = router;
