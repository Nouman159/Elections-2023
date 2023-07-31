const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
    partyleader: {
        type: String,
        required: true
    },
    partyname: {
        type: String,
        unique: true,
        required: true
    },
    abbreviation: {
        type: String,
        unique: true,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    foundedYear: {
        type: Number,
        required: true
    },
    ideology: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Party', partySchema);