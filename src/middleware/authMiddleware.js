const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access Denied"});

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (err){
        res.status(400).json({ message : "Invalid token"});
    }
}