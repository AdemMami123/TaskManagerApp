const jwt = require('jsonwebtoken');
const config = require('config');

function authMiddleware(req, res, next) {
    // Extract the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1]; // 'Bearer <token>'
    
    if (!token) {
        return res.status(401).json({ status: 'error', msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtsecret'));
        req.user = decoded; // Attach user info to request object
        next();
    } catch (err) {
        return res.status(401).json({ status: 'error', msg: 'Invalid token' });
    }
}

module.exports = authMiddleware;
