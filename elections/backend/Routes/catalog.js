const express = require("express");
const router = express.Router();

const constituencyController = require('../Controllers/constituencyController');
const partyController = require('../Controllers/partyController');
const { adminAuth } = require('../Middlewares/adminAuth');

router.post('/create/constituency', adminAuth, constituencyController.constituency_create);

router.post('/create/party', adminAuth, partyController.party_create);

module.exports = router;