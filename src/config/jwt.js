require('dotenv').config()

module.exports = {
    secret: process.env.JWT_SECRET || 'default_key',
    expiresIn: '1h'
};

