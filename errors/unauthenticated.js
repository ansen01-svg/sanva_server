let CustomError = require('./custom');

class Unauthenticated extends CustomError {
    constructor (message) {
        super (message),
        this.statuscode = 403
    }
}


module.exports = Unauthenticated;