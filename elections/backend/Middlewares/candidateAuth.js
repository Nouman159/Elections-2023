const jwt = require('jsonwebtoken');

const candidateJwtSecret = '2MniLtY7GuC8m72Ty';

const candidateAuth = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({ access: 'false', message: 'Authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, candidateJwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ access: 'false', message: 'Invalid token' });
    }
};

module.exports = candidateAuth;
