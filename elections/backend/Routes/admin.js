const express = require("express");
const router = express.Router();
const adminController = require('../Controllers/adminController');

router.post('/elections/signup', adminController.admin_create);

router.post('/elections/login', adminController.admin_login);

module.exports = router;