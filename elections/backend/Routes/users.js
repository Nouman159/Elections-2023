const express = require("express");
const router = express.Router();

const resultController = require('../Controllers/resultController');
const voterController = require('../Controllers/voterController');
const candRequestsController = require('../Controllers/candRequestsController');
const electionController = require('../Controllers/electionController');
const { voterAuth, voterLogout } = require('../Middlewares/voterAuth');
const { adminAuth } = require("../Middlewares/adminAuth");

router.post('/elections/voter/signup', voterController.voter_create);

router.post('/elections/voter/login', voterController.voter_login);

router.get('/request/candidate/data', voterAuth, candRequestsController.request_data);

router.post('/request/candidate/:id', voterAuth, candRequestsController.candidate_request);

router.get('/get/candidate/requests', adminAuth, candRequestsController.get_candidate_requests);

router.get('/get/candidate/lists/:voterId', voterAuth, candRequestsController.candidate_names);

router.get('/candidate/profile/:candidateId', voterAuth, candRequestsController.candidate_profile);

router.get('/get/upcoming/elections', voterAuth, electionController.get_elections);

router.get('/get/elections/candidates/:voterId', voterAuth, electionController.get_candidates_voting);

router.get('/get/elections/info/:electionId', voterAuth, electionController.election_info);

router.post('/elections/cast/vote/:electionId/:voterId/:candidateId', voterAuth, electionController.view_vote_duplicate, electionController.elections_cast_vote);

router.get('/get/elections/status/:electionId', voterAuth, electionController.checkTime);

router.get('/get/elections/result/:electionId/:voterId', resultController.elections_result);

router.get('/logout/voter', voterLogout);

router.get('/elections/voter/profile/:id', voterAuth, voterController.voter_profile);

module.exports = router;