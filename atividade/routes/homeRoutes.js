const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');

router.get('/', homeController.index);
router.get('/cad', homeController.cadastrou);
router.get('/user/:id', homeController.usuario);

module.exports = router;