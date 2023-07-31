const jwt = require("jsonwebtoken");

const { voterJwtSecret } = require('../config');

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).send("Access denied...No token provided");
    try {
        const decoded = jwt.verify(token, voterJwtSecret);
        req.user = decoded;
        next();
    } catch (er) {
        // console.log("err", er);
        //Incase of expired jwt or invalid token kill the token and clear the cookie
        res.clearCookie("token");
        return res.redirect('/login');
    }
};

exports.logOutUser = async (req, res, next) => {
    res.clearCookie("token");
    res.send({ success: true });
};

module.exports = voterAuth;
