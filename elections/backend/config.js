const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    voterJwtSecret: process.env.Voter_JWT_Secret
};