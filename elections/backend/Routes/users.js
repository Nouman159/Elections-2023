const express = require("express");
const router = express.Router();

const voterController = require('../Controllers/voterController');
const candRequestsController = require('../Controllers/candRequestsController');
const { voterValidator } = require('../Middlewares/voterAuth');

router.post('/elections/voter/signup', voterController.voter_create);

router.post('/elections/voter/login', voterController.voter_login);

router.post('/request/candidate', candRequestsController.candidate_request);

router.get('/validate/voter', voterValidator);

module.exports = router;