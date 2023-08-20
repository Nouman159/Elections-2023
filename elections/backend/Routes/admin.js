const express = require("express");
const router = express.Router();

const candidateController = require('../Controllers/candRequestsController');
const adminController = require('../Controllers/adminController');
const electionController = require('../Controllers/electionController');
const { adminLogout, adminAuth } = require('../Middlewares/adminAuth');
const admin = require("../Models/admin");

router.post('/elections/signup', adminController.admin_create);

router.post('/elections/login', adminController.admin_login);

router.get('/elections/dashboard/info', adminController.dashboard_info);

router.put(`/elections/candidate/approve/:requestId`, adminAuth, candidateController.candidate_approved);

router.put(`/elections/candidate/reject/:requestId`, adminAuth, candidateController.candidate_rejected);

router.post('/elections/create', adminAuth, electionController.election_create);

router.get('/elections/logout', adminLogout);

module.exports = router;