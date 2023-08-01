let { verifyToken } = require('../utils/generate_payload_and_verify_token');
let { Unauthenticated } = require('../errors'); 

let authentication = (req, res, next) => {
    let { supToken } = req.signedCookies;

    if (!supToken) {
        throw new Unauthenticated(`Unauthenticated user`);
    }

    try {
        let verifiedToken = verifyToken(supToken);
        req.user = verifiedToken;
        return next();
    } catch (error) {
        throw new Unauthenticated(`Unauthenticated user`);
    }
};


module.exports = authentication;