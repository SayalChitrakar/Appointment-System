const express = require('express');
const hospitalController = require('./../controller/hospitalController');
const router = express.Router();

router
    .route('/')
    .get(hospitalController.getAllHospitals)
    .post(hospitalController.addHospital);

router
    .route('/:id')
    .get(hospitalController.getHospital)
    .delete(hospitalController.deleteHospital)
    .patch(hospitalController.updateHospital)

router
    .route('/nearByMe/hospital-within/:distance/userLocation/:userLocation/unit/:unit')
    .get(hospitalController.getHospitalsNearMe)

router
    .route('/distance/location/:location/unit/:unit')
    .get(hospitalController.getDistanceOfHospital)




module.exports = router;