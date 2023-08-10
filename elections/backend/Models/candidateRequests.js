const mongoose = require('mongoose');

const candidateRequestSchema = new mongoose.Schema({
    party: {
        type: String,
        required: true
    },
    constituency: {
        type: String,
        required: true
    },
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voter',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'viewed', 'resolved'],
        default: 'pending'
    }
});

module.exports = mongoose.model('candidateRequest', candidateRequestSchema);