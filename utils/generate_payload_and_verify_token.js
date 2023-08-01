let jwt = require('jsonwebtoken');

let generatePayload = (user) => {
    return {
        user : user.username,
        id : user._id
    }
}

let verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}


module.exports = { generatePayload, verifyToken };