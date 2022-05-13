const express = require('express');
const router = express.Router();
const assetsController = require('./../controller/assetController');
const authController = require('./../controller/authController')

router
    .route('/')
    .get(assetsController.getAllAssets)
    .post(assetsController.addAssets)

router
    .route('/:id')
    .get(assetsController.getAsset)
    .delete(assetsController.deleteAsset,authController.protectData,authController.checkRole(['admin']))

module.exports = router;