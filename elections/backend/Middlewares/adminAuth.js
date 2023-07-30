const jwt = require('jsonwebtoken');

const adminJwtSecret = 'a7bsTn3k20KtYi9';

const adminAuth = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({ access: 'false', message: 'Authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, adminJwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ access: 'false', message: 'Invalid token' });
    }
};

module.exports = adminAuth;
