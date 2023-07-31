const express = require("express");
const router = express.Router();
const adminController = require('../Controllers/adminController');
const voterController = require('../Controllers/voterController');
const candRequestsController = require('../Controllers/candRequestsController');


router.post('/elections/admin/signup', adminController.admin_create);

router.post('/elections/admin/login', adminController.admin_login);

router.post('/elections/voter/signup', voterController.voter_create);

router.post('/elections/voter/login', voterController.voter_login);

router.post('/request/candidate', candRequestsController.candidate_request);

module.exports = router;