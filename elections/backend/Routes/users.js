const express = require("express");
const router = express.Router();

const voterController = require('../Controllers/voterController');
const candRequestsController = require('../Controllers/candRequestsController');
const electionController = require('../Controllers/electionController');
const { voterValidator, voterLogout } = require('../Middlewares/voterAuth');

router.post('/elections/voter/signup', voterController.voter_create);

router.post('/elections/voter/login', voterController.voter_login);

router.get('/request/candidate/data', candRequestsController.request_data);

router.post('/request/candidate/:id', candRequestsController.candidate_request);

router.get('/get/candidate/requests', candRequestsController.get_candidate_requests);

router.get('/get/upcoming/elections', electionController.get_elections);

router.get('/get/elections/candidates/:voterId', electionController.get_candidates_voting);

router.get('/get/elections/info/:electionId', electionController.election_info);

router.post('/elections/cast/vote/:electionId/:voterId/:candidateId', electionController.checkTime, electionController.elections_cast_vote);

router.get('/validate/voter', voterValidator);

router.get('/logout/voter', voterLogout);

router.get('/elections/voter/profile/:id', voterController.voter_profile);

module.exports = router;