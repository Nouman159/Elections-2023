const jwt = require('jsonwebtoken');

const voterJwtSecret = 'B7bsTn3lWbZtYpP9';

const voterAuth = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({ access: 'false', message: 'Authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, voterJwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ access: 'false', message: 'Invalid token' });
    }
};

module.exports = voterAuth;
