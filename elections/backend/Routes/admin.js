const express = require("express");
const router = express.Router();

const candidateController = require('../Controllers/candRequestsController');
const adminController = require('../Controllers/adminController');
const electionController = require('../Controllers/electionController');
const { adminLogout, adminAuth } = require('../Middlewares/adminAuth');

router.post('/elections/signup', adminController.admin_create);

router.post('/elections/login', adminController.admin_login);

router.put(`/elections/candidate/approve/:requestId`, candidateController.candidate_approved);

router.put(`/elections/candidate/reject/:requestId`, candidateController.candidate_rejected);

router.post('/elections/create', electionController.election_create);

router.get('/elections/logout', adminLogout);

module.exports = router;