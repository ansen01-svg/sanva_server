let getCurrentUser = require('../controllers/users');
let auth = require('../middlewares/auth');
let router = require('express').Router();


router.route('/getCurrentUser').get(auth, getCurrentUser);


module.exports = router;