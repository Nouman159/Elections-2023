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
constituencySchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/elections/constituency/${this._id}`;
});
module.exports = mongoose.model('Constituency', constituencySchema);

