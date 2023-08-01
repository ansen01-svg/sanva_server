let { register, login, logout } = require('../controllers/auth');
let express = require('express');
let router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').delete(logout);


module.exports = router;