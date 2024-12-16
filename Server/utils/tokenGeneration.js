const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports.createAccessToken = (data) => {
    return jwt.sign({data}, secretKey, {
        expiresIn: 1 * 24 * 60 * 60
    });
}

module.exports.createRefreshToken = (id) => {
    return jwt.sign({id}, secretKey, {
        expiresIn: 7 * 24 * 60 * 60
    });
}

