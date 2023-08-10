const express = require("express");
const router = express.Router();
const adminController = require('../Controllers/adminController');
const { adminLogout, adminAuth } = require('../Middlewares/adminAuth');

router.post('/elections/signup', adminController.admin_create);

router.post('/elections/login', adminController.admin_login);

router.get('/elections/logout', adminLogout);

module.exports = router;