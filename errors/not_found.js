let CustomError = require('./custom');

class NotFound extends CustomError {
    constructor (message) {
        super (message),
        this.statuscode = 404
    }
}


module.exports = NotFound;