const jwt = require("jsonwebtoken");
const { voterJwtSecret } = require('../config');

exports.voterValidator = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ authenticated: false });
    }
    try {
        const decoded = jwt.verify(token, voterJwtSecret);
        req.user = decoded;
        return res.status(200).json({ authenticated: true });
    }
    catch (er) {
        console.log("err", er);
        res.clearCookie("token");
        return res.status(401).json({ authenticated: false });
    }
};
exports.voterLogout = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(200).json({ isLogout: true });
    }
    try {
        const decoded = jwt.verify(token, voterJwtSecret);
        req.user = decoded;
        res.clearCookie("token");
        return res.status(200).json({ isLogout: true });
    }
    catch (er) {
        console.log("err", er);
        return res.status(401).json({ isLogout: false });
    }
};
exports.voterAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ authenticated: 'false' });
    }
    try {
        const decoded = jwt.verify(token, voterJwtSecret);
        req.user = decoded;
        next();
    }
    catch (er) {
        console.log("err", er);
        res.clearCookie("token");
        res.clearCookie("id");
        return res.status(401).json({ authenticated: 'false' });
    }
};
