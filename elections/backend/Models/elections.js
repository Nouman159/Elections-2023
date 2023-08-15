const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    electionDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['future', 'present', 'past'],
        default: 'future',
    },
}, { timestamps: true });

const Elections = mongoose.model('Elections', electionSchema);

module.exports = Elections;
