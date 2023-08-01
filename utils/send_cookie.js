let jwt = require('jsonwebtoken');

let sendCookies = (payload, res) => {
    let supToken = jwt.sign(payload, process.env.JWT_SECRET);

    let validity = new Date(30 * 24 * 60 * 60);

    res.cookie('supToken', supToken, {
        httpOnly : true,
        maxAge : validity,
        secure : process.env === 'production',
        signed : true
    });
};


module.exports = sendCookies;