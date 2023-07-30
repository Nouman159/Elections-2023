const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
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
    }
});

candidateSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/elections/candidate/${this._id}`;
});

module.exports = mongoose.model('Candidate', candidateSchema);

