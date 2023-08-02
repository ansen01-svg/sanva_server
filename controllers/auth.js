let User = require('../schemas/user');
let { BadRequest } = require('../errors');
let { generatePayload } = require('../utils/generate_payload_and_verify_token');
let sendCookies = require('../utils/send_cookie');


async function register(req, res) {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new BadRequest(`Please provide username, email and password`);
    }

    let user = await User.findOne({ email });

    if (user) {
        throw new BadRequest(`Email already in use`);
    }

    await User.create(req.body);

    res.status(201).json({ msg: `Successfully registered` });
}

async function login(req, res) {
    let { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequest(`Please provide username and password`);
    }

    let user = await User.findOne({ email });

    if (!user) {
        throw new BadRequest(`You are not registered`);
    }

    let isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new BadRequest(`Password does not match`);
    }

    let payload = generatePayload(user);
    sendCookies(payload, res);

    res.status(200).json({ user: { id: user._id, user: user.username } });
}

async function logout(req, res) {
    res.cookie('supToken', 'token', {
        httpOnly: true,
        maxAge: new Date(Date.now() - 60 * 60 * 24)
    });

    res.status(200).json({ msg: `User logged out` });
}


module.exports = { register, login, logout };