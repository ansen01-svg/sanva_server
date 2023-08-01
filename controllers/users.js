let User = require('../schemas/user');


async function getCurrentUser(req, res) {
    let user = await User.findOne({ _id: req.user.id }).select('_id username about profile_picture');

    res.status(200).json({ user });
}


module.exports = getCurrentUser; 