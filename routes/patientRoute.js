const express = require('express');

const patientController = require('./../controller/patientController');
const router = express.Router();

router
    .route('/')
    .get(patientController.getAllPatients)
    .post(patientController.addPatient)
router
    .route('/:id')
    .get(patientController.getPatient)

module.exports = router;