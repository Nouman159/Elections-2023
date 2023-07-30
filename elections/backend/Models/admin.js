const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
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
    }

});
adminSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/elections/admin/${this._id}`;
});
module.exports = mongoose.model('Admin', adminSchema);

