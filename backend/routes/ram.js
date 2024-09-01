const express = require('express');
const router = express.Router();
const ramController = require('../controllers/ramController');

router.get('/modules', ramController.getModules); //get all ram modules
router.get('/brands', ramController.getBrands); //get brands
router.get('/types', ramController.getTypes); //get types
router.get('/configs', ramController.getConfigs); //get configurations

router.patch('/update/:id', ramController.updateModule); //update module

module.exports = router;