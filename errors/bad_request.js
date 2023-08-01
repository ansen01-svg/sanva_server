let CustomError = require('./custom');

class BadRequestError extends CustomError {
    constructor (message) {
        super (message),
        this.statuscode = 401
    }
}


module.exports = BadRequestError;