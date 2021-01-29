const jwt = require('jsonwebtoken');
const config = require('../config/config');

function generateToken( user ){
    const payload = JSON.stringify(user);
    return jwt.sign(payload, config.jwtSecretKey);
}

function decodeToken( token ){
    const payload = jwt.decode(token)
    return payload
}

module.exports = {
    generateToken,
    decodeToken
};