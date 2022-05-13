const express = require('express');
const authController = require('./../controller/authController');
const userController = require('./../controller/userController');

const router = express.Router();


router.post('/signup',authController.signUp)
router.post('/login',authController.login)
router
    .route('/')
    .get(authController.protectData,userController.getAllUser);

router
    .route('/:id')
    .get(authController.protectData,authController.checkRole(['superAdmin']),userController.getUser)
    .delete(authController.protectData,authController.checkRole(['superAdmin']),userController.deleteUser)
    .patch(authController.protectData,userController.updateUser)

module.exports =  router;