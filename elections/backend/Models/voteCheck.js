const mongoose = require('mongoose');

const voteCheckSchema = new mongoose.Schema({
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election',
        required: true
    },
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voter',
        required: true
    }
}, { timestamps: true });

const checkVote = mongoose.model('checkVote', voteCheckSchema);

module.exports = checkVote;
