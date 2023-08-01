let mongoose = require('mongoose');

let connect = (url) => {
    return mongoose.connect(url);
}


module.exports = connect;