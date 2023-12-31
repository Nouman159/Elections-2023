const express = require("express");
const router = express.Router();

const candidateController = require('../Controllers/candRequestsController');
const adminController = require('../Controllers/adminController');
const electionController = require('../Controllers/electionController');
const { adminLogout, adminAuth } = require('../Middlewares/adminAuth');
const admin = require("../Models/admin");

router.post('/elections/signup', adminController.admin_create);

router.post('/elections/login', adminController.admin_login);

router.get('/pending/requests', adminAuth, candidateController.pending_requests);

router.get('/get/candidate/requests', adminAuth, candidateController.get_candidate_requests);

router.get('/elections/dashboard/info', adminAuth, adminController.dashboard_info);

router.get('/elections/past/events', adminAuth, electionController.get_past_elections);

router.put('/elections/end/:electionsId', adminAuth, electionController.end_elections);

router.put(`/elections/candidate/approve/:requestId`, adminAuth, candidateController.candidate_approved);

router.put(`/elections/candidate/reject/:requestId`, adminAuth, candidateController.candidate_rejected);

router.post('/elections/create', adminAuth, electionController.election_create);

router.get('/elections/logout', adminLogout);

module.exports = router;