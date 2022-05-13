const express = require('express');
const specificationController = require('./../controller/specificationController');
const doctorController = require('./../controller/doctorController');
const scheduleController = require('../controller/scheduleController');
const availabilityController = require('./../controller/availablityController');
const appointmentController = require('./../controller/appointmentController');
const authController = require('./../controller/authController');
const router = express.Router();

router
    .route('/specification')
    .get(specificationController.getAllSpecifications)
    .post(specificationController.addSpecification)

router
    .route('/specification/:id')
    .get(specificationController.getSpecification)
router
    .route('/schedule')
    .get(scheduleController.getAllSchedule)
    .post(scheduleController.addSchedule)

router
    .route('/schedule/:id')
    .delete(scheduleController.deleteSchedule)

router
    .route('/availability')
    .get(availabilityController.getAllAvailibility)
    .post(authController.protectData,authController.checkRole(['superAdmin']),availabilityController.setAvailability)
    .delete(availabilityController.deleteAvailability)

router
    .route('/appointment')
    .get(appointmentController.getAllAppointments)
    .post(authController.protectData,appointmentController.takeAppointment)

router
    .route('/appointment/:id')
    .get(appointmentController.getAppointment)
    .delete(authController.protectData,authController.checkRole(['superAdmin']),appointmentController.cancleAppointment)
router
    .route('/')
    .get(doctorController.getAllDoctors)
    .post(authController.protectData,authController.checkRole(['superAdmin']),doctorController.addDoctor)
router
    .route('/:id')
    .get(doctorController.getAllDoctors)

module.exports = router;