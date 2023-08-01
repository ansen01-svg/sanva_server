let { CustomError } = require('../errors');

let errorHandler = async (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomError) { 
        return res.status(err.statuscode).json({ msg : err.message });
    }

    return res.status(500).json({ msg : `Internal server error` });
};


module.exports = errorHandler;