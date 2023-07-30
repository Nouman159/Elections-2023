const mongoose = require('mongoose');
const mongoURI = `mongodb+srv://noumanarshad15926:EPurA9wIKtcVNWQl@electionsystem.gxdzdw7.mongodb.net/?retryWrites=true&w=majority`;

const mongodb = async () => {
    try {
        const connection = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to MongoDB');
        return connection;
    }
    catch (err) {
        console.log('connection unsuccesful ' + err);
        throw err;
    }

}
module.exports = mongodb;