const jwt = require('jsonwebtoken');

const generateToken = (user_id) =>{
    // jwt.sign({payload}, Secret_key, {Expires_In})
    // payload --> This data is stored inside the token.
    // Secret_key --> Used to sign the token. Without this secret nobody can generate a valid token.
    return jwt.sign({user_id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

    // JWT payloads are Base64 encoded, not encrypted. So passwords are not stored in jwt payload
}

module.exports = {generateToken};