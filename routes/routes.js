const express = require('express');
const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');
const projectTaskController = require('../controllers/projectTaskController')
const authMiddleware = require('../middleware/auth')
const middleware = require("../middleware/middleware");
const router = express.Router();

router.post('/create-user', middleware.uniqueUsernameandemailcheck, userController.createUser);
router.get('/get-user/:id', authMiddleware.verifyToken, userController.getUser);
router.post('/user-login', userController.userLogin);

router.post('/create-project', authMiddleware.verifyToken, middleware.uniqueProjectNameCheck, projectController.createProject);
router.get('/get-projects', authMiddleware.verifyToken, projectController.getProject);

router.post('/create-task', authMiddleware.verifyToken, middleware.memberAdminCheck, projectTaskController.createTask)
router.get('/get-tasks/:id', authMiddleware.verifyToken, projectTaskController.getProjectTask);
router.put('/update-task/:id', authMiddleware.verifyToken, projectTaskController.updateTask);


module.exports = router;