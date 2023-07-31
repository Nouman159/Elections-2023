const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    voterJwtSecret: process.env.Voter_JWT_Secret,
    mongoURI: process.env.Database_Connection,
    candidateJwtSecret: process.env.candidate_Jwt_Secret,
    adminJwtSecret: process.env.Admin_Jwt_Secret
};