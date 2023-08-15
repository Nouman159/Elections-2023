const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election',
        required: true
    },
    constituency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Constituency',
        required: true
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voter',
        required: true
    }
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
