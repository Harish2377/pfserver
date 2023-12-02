const express = require('express')
const router = new express.Router()
const userController = require('../controller/userController')
const projectController = require('../controller/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerConfig = require('../middlewares/multerMiddleware')


//register
router.post('/user/register',userController.register)

//login
router.post('/user/login',userController.login)

//add-project
router.post('/project/add',jwtMiddleware,multerConfig.single('projectimage'),projectController.addProjects)

//getuserprojects
router.get('/user/all-projects',jwtMiddleware,projectController.allUserProjects)

//getallprojects
router.get('/projects/all',jwtMiddleware,projectController.getallProjects)

//gethomeprojects
router.get('/projects/home-projects',projectController.getHomeProjects)

//edit project
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single('projectimage'),projectController.editProjectController)

//delete project
router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProjectController)

//update user
router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)








module.exports = router