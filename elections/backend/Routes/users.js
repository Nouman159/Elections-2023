const express = require("express");
const router = express.Router();

const resultController = require('../Controllers/resultController');
const voterController = require('../Controllers/voterController');
const candRequestsController = require('../Controllers/candRequestsController');
const electionController = require('../Controllers/electionController');
const constituencyController = require('../Controllers/constituencyController');
const { voterAuth, voterLogout } = require('../Middlewares/voterAuth');

router.post('/elections/voter/signup', voterController.voter_create);

router.post('/elections/voter/login', voterController.voter_login);



router.get('/request/iscandidate/:voterId', voterAuth, candRequestsController.is_candidate);

router.get('/request/voters/list/:candidateId', voterAuth, candRequestsController.voters_list);

router.get('/check/status/:voterId', voterAuth, candRequestsController.check_status);

router.get('/request/candidate/data', voterAuth, candRequestsController.request_data);

router.post('/request/candidate/:id', voterAuth, candRequestsController.candidate_request);

router.get('/get/candidate/lists/:voterId', voterAuth, candRequestsController.candidate_names);

router.get('/candidate/profile/:candidateId', voterAuth, candRequestsController.candidate_profile);




router.get('/get/constituencies', constituencyController.get_constituencies);

router.get('/get/upcoming/elections', voterAuth, electionController.get_elections);

router.get('/get/elections/candidates/:voterId', voterAuth, electionController.get_candidates_voting);

router.get('/get/elections/info/:electionId', voterAuth, electionController.election_info);

router.post('/elections/cast/vote/:electionId/:voterId/:candidateId', voterAuth, electionController.view_vote_duplicate, electionController.elections_cast_vote);

router.get('/get/elections/status/:electionId', voterAuth, electionController.checkTime);

router.get('/get/elections/result/:electionId', resultController.elections_result);

router.get('/elections/voter/profile/:id', voterAuth, voterController.voter_profile);


router.get('/logout/voter', voterLogout);

module.exports = router;