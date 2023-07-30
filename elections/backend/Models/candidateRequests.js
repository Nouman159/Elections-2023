const mongoose = require('mongoose');

const candidateRequestSchema = new mongoose.Schema({
    party: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Party',
        required: true
    },
    constituency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Constituency',
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
        enum: ['pending', 'resolved'],
        default: 'pending'
    }
});

candidateRequestSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/elections/candidate/request/${this._id}`;
});

module.exports = mongoose.model('candidateRequest', candidateRequestSchema);