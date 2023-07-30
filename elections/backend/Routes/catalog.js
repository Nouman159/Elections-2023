const express = require("express");
const router = express.Router();

const constituencyController = require('../Controllers/constituencyController');
const partyController = require('../Controllers/partyController');

router.post('/create/constituency', constituencyController.constituency_create);

router.post('/create/party', partyController.party_create);

module.exports = router;