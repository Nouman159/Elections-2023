const express = require("express");
const router = express.Router();

const voterController = require('../Controllers/voterController');
const candRequestsController = require('../Controllers/candRequestsController');
const { voterValidator, voterLogout } = require('../Middlewares/voterAuth');

router.post('/elections/voter/signup', voterController.voter_create);

router.post('/elections/voter/login', voterController.voter_login);

router.get('/request/candidate/data', candRequestsController.request_data);

router.post('/request/candidate/:id', candRequestsController.candidate_request);

router.get('/get/candidate/requests', candRequestsController.get_candidate_requests);

router.get('/validate/voter', voterValidator);

router.get('/logout/voter', voterLogout);

router.get('/elections/voter/profile/:id', voterController.voter_profile);

module.exports = router;