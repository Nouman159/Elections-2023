const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Elections',
        required: true
    },
    constituency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Constituency',
        required: true
    },
    candidaterequests: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidateRequest',
        required: true
    },
    voterCount: {
        type: Number,
        default: 0
    },
    isWinner: {
        type: String,
        enum: [true, false],
        default: false
    }
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
