const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true,
        unique: true
    },
    isCandidate: {
        type: Boolean,
        default: false
    },
    constituency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contituency'
    },
    pic: {
        type: String,
        // required: true
    }

});
voterSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/elections/voter/${this._id}`;
});

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;
