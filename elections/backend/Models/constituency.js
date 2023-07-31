const mongoose = require('mongoose');

const constituencySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true,
        unique: true
    }

});

module.exports = mongoose.model('Constituency', constituencySchema);

